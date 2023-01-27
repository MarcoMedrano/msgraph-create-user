import "isomorphic-fetch";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";
import { PasswordGenerator } from "./PasswordGenerator";


export class SsoAzureUser {
    private client: Client;

    constructor (tenantId: string, clientId: string, clientSecret: string) {
        const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
        const authProvider = new TokenCredentialAuthenticationProvider(credential, {
            scopes: ["https://graph.microsoft.com/.default"]
        });
        
        this.client = Client.initWithMiddleware({
            debugLogging: false,
            authProvider
        });
    }

    public create = async (givenName: string, surname: string, domain: string) => {
    
        const password = PasswordGenerator.generate();
    
        const userPrincipalName = await this.getUserName(givenName, surname, domain);
        console.log("User to create:", userPrincipalName);
        const user = {
            accountEnabled: true,
            displayName: `${givenName} ${surname}`,
            mailNickname: userPrincipalName.split('@')[0],
            givenName,
            surname,
            userPrincipalName,
            passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password
            }
        };
    
        const res = await this.client.api('/users')
            .post(user);
        console.log("res: ", res);
    }

    private buildUserName = async (givenName: string, surname: string, domain: string, numberOfInitials: number) => {

        if (numberOfInitials >= givenName.length) throw new Error(`All user names for '${givenName} ${surname}' are taken.`)
    
        const initials = givenName.substring(0, numberOfInitials);
        return `${initials}${surname}@${domain}`
    }
    
    private exist = async (username: string) => {
    
        let users = await this.client.api('/users')
            .filter(`userPrincipalName eq '${username}'`)
            .get();
    
        return users.value.length > 0;
    }
    
    private getUserName = async (givenName: string, surname: string, domain: string, numberOfInitials: number = 1): Promise<string> => {
        const userName = await this.buildUserName(givenName, surname, domain, numberOfInitials)
    
        if (await this.exist(userName)) return await this.getUserName(givenName, surname, domain, numberOfInitials + 1);
        else return userName;
    }
}