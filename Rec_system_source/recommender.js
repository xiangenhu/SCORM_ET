// JavaScript source code

    var waitForEl = function (selector, callback) {
        if (jQuery(selector).length) {
        callback();
    } else {
        setTimeout(function () {
            waitForEl(selector, callback);
        }, 100);
    }
    };

    waitForEl('.PHPUSERNAME', function () {
        // work the magic
        sendData2 = {
            userID: $('.PHPUSERNAME').html(),
            Resource: "http://ElectronixTutor.com/example",
            verbVal: "completed",
            count: 0,
            kcURI: "http://example.com/KC/",
            uri: "http://ElectronixTutor.com",
            SinceDate: "2017-10-16T12:00:00Z",
            UntilDate: ""
        }

        var test = getStatementsWithSearch(sendData2);


   

    });


//    $(document).ready(function () {


//        sendData = {
//            userID: "Joe1@gmail.com",
//            Resource: "http://activity.com/autotutor",
//            verbVal: "passed",
//            count: 0,
//            kcURI: "http://example.com/KC/",
//            uri: "http://activity.com/",
//            SinceDate: "",
//            UntilDate: ""
//        }

//        sendData2 = {
//        userID: "Cadarrius Mcglown",
//            Resource: "http://ElectronixTutor.com/example",
//            verbVal: "completed",
//            count: 0,
//            kcURI: "http://example.com/KC/",
//            uri: "http://ElectronixTutor.com",
//            SinceDate: "2017-10-16T12:00:00Z",
//            UntilDate: ""
//        }

//            var test = getStatementsWithSearch(sendData2);

//});

