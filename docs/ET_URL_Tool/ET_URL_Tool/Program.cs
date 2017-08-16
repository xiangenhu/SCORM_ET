using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Google.Apis.Auth.OAuth2;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.IO;
using System.Threading;

namespace ET_URL_Tool
{
    class Program
    {

        static Dictionary<string, string> ScormNameToScormLinkID = new Dictionary<string, string>();
        static Dictionary<string, string> SheetDisplayNameToScormLinkID = new Dictionary<string, string>();


        // If modifying these scopes, delete your previously saved credentials
        // at ~/.credentials/sheets.googleapis.com-dotnet-quickstart.json
        static string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static string ApplicationName = "Google Sheets API .NET Quickstart";


        static void Main(string[] args)
        {
            string connetionString = null;
            MySqlConnection cnn;
            connetionString = "server=70.40.220.105;database=xinyco1_ss_dbname7df;uid=xinyco1_cjm;pwd=trombone18;";
            cnn = new MySqlConnection(connetionString);
            try
            {
                

                MySqlCommand cmd = cnn.CreateCommand();
                cmd.CommandText = "SELECT * from knn_course_modules INNER JOIN knn_scorm ON knn_course_modules.instance = knn_scorm.id AND  knn_course_modules.module = 19;";


                cnn.Open();

                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    string id = reader[0].ToString();
                    string courseNumber = reader[1].ToString();
                    string name = reader[22].ToString();

                    //Here we get all of the scorm instance names from database along witht the link id's for each one
                    ScormNameToScormLinkID.Add(name,id);

                   
                   

                    Debug.WriteLine( id + " " + courseNumber+ " " +name+ " ");
                }

                Debug.WriteLine("Connection Open ! ");
                cnn.Close();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Can not open connection ! ");
            }

            sheets();
        }

        static void sheets()
        {
            UserCredential credential;

            using (var stream =
                new FileStream("client_secret.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = System.Environment.GetFolderPath(
                    System.Environment.SpecialFolder.Personal);
                credPath = Path.Combine(credPath, ".credentials/sheets.googleapis.com-dotnet-quickstart.json");

                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine("Credential file saved to: " + credPath);
            }

            // Create Google Sheets API service.
            var service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Define request parameters.
            String spreadsheetId = "1j1j1s8WqpXke5-dsNRoqmBsZZ0QtnjWOO1rYqw-5ZmE";
            //String range = "Class Data!A2:E";
            String range = "A1:Z209";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(spreadsheetId, range);

            // Prints the names and majors of students in a sample spreadsheet:
            // https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
            ValueRange response = request.Execute();
            IList<IList<Object>> values = response.Values;
            if (values != null && values.Count > 0)
            {
                int rowCount = 0;
                //Console.WriteLine("Name, Major");
                foreach (var row in values)
                {
                    //HEre we match the Scorm instance names from the database to the unique Problem Display names in the google sheet
                    try
                    {
                        if (ScormNameToScormLinkID.ContainsKey(row[1].ToString()))
                        {

                            String range2 = "AA" + (rowCount+1).ToString();  // update cell F5 
                            ValueRange valueRange = new ValueRange();
                            valueRange.MajorDimension = "COLUMNS";//"ROWS";//COLUMNS

                            var oblist = new List<object>() { Convert.ToInt32( ScormNameToScormLinkID[row[1].ToString()] ) };
                            valueRange.Values = new List<IList<object>> { oblist };

                            SpreadsheetsResource.ValuesResource.UpdateRequest update = service.Spreadsheets.Values.Update(valueRange, spreadsheetId, range2);
                            update.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;
                            UpdateValuesResponse result2 = update.Execute();

                            Console.WriteLine("done!");

                        }
                    }
                    catch(Exception e)
                    {
                        Debug.WriteLine(e);
                    }


                    // Debug.WriteLine("");

                    // Print columns A and E, which correspond to indices 0 and 4.
                    // Console.WriteLine("{0}, {1}", row[0], row[4]);
                    rowCount++;
                }
            }
            else
            {
                Console.WriteLine("No data found.");
            }
            Console.Read();


            /*
            String spreadsheetId2 = "<my spreadsheet ID>";
            //String range2 = "<my page name>!F5";  // update cell F5 
            String range2 = "AA210";  // update cell F5 
            ValueRange valueRange = new ValueRange();
            valueRange.MajorDimension = "COLUMNS";//"ROWS";//COLUMNS

            var oblist = new List<object>() { "My Cell Text" };
            valueRange.Values = new List<IList<object>> { oblist };

            SpreadsheetsResource.ValuesResource.UpdateRequest update = service.Spreadsheets.Values.Update(valueRange, spreadsheetId2, range2);
            update.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;
            UpdateValuesResponse result2 = update.Execute();

            Console.WriteLine("done!");
            */

        }
    }
}
