using DataParser.Model;
using DataParser.WikiModel;
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
            "12am",
            "1am",
            "2am",
            "3am",
            "4am",
            "5am",
            "6am",
            "7am",
            "8am",
            "9am",
            "10am",
            "11am",
            "12pm",
            "1pm",
            "2pm",
            "3pm",
            "4pm",
            "5pm",
            "6pm",
            "7pm",
            "8pm",
            "9pm",
            "10pm",
            "11pm"
        };

        static void Main(string[] args)
        {
            //ConvertType<Fish>(@"C:\Users\vstro\Desktop\Animal Crossing\Fish.json", @"C:\Users\vstro\Desktop\Animal Crossing\FishCustom.json");
            //Console.WriteLine("Finished Processing Fish\n\n");
            //ConvertType<Critter>(@"C:\Users\vstro\Desktop\Animal Crossing\Bugs.json", @"C:\Users\vstro\Desktop\Animal Crossing\BugsCustom.json");
            //Console.WriteLine("Finished Processing Bugs\n\n");
            ConvertDeepSea(@"C:\Users\vstro\Desktop\deep-sea.json", @"C:\Users\vstro\Downloads\deep-sea-South.json", @"C:\Users\vstro\Desktop\deep-sea-custom.json");
            Console.WriteLine("Finished Processing DeepSea\n\n");

            Console.WriteLine("Done!");
        }

        private static void ConvertDeepSea(string dataPath, string southPath, string customPath)
        {
            string data = File.ReadAllText(dataPath);
            string southData = File.ReadAllText(southPath);

            DeepSeaWiki[] critterArray = JsonConvert.DeserializeObject<DeepSeaWiki[]>(data);
            DeepSeaWiki[] southCritterArray = JsonConvert.DeserializeObject<DeepSeaWiki[]>(southData);
            DeepSea[] convertedArray = new DeepSea[critterArray.Length];

            for (int i = 0; i < critterArray.Length; i++)
            {
                var convertedCritter = new DeepSea
                {
                    NorthHemisphere = convertWikiMonths(critterArray[i]),
                    SouthHemisphere = convertWikiMonths(southCritterArray[i]),
                    TimeList = GetTimeOfDay(critterArray[i].Time),
                    CritterNumber = i + 1,
                    SwimmingPattern = critterArray[i].SwimmingPattern,
                    Location = critterArray[i].SwimmingPattern,
                    ShadowSize = critterArray[i].ShadowSize,
                    Value = critterArray[i].Price,
                    Name = critterArray[i].Name,
                    Time = critterArray[i].Time,
                };
                convertedArray[i] = convertedCritter;
                Console.WriteLine($"processed: {critterArray[i].Name}");
            }

            string updatedCritterJson = JsonConvert.SerializeObject(convertedArray, Formatting.Indented);
            File.WriteAllText(customPath, updatedCritterJson);
        }

        private static List<string> convertWikiMonths(DeepSeaWiki deepSea)
        {
            List<string> months = new List<string>();
            if (deepSea.Jan == "✓") months.Add(Months[0]);
            if (deepSea.Feb == "✓") months.Add(Months[1]);
            if (deepSea.Mar == "✓") months.Add(Months[2]);
            if (deepSea.Apr == "✓") months.Add(Months[3]);
            if (deepSea.May == "✓") months.Add(Months[4]);
            if (deepSea.Jun == "✓") months.Add(Months[5]);
            if (deepSea.Jul == "✓") months.Add(Months[6]);
            if (deepSea.Aug == "✓") months.Add(Months[7]);
            if (deepSea.Sep == "✓") months.Add(Months[8]);
            if (deepSea.Oct == "✓") months.Add(Months[9]);
            if (deepSea.Nov == "✓") months.Add(Months[10]);
            if (deepSea.Dec == "✓") months.Add(Months[11]);

            return months;
        }


        private static void ConvertType<T>(string dataPath, string customPath) where T : Critter
        {
            string data = File.ReadAllText(dataPath);

            T[] critterArray = JsonConvert.DeserializeObject<T[]>(data);

            foreach (T critter in critterArray)
            {
                ConvertMonthsToData(critter);
                critter.TimeList = GetTimeOfDay(critter.Time);
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

        private static List<string> GetTimeOfDay(string time)
        {
            List<string> timeOfDay = new List<string>();

            if (time == "All day")
            {
                return Times;
            }
            else
            {
                string pattern = @"(\d\w\w) - (\d\w\w)";
                Regex rgx = new Regex(pattern);

                foreach (Match match in rgx.Matches(time))
                {

                    if (match.Groups.Count != 3)
                    {
                        Console.WriteLine($"Invalid regex matches for time: {time}");
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
