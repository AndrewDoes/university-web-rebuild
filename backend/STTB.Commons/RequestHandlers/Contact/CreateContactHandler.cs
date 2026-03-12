using MediatR;
using STTB.Contracts.RequestModels.Contact;
using STTB.Entities;
using STTB.Entities.Entities;

namespace STTB.Commons.RequestHandlers.Contact
{
    public class CreateContactHandler : IRequestHandler<CreateContactRequest, bool>
    {
        private readonly ApplicationDbContext _context;

        public CreateContactHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(CreateContactRequest request, CancellationToken cancellationToken)
        {
            var contact = new ContactMessage
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                Subject = request.Subject,
                Message = request.Message,
                SubmittedAt = DateTime.UtcNow,
                Status = "new"
            };

            _context.ContactMessages.Add(contact);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}