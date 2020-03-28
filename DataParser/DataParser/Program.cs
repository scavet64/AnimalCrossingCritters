using DataParser.Model;
using HtmlAgilityPack;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace DataParser
{
    class Program
    {
        private static List<string> Months = new List<string>()
        {
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        };

        static void Main(string[] args)
        {
            ConvertType<Fish>(@"C:\Users\vstro\Desktop\Animal Crossing\Fish.json", @"C:\Users\vstro\Desktop\Animal Crossing\FishCustom.json");
            ConvertType<Critter>(@"C:\Users\vstro\Desktop\Animal Crossing\Bugs.json", @"C:\Users\vstro\Desktop\Animal Crossing\BugsCustom.json");

            Console.WriteLine("Done!");
        }


        private static void ConvertType<T>(string dataPath, string customPath) where T : Critter
        {
            string data = File.ReadAllText(dataPath);

            T[] fishArray = JsonConvert.DeserializeObject<T[]>(data);

            foreach (T fish in fishArray)
            {
                ConvertMonthsToData(fish);
                Console.WriteLine($"processed: {fish.Name}");
            }

            string updatedFishJson = JsonConvert.SerializeObject(fishArray, Formatting.Indented);
            File.WriteAllText(customPath, updatedFishJson);
            Console.WriteLine("Finished Processing Fish\n\n");
        }

        private static void ConvertMonthsToData(Critter critter)
        {
            // Check if this is split by hemisphere
            if (critter.Month.Contains('/'))
            {
                string[] hemis = critter.Month.Split('/');
                critter.NorthHemisphere = GetMonths(hemis[0].Trim());
                critter.SouthHemisphere = GetMonths(hemis[1].Trim());
            }
            else
            {
                critter.NorthHemisphere = Months;
                critter.SouthHemisphere = Months;
            }
        }

        private static List<string> GetMonths(string hemisphereText)
        {
            List<string> monthsList = new List<string>();
            string pattern = @"\w+-\w+";
            Regex rgx = new Regex(pattern);

            foreach (Match match in rgx.Matches(hemisphereText))
            {
                

                string[] monthsArray = match.Value.Split('-');

                string firstMonth = monthsArray[0];
                string secondMonth = monthsArray[1];

                bool finished = false;
                int currentIndex = Months.IndexOf(firstMonth);
                while (!finished)
                {
                    if (currentIndex >= Months.Count)
                    {
                        currentIndex = 0;
                    }
                    string monthAtIndex = Months[currentIndex];
                    if (monthAtIndex == secondMonth)
                    {
                        // Found the end of the range
                        finished = true;
                        monthsList.Add(secondMonth);
                    }
                    else
                    {
                        monthsList.Add(monthAtIndex);
                    }
                    currentIndex++;


                }
            }
            return monthsList;
        }
    }
}
