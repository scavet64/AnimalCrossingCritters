using System;
using System.Collections.Generic;
using System.Text;

namespace DataParser
{
    class Critter
    {
        public int CritterNumber { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Value { get; set; }
        public string Time { get; set; }
        public string Month { get; set; }
        public List<string> NorthHemisphere { get; set; }
        public List<string> SouthHemisphere { get; set; }
    }
}
