//working example://var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1gwmaZdyLonPG4hgiri-e20GEa0MgSCLwZOhix3CEsvE/pubhtml';
//replicated ET problem sheet
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1j1j1s8WqpXke5-dsNRoqmBsZZ0QtnjWOO1rYqw-5ZmE/pubhtml';
var sheetReaderData = '';


      function init() {
        Tabletop.init( { key: public_spreadsheet_url,
                         callback: initialDataPullForStudent,
                         simpleSheet: true } );
      }

      window.addEventListener('DOMContentLoaded', init)

      function showInfo(data) {
        // data comes through as a simple array since simpleSheet is turned on
        //document.getElementById("data").innerHTML = JSON.stringify(data);
        //console.log(data);
        sheetReaderData = data;
        //ShowGoogleSheetData(data);
        //console.log(sheetReaderData);
      }

