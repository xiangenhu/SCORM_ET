
//replicated ET problem sheet
//var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1j1j1s8WqpXke5-dsNRoqmBsZZ0QtnjWOO1rYqw-5ZmE/pubhtml';
var innerBundle_Matrix = 'https://docs.google.com/spreadsheets/d/1huIh2AkESRTGqlkecMMXCgGEV8delP38YxtJBpqn5LM/pubhtml';
var ETResources = 'https://docs.google.com/spreadsheets/d/1F9a35zfL551OFq-uxqAopyO-vk50ImQnpMtMPzbbDbg/pubhtml';
var sheetReaderData = '';
var moodleUserName = '';

      function init() {
        Tabletop.init( { key: innerBundle_Matrix,
                         callback: initialDataPullForStudent,
                         simpleSheet: true } );
      }

      function getinnerbundlematrix(username, topic) {
        moodleUserName = username;
        Tabletop.init( { key: innerBundle_Matrix,
                         callback: function(data, tabletop) { 
                       //console.log(data)
                       calltwo(data, topic);
                   },
                         simpleSheet: true } );
      }

      function calltwo(innerMatrix, topic) {
        Tabletop.init( { key: ETResources,
                         callback: function(data, tabletop) { 
                          var context = {};
                       //console.log(data)

                       //var package = {};

                       context.innerMatrix = innerMatrix;
                       context.resources = data.Testing.elements;
                       context.ResourcesGroupByTopic = GroupBy(data.Testing.elements, 'Topic');
                       context.TopicGroupByType = GroupByType(context.ResourcesGroupByTopic,topic);
                       //var ResourcesGroupByTopic = GroupBy(data.Testing.elements, 'Topic');
                       //var TopicGroupByType = GroupByType(ResourcesGroupByTopic,"Transistor");

                       localStorage['context'] = JSON.stringify(context);
                       BeginBundle();

                       console.log("This context provides the learning resources datasheet (JSON).. And the innerBundle transitions matrix (JSON)");
                       console.log(context);
                       //calltwo(data);
                   },
                         simpleSheet: false } );
      }

      function GroupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

    function GroupByType(json, topic) {
     var typeGrouping = {};
     
     //1) Group AT Knowledge check questions
     var SelectedReading = [];
     var AutoTutorDRQ = [];
     var AutoTutorKC = [];
     var SkillBuilder = [];
     var Dragoon = [];
     
       $.each(json[topic], function( index, value ) {

        if(value["File Name"].includes("SelectedReading")){
          SelectedReading.push(value);
        }
        
        if(value["File Name"].includes("KC")){
          AutoTutorKC.push(value);
        }

        if(value["File Name"].includes("DR")){
          AutoTutorDRQ.push(value);
        }
      
         if(value["File Name"].includes("SkillBuilder")){
          SkillBuilder.push(value);
        }

         if(value["File Name"].includes("Dragoon")){
          Dragoon.push(value);
        }
       });
       typeGrouping["SelectedReading"] = SelectedReading;
       typeGrouping["AutoTutorKC"] = AutoTutorKC;
       typeGrouping["AutoTutorDRQ"] = AutoTutorDRQ;
       typeGrouping["SkillBuilder"] = SkillBuilder;
       typeGrouping["Dragoon"] = Dragoon;
        //1) end
        return typeGrouping
    }


      function CallFromMoodle(username){
        moodleUserName = username;
        init();
        
      }

      function CallForSecondGoogleSheet(data){

        calltwo();
        
      }
     

      function showInfo(data) {
        // data comes through as a simple array since simpleSheet is turned on
        //document.getElementById("data").innerHTML = JSON.stringify(data);
        //console.log(data);
        sheetReaderData = data;
        //ShowGoogleSheetData(data);
        //console.log(sheetReaderData);
      }