function GetURLVariable(v){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get(v);
    return c;
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

function xAPIStatement(verb){
   var basicStatement= {
        "actor": {
        "account": {
        "name": localStorage['userName'],
                    "homePage": "http://ElectronixTutor.com"
                },
                "objectType": "Agent"
            },
            "verb": ADL.verbs[verb],
            "object": {
        "id": "http://ElectronixTutor.com/example",
                "definition": {
        "name": {
        "en-US": localStorage['currentState']
                    },
                    "description": {
        "en-US": JSON.parse(localStorage['currentResource'])['File Name']
                    }
                },
                "objectType": "Activity"
            },"context": {
        "extensions": {
        "http://ElectronixTutor.com/Context": JSON.parse(localStorage['context'])


                }
            },
             "result": {
        "score": {
        "scaled": parseFloat((verb == 'completed') ? localStorage['score'] : 0.0)
                }
    }
        };

        console.log(JSON.stringify(basicStatement));

        wrapper.sendStatement(basicStatement, outputResults);

}


   
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
                    CallForSecondGoogleSheet(data);
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

            //getStatementsWithSearch(sendData);
    }



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

   /* if (agentID != "") {search['agent'] = JSON.stringify(agentID); }
    if (verbId != "") {search['verb'] = verbId; }
    if (verbSort != "") {search['ascending'] = verbSort; }
    //if (actorEmail != "") {search['agent'] = JSON.stringify({ "mbox": "mailto:" + actorEmail }); }
    if (activityId != "") {search['activity'] = activityId; }
    if (relatedAgents != "") {search['related_agents'] = relatedAgents; }
    if (relatedActivities != "") {search['related_activities'] = relatedActivities; }
    if (registrationId != "") {search['registration'] = registrationId; }
    if (statementId != "") {search['statementId'] = statementId; }
    if (voidedStatementId != "") {search['voidedStatementId'] = voidedStatementId; }
    if (sinceDate != "") {search['since'] = sinceDate; }
    if (untilDate != "") {search['until'] = untilDate; }
    if (limit != "") {search['limit'] = limit; }
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

                //var c = CountData(stmts);
                //var v = "sadf";


                // (1) Repeating Topics
                topicName = "Transistor";
                var shouldRepeatTopic = AskTheData("ShouldUserRepeatTopic", stmts, topicName);
                // if(avgScoreForTopic < .6){create recomendation link back to that topic bundle.  }


                // (2) Focusing on Underperforming KC's
                var shouldReceiveResources = AskTheData("WhichLearningResourcesToGiveUserFromTopic", stmts, topicName);
                var lol = "";

                 // (3) Pushing the Envelope
                 var pushingEnvelopeResources = AskTheData("WhichATandDragoonLearningResourcesPushTheEnvelopeForTopic", stmts, topicName);
                 var lol = "";



                     $('#RecButtons').append('<a href="http://et.x-in-y.com/mod/url/view.php?id=100" class="btn btn-info" role="button">Fixed Biased Transistor</a><br><br>');
                      $('#RecButtons').append('<a href="http://et.x-in-y.com/mod/url/view.php?id=99" class="btn btn-info" role="button">Battery Function</a><br><br>');
                       $('#RecButtons').append('<a href="#" class="btn btn-info" role="button">SkillBuilder </a>');

                //class = PHPUSERNAME
                //return only 3 recs
                 var recCount = 0;
                 var chosen = [];
                 shouldReceiveResources.forEach(function (item) {
                     if (recCount < 3 && item.Resource.includes('Auto') && !chosen.includes(item['UI Name'])) {
                        chosen.push(item['File Name']);
                         recCount = recCount + 1;
                         // $('#RecButtons').append('<a href="http://et.x-in-y.com/mod/url/view.php?id=99" class="btn btn-info" role="button">Link Button</a>');
                         //$('#RecButtons').append('<button type="button" value=' + item.Flash + ' class="btn btn-primary">' + item['UI Name'] + '</button>');
                     }
                     
                 });
                 if(chosen.length != 3){
                    shouldReceiveResources.forEach(function (item) {
                     if (recCount < 3 && !chosen.includes(item['UI Name'])) {
                        chosen.push(item['File Name']);
                         recCount = recCount + 1;
                        // $('#RecButtons').append('<a href="http://et.x-in-y.com/mod/url/view.php?id=99" class="btn btn-info" role="button">Link Button</a>');
                         //$('#RecButtons').append('<button type="button" value=' + item.Flash + ' class="btn btn-primary">' + item['UI Name'] + '</button>');
                     }
                     
                 });
                 }

                //remove loading gif moodle
                 $('#gifDiv').html("");
                 

            } else {
                var stmt = response;
                var length = 1;
            }

            return response.statements;


           // notify({title: "Status " + r.status + " " + r.statusText + ": ", message: "statements received successfully from LRS" }, notificationSettings);

       }
   });
}


    function AskTheData(question, data, extra) {
        var threshold = .6;
        switch (question) {

            case "ShouldUserRepeatTopic":
                /*
                When a student has a learning experience with a KCi  on multiple occasions,
                we assign the maximum value as its value, max(KCi).This max assignment
                assumes that the student gets credit for the Learning Resource or opportunity
                to learn in which they best performed (presumable better on the more recent experiences).
                The performance on the topic is the mean of the m KC’s associated with the topic {KC1, KC2, … KCm }.
                If this value is less than .6 then a topic can be repeated.
                */
                var averageScorePerTopic = {};

                var maxKC = {};
                data.forEach(function (item) {
                    var topic = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Topic;
                    var resource = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Resource;
                    var score = item.result.score.scaled;

                    //only look at the kc's for the topic of concern (extra is topic name here)
                    if (topic == extra) {

                        //get the max score for every kc the user experienced in this topic. (This is reffered to as the list of all max(KCi))
                        var object = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource;
                        for (var thing in item.context.extensions['http://ElectronixTutor.com/Context'].currentResource) {
                            if (thing.includes("KC") && object[thing] != "") {
                                var kcName = object[thing];
                                if (kcName in maxKC) {
                    score > maxKC[kcName] ? maxKC[kcName] = score : "";

                } else {
                    maxKC[kcName] = score; //score 
                }


                            }

                        }
                    }
                });
                /*
                The performance on the topic is the mean of the m KC’s associated with the topic {KC1, KC2, … KCm }.
                If this value is less than .6 then a topic can be repeated.
                */
                var meanOfKCScores = 0;
                for (var key in maxKC) {
                    meanOfKCScores = meanOfKCScores + maxKC[key];
                }
                meanOfKCScores = meanOfKCScores / Object.keys(maxKC).length;
                var repeat;
                meanOfKCScores < threshold ? repeat = true : repeat = false;

                return repeat;

                break;
            case "WhichLearningResourcesToGiveUserFromTopic":
                var averageScorePerTopic = {};

                var KCscores = [];
                var recommendedLessonNames = [];
                var resourcePool = [];
                data.forEach(function (item) {
                    var topic = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Topic;
                    var resource = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Resource;
                    var score = item.result.score.scaled;

                    //only look at the kc's for the topic of concern (extra is topic name here)
                    if (topic == extra) {

                        //get the max score for every kc the user experienced in this topic. (This is reffered to as the list of all max(KCi))
                        var object = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource;
                        for (var thing in item.context.extensions['http://ElectronixTutor.com/Context'].currentResource) {
                            if (thing.includes("KC") && object[thing] != "") {
                    KCscores.push(score);

                //only push the lesson if the user performs lower than .6 on it
                if(score < .6){
                    recommendedLessonNames.push(item.context.extensions['http://ElectronixTutor.com/Context'].currentResource["File Name"]);
                resourcePool.push(item.context.extensions['http://ElectronixTutor.com/Context'].currentResource);
                                }
                            }
                        }
                    }
                });
                /*
                The performance on the topic is the mean of the m KC’s associated with the topic {KC1, KC2, … KCm }.
                If this value is less than .6 then a topic can be repeated.
                */

                var meanOfKCScores = 0;
                KCscores.forEach(function(kcscore) {
                    meanOfKCScores = meanOfKCScores + kcscore;
                });

                meanOfKCScores = meanOfKCScores / KCscores.length;
                var repeat;
                meanOfKCScores < threshold ? repeat = true : repeat = false;

                var listOfRecs = {};
                if(meanOfKCScores >.3 && meanOfKCScores <.8 ){
                    /*
                    var uniqueRecommendedLessonNames = recommendedLessonNames.filter(function(elem, index, self) {
                    return index == self.indexOf(elem);
                });

                    uniqueRecommendedLessonNames.forEach(function(kcscore) {
                        //list
                    });

                    */
                    return resourcePool;

                }else{
                   return "none";
                }


                break;
                case "WhichATandDragoonLearningResourcesPushTheEnvelopeForTopic":
                  var averageScorePerTopic = {};

                    var KCscores = [];
                    var recommendedLessonNames = [];
                    var resourcePool = {}
                data.forEach(function (item) {
                        var topic = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Topic;
                        var resource = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource.Resource;
                        var score = item.result.score.scaled;

                        //only look at the kc's for the topic of concern (extra is topic name here)
                        if (topic == extra) {

                            //get all kc scores for topic
                            var object = item.context.extensions['http://ElectronixTutor.com/Context'].currentResource;
                            for (var thing in item.context.extensions['http://ElectronixTutor.com/Context'].currentResource) {
                                if (thing.includes("KC") && object[thing] != "") {
                    //Will use the list of kcscores to calculate the average for the topic
                    KCscores.push(score);

                //only push the lessons that are from ATDRQ or Dragoon
                if(resource.includes('Dragoon') || item.context.extensions['http://ElectronixTutor.com/Context'].currentResource["File Name"].includes("DRQ") ){
                    recommendedLessonNames.push(item.context.extensions['http://ElectronixTutor.com/Context'].currentResource["File Name"]);
                resourcePool[resource] =item.context.extensions['http://ElectronixTutor.com/Context'].currentResource;
                                    }
                                }
                            }
                        }
                    });

                      var meanOfKCScores = 0;
                KCscores.forEach(function(kcscore) {
                    meanOfKCScores = meanOfKCScores + kcscore;
                });
                meanOfKCScores = meanOfKCScores / KCscores.length;

                if(meanOfKCScores  <.6 ){
                    return resourcePool;

                }else{
                   return "none";
                }

                break;
            default:
                    return "nope";
                break;
        }



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
                //DecideAction(kcCountDictionary,resourceCountDictionary);

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

                    dataSet.push(["KC", item, kcCountDic[item]]);                           
                }

                for(var item in resourceCountDic) {

                    dataSet.push(["Resource", item, resourceCountDic[item]]);                           
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




                // Clear Statements received from the LRS
                function clearReceivedStatements() {
                    $("#received-statements").html("");
                }



