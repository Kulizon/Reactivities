
using API.Extensions;
using API.Middleware;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args
}
);


var connection = builder.Configuration.GetConnectionString("DefaultConnection");

ApplicationExtensionsMethods.AddAppExtensions(builder.Services, connection);
IdentityExtensions.AddIdentityServices(builder.Services, builder.Configuration);

var app = builder.Build();

// app.UseMiddleware<ExceptionsMiddleware>();

// Make migrations
var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();

    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    await Persistence.Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

// use routing here later

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
