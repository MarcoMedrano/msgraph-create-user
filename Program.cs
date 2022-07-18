using Microsoft.Graph;
using Azure.Identity;

var clientSecretCredential = new ClientSecretCredential(
"<tenant_id>",
 "<client_id>",
  "<client_secret>");
var graphClient = new GraphServiceClient(clientSecretCredential);
var user = new User
{
    AccountEnabled = true,
    DisplayName = "Marco Medrano",
    MailNickname = "MarcoMedrano",
    UserPrincipalName = "MarcoMedrano@MarcoMedranoGaraygmail.onmicrosoft.com",
    PasswordProfile = new PasswordProfile
    {
        ForceChangePasswordNextSignIn = false,
        Password = "!@#$!@#$"
    }
};

try
{
    var userCreated = graphClient.Users
        .Request()
        .AddAsync(user).GetAwaiter().GetResult();
    Console.WriteLine("By!" + userCreated.Id);

    // GET
    // var u = await graphClient.Users["96bf5b08-ecdd-4692-83c0-89deb648c448"]
	// .Request()
	// .Select("userPrincipalName, displayName,givenName,postalCode,identities")
	// .GetAsync();
    // Console.WriteLine("User: " + u.UserPrincipalName);

    // await graphClient.Users["96bf5b08-ecdd-4692-83c0-89deb648c448"]
	// .Request()
	// .DeleteAsync();
}
catch(System.Exception e)
{
    Console.WriteLine("Error " + e.Message);
}
