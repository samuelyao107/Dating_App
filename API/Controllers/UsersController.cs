using API.Interfaces;
using API.Models;
using API.Data;
using API.DTOs;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using System.Security.Claims;
using API.Helpers;
namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService): BaseApiController
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
        

            var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

            mapper.Map(memberUpdateDto, user);

            if(await userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update the user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Cannot update user");

            var result = await photoService.AddPhotoAsync(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            user.Photos.Add(photo);
            if (await userRepository.SaveAllAsync())
            {
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName }, mapper.Map<PhotoDto>(photo));
            }
            
            return BadRequest("Problem adding photo");
        }
        
    }
}