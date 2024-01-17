import "isomorphic-fetch";
import { SsoAzureUser } from "./SsoAzureUser";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const sso = new SsoAzureUser(
    process.env.TenantId as string,
    process.env.ClientId as string,
    process.env.Secret as string
);

const user = {
    givenName: "Aaron",
    surname: "Davis",
    displayName: "Aaron Davis"
};
//console.info("User will be created:", user)

// sso.create("Aaron", user, "student.naa.edu");
sso.getLastSigninDate("jgarrett@student.naa.edu").then(res =>{
    console.info("Found " + res);
});