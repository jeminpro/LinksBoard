using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinksBoard.Modals
{
    public class LinkData
    {
        public List<GroupItem> GroupItems { get; set; }
    }

    public class GroupItem
    {
        public GroupItem()
        {
            Links = new List<LinkItem>();
        }

        public Guid GroupId { get; set; }
        public string GroupName { get; set; }
        public List<LinkItem> Links { get; set; }
    }

    public class LinkItem
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public Guid LinkId { get; set; }
    }
}
