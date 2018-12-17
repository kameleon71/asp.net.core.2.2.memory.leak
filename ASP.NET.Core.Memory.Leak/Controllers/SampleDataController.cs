using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ASP.NET.Core.Memory.Leak.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpPost("[action]")]
        public async Task<IActionResult> Insert(Form form)
        {
            return Ok();
        }

        public class Form
        {
            public string Name { get; set; }
            public IFormFile File { get; set; }
            public ICollection<DynamicInput> Inputs { get; set; }
        }

        public class DynamicInput
        {
            public string Name { get; set; }
            public IFormFile File { get; set; }
        }
    }
}
