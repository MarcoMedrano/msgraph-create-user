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
}
catch(System.Exception e)
{
    Console.WriteLine("Error " + e.Message);
}
