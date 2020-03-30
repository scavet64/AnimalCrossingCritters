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

        private static List<string> Times = new List<string>()
        {
            "12 a.m.",
            "1 a.m.",
            "2 a.m.",
            "3 a.m.",
            "4 a.m.",
            "5 a.m.",
            "6 a.m.",
            "7 a.m.",
            "8 a.m.",
            "9 a.m.",
            "10 a.m.",
            "11 a.m.",
            "12 p.m.",
            "1 p.m.",
            "2 p.m.",
            "3 p.m.",
            "4 p.m.",
            "5 p.m.",
            "6 p.m.",
            "7 p.m.",
            "8 p.m.",
            "9 p.m.",
            "10 p.m.",
            "11 p.m."
        };

        static void Main(string[] args)
        {
            ConvertType<Fish>(@"C:\Users\vstro\Desktop\Animal Crossing\Fish.json", @"C:\Users\vstro\Desktop\Animal Crossing\FishCustom.json");
            Console.WriteLine("Finished Processing Fish\n\n");
            ConvertType<Critter>(@"C:\Users\vstro\Desktop\Animal Crossing\Bugs.json", @"C:\Users\vstro\Desktop\Animal Crossing\BugsCustom.json");
            Console.WriteLine("Finished Processing Bugs\n\n");

            Console.WriteLine("Done!");
        }


        private static void ConvertType<T>(string dataPath, string customPath) where T : Critter
        {
            string data = File.ReadAllText(dataPath);

            T[] critterArray = JsonConvert.DeserializeObject<T[]>(data);

            foreach (T critter in critterArray)
            {
                ConvertMonthsToData(critter);
                critter.TimeList = GetTimeOfDay(critter);
                Console.WriteLine($"processed: {critter.Name}");
            }

            string updatedFishJson = JsonConvert.SerializeObject(critterArray, Formatting.Indented);
            File.WriteAllText(customPath, updatedFishJson);
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

        private static List<string> GetTimeOfDay(Critter critter)
        {
            List<string> timeOfDay = new List<string>();

            if (critter.Time == "All day")
            {
                return Times;
            }
            else
            {
                string pattern = @"(\d \w.\w.) - (\d \w.\w.)";
                Regex rgx = new Regex(pattern);

                foreach (Match match in rgx.Matches(critter.Time))
                {

                    if (match.Groups.Count != 3)
                    {
                        Console.WriteLine($"Invalid regex matches for time: {critter.Time}");
                        throw new Exception();
                    }

                    string firstTime = match.Groups[1].Value;
                    string secondTime = match.Groups[2].Value;

                    bool finished = false;
                    int currentIndex = Times.IndexOf(firstTime);
                    while (!finished)
                    {
                        if (currentIndex >= Times.Count)
                        {
                            currentIndex = 0;
                        }
                        string monthAtIndex = Times[currentIndex];
                        if (monthAtIndex == secondTime)
                        {
                            // Found the end of the range
                            finished = true;
                            timeOfDay.Add(secondTime);
                        }
                        else
                        {
                            timeOfDay.Add(monthAtIndex);
                        }
                        currentIndex++;
                    }
                }
            }

            return timeOfDay;
        }
    }
}
