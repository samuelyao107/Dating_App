/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;*/
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    
    public class UsersController(DataContext context): BaseApiController
    {
       
        [HttpGet]
        public  async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
                var users = await context.Users.ToListAsync();

                return users;
        }
        [Authorize]
        [HttpGet("{id:int}")]
        public  async Task<ActionResult<AppUser>> GetUser(int id)
        {
                var user = await context.Users.FindAsync(id);

                if (user == null) return NotFound();

                return user;
        }
        
        
    }
}