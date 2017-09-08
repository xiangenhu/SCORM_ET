
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

      function getinnerbundlematrix(username) {
        moodleUserName = username;
        Tabletop.init( { key: innerBundle_Matrix,
                         callback: function(data, tabletop) { 
                       //console.log(data)
                       calltwo(data);
                   },
                         simpleSheet: true } );
      }

      function calltwo(innerMatrix) {
        Tabletop.init( { key: ETResources,
                         callback: function(data, tabletop) { 
                       //console.log(data)

                       //var package = {};

                       context.innerMatrix = innerMatrix;
                       context.resources = data.Testing.elements;
                       var groupByTopic = GroupBy(data.Testing.elements, 'Topic');
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

