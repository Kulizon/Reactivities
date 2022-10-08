
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions 
{
    Args = args
    }
);

var connection = builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services.AddDbContext<DataContext>(opt => opt.UseSqlite(connection));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Make migrations
var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try {
var context = services.GetRequiredService<DataContext>();
await context.Database.MigrateAsync();

await Persistence.Seed.SeedData(context);
} catch (Exception ex) {
var logger = services.GetRequiredService<ILogger<Program>>();
logger.LogError(ex, "An error occured during migration.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
