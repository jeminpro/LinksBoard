using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinksBoard.Modals
{
    public class DeleteLinkRequest
    {
        public Guid LinkId { get; set; }
        public Guid GroupId { get; set; }
    }
}
