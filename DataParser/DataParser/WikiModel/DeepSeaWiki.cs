using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataParser.WikiModel
{
    class DeepSeaWiki
    {
        public string Name { get; set; }

        public string Price { get; set; }

        [JsonProperty("Shadow size")]
        public string ShadowSize { get; set; }

        [JsonProperty("Swimming pattern")]
        public string SwimmingPattern { get; set; }

        public string Time { get; set; }

        public string Month { get; set; }

        public string Jan { get; set; }

        public string Feb { get; set; }

        public string Mar { get; set; }

        public string Apr { get; set; }

        public string May { get; set; }

        public string Jun { get; set; }

        public string Jul { get; set; }

        public string Aug { get; set; }

        public string Sep { get; set; }

        public string Oct { get; set; }

        public string Nov { get; set; }

        public string Dec { get; set; }
    }
}
