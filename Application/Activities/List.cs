using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Application.Core;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<Activity>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private ILogger<List> _logger { get; }

            public Handler(DataContext context, ILogger<List> logger)

            {
                this._logger = logger;
                this._context = context;
            }

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                try
                {
                    // Handle cancel of request  
                    cancellationToken.ThrowIfCancellationRequested();
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {
                    this._logger.LogInformation($"Task was canceled");
                }

                return Result<List<Activity>>.Success(await this._context.Activities.ToListAsync());
            }
        }
    }
}