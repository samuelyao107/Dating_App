using API.Interfaces;
using API.Models;
using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Security.Claims;
using API.Helpers;
namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper): BaseApiController
    {
       
        [HttpGet]
        public  async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
                var users = await userRepository.GetMembersAsync();



                return Ok(users);
        }
      
        [HttpGet("{username}")]
        public  async Task<ActionResult<MemberDto>> GetUser(string username)
        {
                var user = await userRepository.GetMemberAsync(username);

                if (user == null) return NotFound();
                
                return user;
        }
        
        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(username == null) return BadRequest("No username found in token");

            var user = await userRepository.GetUserByUsernameAsync(username);

            mapper.Map(memberUpdateDto, user);

            if(await userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update the user");
        }
        
    }
}