    <!DOCTYPE html>
    <html>
    <head>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

      
        <script type="text/javascript" src="tabletop/src/tabletop.js"></script>
        <script src="tabletop/sheetreader.js"></script>

       <script src="dist/xapiwrapper.min.js"></script>

       <script src="src/verbs.js"></script>

       <script src="dataTables/datatables.min.js"></script>
       <link rel="stylesheet" href="dataTables/datatables.min.css">

       <script src="dataTables/Scroller-1.4.2/js/dataTables.scroller.min.js"></script>
       <link rel="stylesheet" href="dataTables/Scroller-1.4.2/css/scroller.dataTables.min.css">



       <script language=javascript src="Config.js"></script>
        <!--
        <script src="../lib/cryptojs_v3.1.2.js"></script>
        <script src="../src/xapi-launch.js"></script>
        <script src="../src/xapiwrapper.js"></script> -->
        <!-- <script src="../src/offline.js"></script>
        <script src="../src/storage.js"></script>
        <script src="../src/validator.js"></script> -->

        <style>
            body {
                margin: 0;
            }
            
        </style>
    </head>
    <body  style="border:1px solid #000; overflow:hidden;">
	    
   
     <iframe id="iframe"   src="content.html" style="position: absolute; height: 100%; width:100%; border: none" align="middle"></iframe>
   
       

        <script>
            var iframe = document.getElementById('iframe'); 
        </script>
        <div id="results"></div>

 <button type="button" id="FeedBackDataButton" class="btn btn-info btn-lg" style="display:none;" data-toggle="modal" data-target="#FeedbackModal">Feedback Data</button>


  <div class="modal modal-wide fade" id="FeedbackModal" style="overflow-y: auto;" role="dialog">
    <div class="modal-dialog modal-lg" style="width: 80%;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h2 class="modal-title">We recommend the following lessons.</h2>
        </div>
        <div id="FeedbackModalBody" class="modal-body">
          
            
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



<script>
$( document ).ready(function() {


$( "#FeedbackModalBody" ).on( "click", ".recommendation", function() {

  console.log( $( this ).text() );
  document.getElementById('iframe').contentWindow.loadPage($( this ).val());
  
});

    
});



//Toggle between difrent debug views
function toggleView(){
	var source = document.getElementById('iframe').src;
	var temp = source.split('/');
	var viewSource = temp[temp.length-1];

	if(viewSource == 'tools.html'){
				document.getElementById('iframe').src = 'content.html';
			}else{
				document.getElementById('iframe').src = 'xAPITool/tools.html';
			}

}

//
//----------------
//

    var wrapper;
    ADL.launch(function(err, launchdata, xAPIWrapper) {
        if (!err) {
            wrapper = ADL.XAPIWrapper = xAPIWrapper;
            console.log("--- content launched via xAPI Launch ---\n", wrapper.lrs, "\n", launchdata);
        } else {
            wrapper = ADL.XAPIWrapper;
            wrapper.changeConfig({
                endpoint: "https://sko.waxlrs.com/TCAPI/",
                user: 'X88iLMqfLZs4o9nEDOhi',
                password: 'x8z43P0Xoi0oKXC6qSvQ'
            });
            console.log("--- content statically configured ---\n", wrapper.lrs);
        }
        $('#endpoint').text(wrapper.lrs.endpoint);
    }, true);

           function setupConfig() {
    // get LRS credentials from user interface
    var endpoint = "https://sko.waxlrs.com/TCAPI/";
    var user = 'X88iLMqfLZs4o9nEDOhi';
    var password = 'x8z43P0Xoi0oKXC6qSvQ';

    var conf = {
        "endpoint" : endpoint,
        "auth" : "Basic " + toBase64(user + ":" + password),
    };
    ADL.XAPIWrapper.changeConfig(conf);
}
</script>

