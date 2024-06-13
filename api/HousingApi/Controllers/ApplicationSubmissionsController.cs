using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HousingApi.Data;
using HousingApi.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace HousingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationSubmissionsController : ControllerBase
    {
        private readonly HousingContext _context;

        public ApplicationSubmissionsController(HousingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationSubmission>>> GetApplicationSubmissions()
        {
            return await _context.ApplicationSubmissions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationSubmission>> GetApplicationSubmission(int id)
        {
            var applicationSubmission = await _context.ApplicationSubmissions.FindAsync(id);

            if (applicationSubmission == null)
            {
                return NotFound();
            }

            return applicationSubmission;
        }

        [HttpPost]
        public async Task<ActionResult<ApplicationSubmission>> PostApplicationSubmission(ApplicationSubmission applicationSubmission)
        {
            _context.ApplicationSubmissions.Add(applicationSubmission);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicationSubmission", new { id = applicationSubmission.Id }, applicationSubmission);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationSubmission(int id)
        {
            var applicationSubmission = await _context.ApplicationSubmissions.FindAsync(id);
            if (applicationSubmission == null)
            {
                return NotFound();
            }

            _context.ApplicationSubmissions.Remove(applicationSubmission);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
