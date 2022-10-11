using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationExtensionsMethods
    {
        public static IServiceCollection AddAppExtensions(IServiceCollection services, String connection)
        {

            // Add services to the container.
            services.AddDbContext<DataContext>(opt => opt.UseSqlite(connection));

            services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();


            // Mediator
            services.AddMediatR(typeof(List.Handler).Assembly);

            // Cors
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy =>
              {
                  policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
              }));

            return services;
        }
    }
}