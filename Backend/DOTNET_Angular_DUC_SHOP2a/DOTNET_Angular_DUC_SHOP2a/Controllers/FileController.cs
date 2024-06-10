using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace DOTNET_Angular_DUC_SHOP2a.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        // With this method , I can upload any kind of files , not only images
        
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file=formCollection.Files.FirstOrDefault();
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave= Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = DateTime.Now.ToString("yymmssfff") + "-" 
                        + ContentDispositionHeaderValue
                        .Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath= Path.Combine(pathToSave, fileName);
                    var dbPath= Path.Combine(folderName, fileName);
                    using (var stream=new FileStream(fullPath,FileMode.Create) )
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {

                return StatusCode(500,$"Internal server error:{ex}")  ;
            }
        }
    }
}
