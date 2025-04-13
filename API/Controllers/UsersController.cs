using API.Interfaces;
using API.Models;
using API.Data;
using API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository): BaseApiController
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
        
        
    }
}