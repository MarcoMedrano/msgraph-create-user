import "isomorphic-fetch";
import { SsoAzureUser } from "./SsoAzureUser";

const sso = new SsoAzureUser(
    "<tenantid>",
    "<clientid>",
    "<secret>"
);

const user = {
    givenName: "marco antonio",
    surname: "medrano",
    displayName: "marco medrano"
};
console.info("User will be created:", "marco")

sso.create("marco", user, "student.naa.edu");