using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                this._context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                activity.Title = request.Activity.Title ?? activity.Title;

                foreach (PropertyInfo PropertyInfo in activity.GetType().GetProperties())
                {
                    var newValue = request.Activity.GetType().GetProperty(PropertyInfo.Name).GetValue(request.Activity, null);

                    activity.GetType().GetProperty(PropertyInfo.Name).SetValue(activity, newValue, null);
                }

                await _context.SaveChangesAsync();

                return Unit.Value; // nothing object, makes warning go away
            }
        }
    }
}