import "isomorphic-fetch"
import {Client} from "@microsoft/microsoft-graph-client"
import {TokenCredentialAuthenticationProvider} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials"
import {ClientSecretCredential} from "@azure/identity"
import {PasswordGenerator} from "./PasswordGenerator"

export class SsoAzureUser {
    private client: Client

    constructor(tenantId: string, clientId: string, clientSecret: string) {
        const credential = new ClientSecretCredential(tenantId, clientId, clientSecret)
        const authProvider = new TokenCredentialAuthenticationProvider(credential, {
            scopes: ["https://graph.microsoft.com/.default"]
        })

        this.client = Client.initWithMiddleware({
            debugLogging: false,
            authProvider
        })
    }

    public create = async (
        firstName: string,
        user: any,
        domain: string
    ): Promise<{email: string; password: string}> => {
        const password = PasswordGenerator.generate()
        const userPrincipalName = (await this.getUserName(firstName, user.surname, domain)).replace(
            /\s/g,
            ""
        )
        console.info("SsoAzureUser: user to create:", userPrincipalName)

        user.accountEnabled = true
        user.mailNickname = userPrincipalName.split("@")[0]
        user.userPrincipalName = userPrincipalName
        user.passwordProfile = {
            forceChangePasswordNextSignIn: true,
            password
        }

        const userToPrint = Object.assign({}, user, {passwordProfile: undefined})
        console.info("SsoAzureUser: user to create ", userToPrint)
        const res = await this.client.api("/users").post(user)
        console.info("SsoAzureUser: user created ", res)

        return {email: userPrincipalName, password}
    }

    public exist = async (userPrincipalName: string) => {
        let users = await this.client
            .api("/users")
            .filter(`userPrincipalName eq '${userPrincipalName}'`)
            .get()

        console.info(
            "SsoAzureUser: exist with userPrincipalName:",
            userPrincipalName,
            users.value.length > 0
        )

        return users.value.length > 0
    }

    private getUserName = async (
        givenName: string,
        surname: string,
        domain: string,
        numberOfInitials: number = 1
    ): Promise<string> => {
        const userName = await this.buildUserName(givenName, surname, domain, numberOfInitials)

        if (await this.exist(userName)) {
            return await this.getUserName(givenName, surname, domain, numberOfInitials + 1)
        } else {
            return userName
        }
    }

    private buildUserName = async (
        givenName: string,
        surname: string,
        domain: string,
        numberOfInitials: number
    ) => {
        if (numberOfInitials >= givenName.length)
            throw new Error(`All user names for '${givenName} ${surname}' are taken.`)

        const initials = givenName.substring(0, numberOfInitials)
        return `${initials.trim()}${surname.split(" ").join("")}@${domain}`
    }
}
