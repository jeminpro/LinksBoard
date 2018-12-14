using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using LinksBoard.Modals;

namespace LinksBoard.Controllers
{
    public class LinksController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private string linksFilePath;

        public LinksController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;


            linksFilePath = _hostingEnvironment.ContentRootPath + "/Data/Links.json";
        }

        [HttpGet]
        public IActionResult GetLinks()
        {
            string contentRootPath = _hostingEnvironment.ContentRootPath;
            var linksData = System.IO.File.ReadAllText(contentRootPath + "/Data/Links.json");

            return Ok(linksData);
        }

        [HttpPost]
        public IActionResult AddLink([FromBody]RequestLinkData linkItem)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var linksData = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            var group = linksData.FirstOrDefault(g => g.GroupId == linkItem.GroupId);
            var newLinkItem = new LinkItem{
                Name = linkItem.Name,
                Description = linkItem.Description,
                Url = linkItem.Url,
                LinkId = Guid.NewGuid()
            };

            group.Links.Add(newLinkItem);

            SaveLinkData(linksData);

            return Ok();
        }

        [HttpPost]
        public IActionResult EditLink([FromBody]RequestLinkData linkItem)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var linksData = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            var group = linksData.FirstOrDefault(g => g.GroupId == linkItem.GroupId);

            var link = group.Links.FirstOrDefault(l => l.LinkId == linkItem.LinkId);

            link.Name = linkItem.Name;
            link.Url = linkItem.Url;
            link.Description = linkItem.Description;

            SaveLinkData(linksData);

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteLink([FromBody]DeleteLinkRequest deleteLinkRequest)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var linksData = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            var group = linksData.FirstOrDefault(g => g.GroupId == deleteLinkRequest.GroupId);
           
            group.Links.RemoveAll(l => l.LinkId == deleteLinkRequest.LinkId);

            SaveLinkData(linksData);
            
            return Ok();
        }

        [HttpPost]
        public IActionResult AddGroup([FromBody]RequestGroupData groupItem)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var groupItems = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            var newGroupItem = new GroupItem
            {
                GroupName = groupItem.GroupName,
                GroupId = Guid.NewGuid()
            };

            groupItems.Add(newGroupItem);

            SaveLinkData(groupItems);

            return Ok();
        }

        [HttpPost]
        public IActionResult EditGroup([FromBody]RequestGroupData groupItem)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var groupItems = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            var group = groupItems.FirstOrDefault(g => g.GroupId == groupItem.GroupId);
            group.GroupName = groupItem.GroupName;

            SaveLinkData(groupItems);

            return Ok();
        }

        [HttpPost]
        public IActionResult DeleteGroup([FromBody]RequestGroupData groupItem)
        {
            var linksJsonData = System.IO.File.ReadAllText(linksFilePath);

            var linksData = JsonConvert.DeserializeObject<List<GroupItem>>(linksJsonData);

            linksData.RemoveAll(g => g.GroupId == groupItem.GroupId);

            SaveLinkData(linksData);

            return Ok();
        }

        private void SaveLinkData(List<GroupItem> linksData)
        {
            var updatedLinksJsonData = JsonConvert.SerializeObject(
                linksData,
                new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver(), Formatting = Formatting.Indented });

            System.IO.File.WriteAllText(linksFilePath, updatedLinksJsonData);
        }
    }
}