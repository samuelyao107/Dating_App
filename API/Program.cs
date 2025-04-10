using API.Data;
using API.Interfaces;
using API.Services;
using API.Extensions;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
//Middleware
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
   .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();   
app.UseAuthorization();

app.MapControllers();/*Map to endpoints*/

//Middleware

app.Run();
