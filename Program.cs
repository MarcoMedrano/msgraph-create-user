using Microsoft.Graph;
using Azure.Identity;
// using Microsoft.Graph.Models;

// var clientSecretCredential = new ClientSecretCredential(
// "9a1826f1-32d0-4fd9-a86e-4e063a6ab5ac",
//  "43c6e6ac-866c-4717-b982-af89a4c72152",
//  "9U.7Q~p3vMs.Re_QlL3Vt-CcCduh.rN.sfx_j");

var clientSecretCredential = new ClientSecretCredential(
"<tenant_id>",
 "<client_id>",
  "<client_secret>");

var graphClient = new GraphServiceClient(clientSecretCredential);
var user = new User
{
    AccountEnabled = true,
    DisplayName = "Edular Test",
    MailNickname = "etest1",
    // UserPrincipalName = "RicardoCalvimonte@MarcoMedranoGaraygmail.onmicrosoft.com",
    UserPrincipalName = "etest1@student.naa.edu",
    PasswordProfile = new PasswordProfile
    {
        ForceChangePasswordNextSignIn = false,
        Password = "Shared#1234"
    }
};

try
{
    // ADD
    // var userCreated = graphClient.Users
    //     .Request()
    //     .AddAsync(user).GetAwaiter().GetResult();
    // Console.WriteLine("By!" + userCreated.Id);
    // GET
    // var userCreated = new {Id="123"};
    // var u = await graphClient.Users[userCreated.Id]
	// .Request()
	// .Select("userPrincipalName, displayName,givenName,postalCode,identities")
	// .GetAsync();
    // Console.WriteLine("User: " + u.UserPrincipalName);

    // DELETE
    // await graphClient.Users[userCreated.Id]
    await graphClient.Users["b176070c-7115-48bf-85eb-82e4ef1ca360"]
	.Request()
	.DeleteAsync();

    // var queryOptions = new List<QueryOption>()
    // {
    //     new QueryOption("$count", "true"),
    //     new QueryOption("$search", @"""surName:medrano""")
    // };
    // var results = graphClient.Users.Request(queryOptions).Header("ConsistencyLevel","eventual")/*.Filter($"eq(surname, 'medrano')")*/.GetAsync().Result;

    // // Get the first result
    // foreach(var found in results)
    // {
    //     // var found = results.FirstOrDefault();
    //     Console.WriteLine("======================================================");
    //     Console.WriteLine("User: " + found.UserPrincipalName);
    //     foreach (var field in found.GetType().GetProperties())
    //     {
    //         var value = field.GetValue(found);
    //         if (value is not null) Console.WriteLine(field.Name + ": " + value);
    //     }
    // }
}
catch(System.Exception e)
{
    Console.WriteLine("Error " + e.Message);
}
