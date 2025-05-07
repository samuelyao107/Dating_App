using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
       var username = user.FindFirstValue(ClaimTypes.NameIdentifier)
        ?? throw new Exception("Cannot find username from token");
        return username;
    }


}