<script>
    var outputResults = function (resp, thing) {
        var spanclass = "text-info";
        var text = "";
        if (resp.status >= 400) {
            spanclass = "text-danger";
            text = (thing.totalErrors > 1) ? "Errors: " : "Error: ";
            for ( var res in thing.results ) {
                text += "<br>" + ((thing.results[res].instance.id) ? thing.results[res].instance.id : "Statement " + res);
                for ( var err in thing.results[res].errors ) {
                    text += "<br>&nbsp;&nbsp;" + thing.results[res].errors[err].trace;
                    text += "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + thing.results[res].errors[err].message;
                }
            }
        } else {
            if ( resp.responseText )
                text = "Successfully sent " + resp.responseText;
            else
                text = thing;
        }

        var p = $('<p>').addClass(spanclass).html(text);
        $('#results').html("");
        $('#results').append(p);
    };

    // This will be updated to use the students id from moodle to pull for the real student that is logged in
    function initialDataPullForStudent(data){
        if(data != undefined)
        {
            sheetReaderData = data;
        }

        sendData = {
                userID : "Joe1@gmail.com",
                Resource : "http://activity.com/autotutor",
                verbVal : "passed",
                count: 0,
                kcURI : "http://example.com/KC/",
                uri: "http://activity.com/",
                SinceDate : "",
                UntilDate : ""
            }

            getStatementsWithSearch(sendData);
    }



    function send(recievedData){

    	

        ret = {
          actor: {account:{}},
          verb: ADL.verbs[recievedData.verbVal],
          object: {id: recievedData.Resource},
          context: {extensions:{}},
          timestamp: (new Date()).toISOString()
      };

      ret.actor.account.name = recievedData.userID;
      ret.actor.account.homePage = recievedData.uri;
      ret.actor.objectType ="Agent";

      recievedData.kcs.forEach(function(item, index, array) {
        var temp = item.replace(/ /g,'_');
        ret.context.extensions[recievedData.kcURI+temp] = temp;

    });

      ret.context.extensions[recievedData.uri+"topic/"+recievedData.topic] = recievedData.topic;

      ret.result = {};
      ret.result.score = {};
      ret.result.score.scaled = parseFloat(recievedData.sScore);



      console.log(ret);
      console.log('sending object - single stmt... ');             
                    //wrapper.sendStatement(sendValue, outputResults);
                    wrapper.sendStatement(ret, outputResults);
                    initialDataPullForStudent();
                    //getStatementsWithSearch(recievedData,"ResourcesPassedByUser");
                }

         

/*  Statement Manipulation and Response -- Receiving */

// Retreive statements from the LRS
function getStatementsWithSearch(recievedData) {
    setupConfig();

    var agentID = "";
    var verbSort = "";
    var verbId = "";//ADL.verbs.answered.id;
    var actorEmail ="";
    var activityId = "";
    var relatedAgents = "";
    var relatedActivities = "";
    var registrationId = "";
    var statementId = "";
    var voidedStatementId = "";
    var sinceDate = "";
    var untilDate = "";
    var limit = "";

 	var search = ADL.XAPIWrapper.searchParams();

        agentID = {"account": {"name": recievedData.userID,"homePage": recievedData.uri},"objectType": "Agent"};
        search['agent'] = JSON.stringify(agentID);
        search['activity'] = recievedData.Resource;

        if(recievedData.SinceDate != ""  ){
            search['since'] = recievedData.SinceDate; 
        }
        if(recievedData.UntilDate != ""){
            search['until'] = recievedData.UntilDate; 
        }
       
       search['verb'] = "http://adlnet.gov/expapi/verbs/"+recievedData.verbVal;

       var d = "";


    // Build Search
   
   /* if (agentID != "") { search['agent'] = JSON.stringify(agentID); }
    if (verbId != "") { search['verb'] = verbId; }
    if (verbSort != "") { search['ascending'] = verbSort; }
    //if (actorEmail != "") { search['agent'] = JSON.stringify({ "mbox": "mailto:" + actorEmail}); }
    if (activityId != "") { search['activity'] = activityId; }
    if (relatedAgents != "") { search['related_agents'] = relatedAgents; }
    if (relatedActivities != "") { search['related_activities'] = relatedActivities; }
    if (registrationId != "") { search['registration'] = registrationId; }
    if (statementId != "") { search['statementId'] = statementId; }
    if (voidedStatementId != "") { search['voidedStatementId'] = voidedStatementId; }
    if (sinceDate != "") { search['since'] = sinceDate; }
    if (untilDate != "") { search['until'] = untilDate; }
    if (limit != "") { search['limit'] = limit; }
    //console.log(search);*/

    ADL.XAPIWrapper.getStatements(search, null, function(r) {
        //console.log(r);
        var response = $.parseJSON(r.response);

        // notification
        if (r.status == 200) {

            // Handle case where only a single statement is returned
            // using statementId or voidedStatementId
            if (response.hasOwnProperty('statements')) {
                var stmts = response.statements;
                var length = stmts.length;
                //console.log(stmts);

                CountData(stmts);
                

            } else {
                var stmt = response;
                var length = 1;
            }  


           // notify({ title: "Status " + r.status + " " + r.statusText + ": ", message: "statements received successfully from LRS" }, notificationSettings);
           
       }
   });
}

