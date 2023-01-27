import "isomorphic-fetch";
import { SsoAzureUser } from "./SsoAzureUser";

const sso = new SsoAzureUser(
    "<tenantid>",
    "<clientid>",
    "<secret>"
);

sso.create("marco", "medrano", "student.naa.edu");