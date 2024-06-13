using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HousingApi.Data;
using HousingApi.Models;

namespace HousingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HousingLocationsController : ControllerBase
    {
        private readonly HousingContext _context;

        public HousingLocationsController(HousingContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HousingLocation>>> GetHousingLocations()
        {
            return await _context.HousingLocations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HousingLocation>> GetHousingLocation(int id)
        {
            var housingLocation = await _context.HousingLocations.FindAsync(id);

            if (housingLocation == null)
            {
                return NotFound();
            }

            return housingLocation;
        }

        [HttpPost]
        public async Task<ActionResult<HousingLocation>> PostHousingLocation(HousingLocation housingLocation)
        {
            _context.HousingLocations.Add(housingLocation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHousingLocation", new { id = housingLocation.Id }, housingLocation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutHousingLocation(int id, HousingLocation housingLocation)
        {
            if (id != housingLocation.Id)
            {
                return BadRequest();
            }

            _context.Entry(housingLocation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HousingLocationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHousingLocation(int id)
        {
            var housingLocation = await _context.HousingLocations.FindAsync(id);
            if (housingLocation == null)
            {
                return NotFound();
            }

            _context.HousingLocations.Remove(housingLocation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HousingLocationExists(int id)
        {
            return _context.HousingLocations.Any(e => e.Id == id);
        }
    }
}