function CountData(stmts){
    var kcCountDictionary = {};
    var resourceCountDictionary = {};
    //-----------------------------------
    var averageScorePerKC = {};
    var averageScorePerResource = {};

                //iterate all statements and count KCs
                stmts.forEach(function(item) {
                    //console.log("UserEmail: " + item.actor.account.name);
                    //console.log(item.context.extensions);
                    //console.log("Resource: " +item.object.id);

                    //iterate all KCs
                    for(var kc in item.context.extensions) {
                         if(kc in kcCountDictionary){
                            kcCountDictionary[kc] = kcCountDictionary[kc] + 1;
                        }else{
                            kcCountDictionary[kc] = 1;
                        }

                    }

                //Count Resources
                if(item.object.id in resourceCountDictionary){
                    resourceCountDictionary[item.object.id] = resourceCountDictionary[item.object.id] + 1;
                }else{
                 resourceCountDictionary[item.object.id] = 1;
                }



         });
                
                createTable(kcCountDictionary,resourceCountDictionary);
                DecideAction(kcCountDictionary,resourceCountDictionary);
                
            }

            function createTable(kcCountDic,resourceCountDic){

                var fake = "";

                var columns = [
                {title: "Type"},
                {title: "Name"},
                {title: "Count"}
                ];
                var dataSet = [];
                
                
                for(var item in kcCountDic) {
                  
                    dataSet.push(["KC",item,kcCountDic[item]]);                           
                }

                for(var item in resourceCountDic) {
                  
                    dataSet.push(["Resource",item,resourceCountDic[item]]);                           
                }

                
                $('#tableDiv').html('<table id="DebugDataTable" class="display" width="100%"></table>');
                $('#DebugDataTable').DataTable( {
                    
                    "sScrollX": "100%",
                    "bScrollCollapse": true,
                    data: dataSet,
                    columns: columns
                } ).draw();
            

                $("#generalDataButton").show();

            }

            function ShowGoogleSheetData(data)
            {
                //console.log('==============Google Sheet Data=========== ' );
               // console.log(data);
            }
            function DecideAction(kcCountDic,resourceCountDic){
                var accessibleResources = [];

                var tempGSheetData = sheetReaderData;


                console.log('==============Google Sheet Data============');
                console.log(tempGSheetData);
                console.log('===============Student LRS Data============');
                console.log(kcCountDic);
                console.log(resourceCountDic);


                  tempGSheetData.forEach(function(item, index, array) {
                    //make sure the requiredKC Field in google sheet has values
                    if(item.requiredKcs != null){
                        var numOfRequiredKcs = item.requiredKcs.split(',').length;
                        var numOfSatisfiedKcs = 0;

                         item.requiredKcs.split(',').forEach(function(requiredKc, index, array) {
                            //console.log(requiredKc.replace(/ /g,'_'));
                            requiredKc = requiredKc.replace(/ /g,'_');

                             //console.log(kcCountDic['http://example.com/KC/'+requiredKc]);
                            if(kcCountDic['http://example.com/KC/'+requiredKc] >0){
                                numOfSatisfiedKcs++;
                            }

     
                        });

                        console.log('Number of Required KCS: ' + numOfRequiredKcs + ' Number of Satisfied KCS: ' + numOfSatisfiedKcs);
                        


                        if(numOfRequiredKcs == numOfSatisfiedKcs){
                            accessibleResources.push({'displayName' : item['Problem Display Name'],'content' : item['Base Link (Original)'], 'unlocked': true});
                        }else{
                            accessibleResources.push({'displayName' : item['Problem Display Name'],'content' : item['Base Link (Original)'], 'unlocked': false});
                        }

                    }
                   


                });
                  console.log(accessibleResources);
                  $('#FeedbackModalBody').html('');
                   accessibleResources.forEach(function(item, index, array) {

                    if(item.unlocked == true){
                        $('#FeedbackModalBody')
                        .append(
                            $('<button  type="button" style=" padding: 10px 20px;font-size: 20px;border-radius: 10px;" class="btn btn-default recommendation"> '+ item.displayName + '</button>')
                            .val(item.content))
                        .append('<br/>').append('<br/>');
                    }
                        

                    });
                 
                  $('#FeedBackDataButton').click();

            }

            

// Clear Statements received from the LRS
function clearReceivedStatements() {
    $("#received-statements").html("");
}



</script>
</body>
</html>
