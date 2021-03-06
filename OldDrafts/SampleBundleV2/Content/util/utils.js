function mouseOver(btnId) {
    document.getElementById(btnId).src = "../images/" + btnId + "_ro.png";
}
function mouseOut(btnId) {
    document.getElementById(btnId).src = "../images/" + btnId + "_btn.png";
}


function GetQueryVar(search_for,defaultstr) {
            var query = window.location.search.substring(1);
			var parms = query.split('&');
			for (var i = 0; i<parms.length; i++) {
				var pos = parms[i].indexOf('=');
				if (pos > 0  && search_for == parms[i].substring(0,pos)) {
					return parms[i].substring(pos+1);
					}
				}
				return defaultstr;
			}
function GetNav()
{
	
	var queryString=GetQueryVar("T","CB_Amplifier");			
    var pageArray = new Array(9);
            pageArray[0] = "IniReading.html?T="+queryString;
			pageArray[1] = "AutoTutorDR.html?T="+queryString;			
			pageArray[2] = "AutoTutorKC.html?T="+queryString;
            pageArray[3] = "BBN.html?T="+queryString;  
            pageArray[4] = "Dragoon.html?T="+queryString;
            pageArray[5] = "SkillBuilder.html?T="+queryString;
            pageArray[6] = "ATTReading.html?T="+queryString;
            pageArray[7] = "NewAutoTutorDRQ.html?T="+queryString;
			pageArray[8] = "ThanksPage.html?T="+queryString;
	return pageArray;
}
			
function ComposeTest() {
	RenderTest(test);
}			
			

function ComposePage() {
	var URLString = GetQueryVar("CL","IniReading.html");
	var TopicString = GetQueryVar("T","CB_Amplifier");
    var html = 'Topic='+TopicString;
    html +=    '<div><iframe src="'+URLString+'"frameborder="1" width="1100" height="900" id="contentFrame"/></div>';
	document.getElementById("contentFrame").innerHTML = html; 
}

var gConfig = new Object();
function mergeConfigs(cConf) {
    for (var key in cConf) {
        gConfig[key] = cConf[key];
    }
}

function loadTemplate(customConfig) {
    $.ajaxSettings.async = false;
    $.getJSON("config.js", function(data) { gConfig = data;});

    mergeConfigs(customConfig);
    initDivs();


    var html = '<a href="#" onmouseover=mouseOver("welcome") onmouseout=mouseOut("welcome") onclick=goWelcome()><img height=100% src="../images/welcome_btn.png" id="welcome"  border="0" alt="Welcome Button" name="sub_but" /></a>';
    html += '<a href="#" onmouseover=mouseOver("templates") onmouseout=mouseOut("templates") onclick=goTemplates()><img height=100% src="../images/templates_btn.png" id="templates" border="0" alt="Welcome Button" name="sub_but" /></a>'; 
    html += '<a href="#" onmouseover=mouseOver("references") onmouseout=mouseOut("references") onclick=goReferences()><img height=100% src="../images/references_btn.png" id="references" border="0" alt="Welcome Button" name="sub_but" /></a>'; 

    document.getElementById("templateHeader").innerHTML = html;

    if (gConfig && typeof gConfig.next != "undefinded" && gConfig.next == "0") {
        // do not add the next link
    }
    else {
        html = '<a href="#" onmouseover=mouseOver("next") onmouseout=mouseOut("next") onclick=doNext()><img src="../images/next_btn.png" id="next" border="0" alt="Welcome Button" name="sub_but" /></a>'; 
        document.getElementById("templateFooter").innerHTML = html;
    }
}

function goToSCO(id) {
    doSetValue("adl.nav.request","{target="+id+"}jump");
    exitPageStatus = true;
    doTerminate();
}

function goWelcome() {
    goToSCO("SCO-ADL-TEMPLATES-WELCOME");
}

function goTemplates() {
    goToSCO("SCO-ADL-TEMPLATES-NAVMENU");
}
function goReferences() {
    goToSCO("SCO-ADL-TEMPLATES-REFS");
}

var localCalled = false;
function doNext() {
    if (!localCalled && typeof localDoNext == "function") {
        localCalled = true;
        localDoNext();
    }
    doContinue();
}
function doContinue() {
    if (exitPageStatus != true) {
        doSetValue("adl.nav.request","continue");
        exitPageStatus = true;
        doTerminate();
    }
}

function hideRules() {
    document.getElementById("rulesDiv").className = "popupHidden";
    document.getElementById("showRulesButton").innerHTML= "Show Rules";
    document.getElementById("showRulesButton").onclick  = showRules;
}
function showRules() {
    document.getElementById("rulesDiv").style.width = document.getElementById("rulesimg").width;
    document.getElementById("popupHeaderBar").style.width = document.getElementById("rulesimg").width;
    document.getElementById("rulesDiv").className = "popupRulesShow";// ui-widget-content";
    document.getElementById("showRulesButton").innerHTML= "Hide Rules";
    document.getElementById("showRulesButton").onclick  = hideRules;
}
function hideDesc() {
    document.getElementById("descDiv").className       = "popupHidden";
    document.getElementById("showDescButton").innerHTML= "Show Description";
    document.getElementById("showDescButton").onclick  = showDesc;
}
function showDesc() {
    document.getElementById("descDiv").className       = "popupDesc";
    document.getElementById("showDescButton").innerHTML= "Hide Description";
    document.getElementById("showDescButton").onclick  = hideDesc;
}

function initDivs() {
    var html = '<div id=templateHeader></div>';
    var popup_html = '';

    html +=    '<div id=content>';
    if (gConfig && gConfig.chartid) {
        html +=    '<img src="../images/adl_' + gConfig.chartid + '.png"><br>';
    }
    html +=    '</div>';

    nextHTML  = (gConfig && gConfig.hasNext) ? '&nbsp;&nbsp;<button onclick="nextPage()">Next Page</button>' : '' ;

    if (gConfig && gConfig.chartid) {
        html +=    '<div id=buttons><button id=showRulesButton onclick=showRules()>Show Rules</button>'; 
        html +=    '<button id=showDescButton onclick=showDesc()>Show Description</button>'+ nextHTML + '</div>';

        popup_html +=    '<div id=rulesDiv class="popupHidden">';
        popup_html +=    '  <div id=popupHeaderBar width=100%>';
        popup_html +=    '    <div id=moveimg><img width="15" height="15" src="../images/move_icon.png"></div>';
        popup_html +=    '    <div id=rulesDivHeaderText class="popupHeader">'+gConfig.tdescHeader+'</div>';
        popup_html +=    '    <div id=closeimg onclick=hideRules()><img src="../images/close_btn.png"></div>';
        popup_html +=    '  </div>';
        popup_html +=    '  <img id=rulesimg src="../images/'+ gConfig.tid +'_rules.png">';
        popup_html +=    '</div>';

        // rules divs
        popup_html +=    '<div id=descDiv class="popupHidden">';
        popup_html +=    '  <div id=popupHeaderBar>';
        popup_html +=    '    <div id=moveimg><img width="15" height="15" src="../images/move_icon.png"></div>';
        popup_html +=    '    <div id=descDivHeaderText class="popupHeader">'+gConfig.tdescHeader+'</div>';
        popup_html +=    '    <div id=closeimg onclick=hideDesc()><img src="../images/close_btn.png"></div>';
        popup_html +=    '  </div>';
        popup_html +=    '  <div id=descDivText class="popupDescText">'+gConfig.tdesc+'<p>';
        popup_html +=    '</div>';

    }

    html +=    '<div id=templateFooter></div>';

    if (typeof getDescription == "function") {
        html +=    '<div id=descriptionDivBG></div>';
        html +=    '<div id=descriptionDiv>'+getDescription()+'</div>';
    }

    document.getElementById("contentFrame").innerHTML = html + popup_html;

    if (document.getElementById("rulesDiv")) {
        document.getElementById("rulesDiv").style.width = document.getElementById("rulesimg").width;

        $(function() {
            $("#rulesDiv").draggable( { cursor : "move" });
        });
    }
    if (document.getElementById("descDiv")) {
        $(function() {
            $("#descDiv").draggable( { cursor : "move" });
        });
    }
}
function openRef(ref) {
    window.open(ref);
}

var QUESTION_TYPE_CHOICE = "choice";
var QUESTION_TYPE_TF = "true-false";
var QUESTION_TYPE_NUMERIC = "numeric";

function Question(id, text, type, answers, correctAnswer, objectiveId){
	this.Id = id;
	this.Text = text;
	this.Type = type;
	this.Answers = answers;
	this.CorrectAnswer = correctAnswer;
	this.ObjectiveId = objectiveId;
}

function Test(questions){
	this.Questions = questions;
}
Test.prototype.AddQuestion = function(question)
{
	this.Questions[this.Questions.length] = question;
}



function CheckNumeric(obj){
	var userText = new String(obj.value);
	var numbersRegEx = /[^0-9]/g;
	if (userText.search(numbersRegEx) >= 0){
		alert("Please enter only numeric values.");
		obj.value = userText.replace(numbersRegEx, "");
	}
}
function SubmitAnswers(){
	var correctCount = 0;
	var totalQuestions = test.Questions.length;
	
	var resultsSummary = "";
	
	for (var i in test.Questions){
		var question = test.Questions[i];
		
		var wasCorrect = false;
		var correctAnswer = null;
		var learnerResponse = "";
		
		switch (question.Type){
			case QUESTION_TYPE_CHOICE:

				for (var answerIndex = 0; answerIndex < question.Answers.length; answerIndex++){
					
					if (question.CorrectAnswer == question.Answers[answerIndex]){
						correctAnswer = answerIndex;
					}
					if (document.getElementById("question_" + question.Id + "_" + answerIndex).checked == true){
						learnerResponse = answerIndex;
					}
				}

			break;
			
			case QUESTION_TYPE_TF:
				
				if (document.getElementById("question_" + question.Id + "_True").checked == true){
					learnerResponse = "true";
				}
				if (document.getElementById("question_" + question.Id + "_False").checked == true){
				   learnerResponse = "false";
				} 
				   
				if (question.CorrectAnswer == true){
					correctAnswer = "true";
				}
				else{
					correctAnswer = "false"; 
				}
			break;
			
			case QUESTION_TYPE_NUMERIC:
				correctAnswer = question.CorrectAnswer;
				learnerResponse = document.getElementById("question_" + question.Id + "_Text").value;
			break;
			
			default:
				alert("invalid question type detected");
			break;
		}
		
		wasCorrect = (correctAnswer == learnerResponse);
		if (wasCorrect) {correctCount++;}
		
		if (parent.RecordQuestion){
			parent.RecordQuestion(test.Questions[i].Id, 
									test.Questions[i].Text, 
									test.Questions[i].Type, 
									learnerResponse, 
									correctAnswer, 
									wasCorrect, 
									test.Questions[i].ObjectiveId);
		}
		
		resultsSummary += "<div class='questionResult'><h3>Question " + i + "</h3>";
		if (wasCorrect) {
			resultsSummary += "<em>Correct</em><br>"
		}
		else{
			resultsSummary += "<em>Incorrect</em><br>"
			resultsSummary += "Your answer: " + learnerResponse + "<br>"
			resultsSummary += "Correct answer: " + correctAnswer + "<br>"
		}
		resultsSummary += "</div>";
	}
	var score = Math.round(correctCount * 100 / totalQuestions);
	resultsSummary = "<h3>Score: " + score + "</h3>" + resultsSummary;
	document.getElementById("test").innerHTML = resultsSummary;
	
	if (parent.RecordTest){
		parent.RecordTest(score);
	}
}
function RenderTest(test){
	var TestHTML="<div id='test'><form id='frmTest' action='#'>";
	
	for (var i in test.Questions){
		var question = test.Questions[i];
		
		TestHTML+="<div id='question_" + question.Id + "' class='question'>";
		TestHTML+=question.Text;
		
		switch (question.Type){
			case QUESTION_TYPE_CHOICE:
				var ansIndex = 0;
				for (var j in question.Answers){
					var answer = question.Answers[j];
					TestHTML+="<div ";
					if (question.CorrectAnswer == answer) {
						TestHTML+="class='correctAnswer'";} else{TestHTML+="class='answer'";}
					TestHTML+="><input type='radio' name='question_" + question.Id + "_choices' id='question_" + question.Id + "_" + ansIndex + "'/>" + answer + "</div>";
					ansIndex++;
				}
			break;
			
			case QUESTION_TYPE_TF:
				
				TestHTML+="<div ";
				if (question.CorrectAnswer == true) {TestHTML+="class='correctAnswer'";}else{TestHTML+="class='answer'";}
				TestHTML+="><input type='radio' name='question_" + question.Id + "_choices' id='question_" + question.Id + "_True'/>True</div>";
				
				TestHTML+="<div ";
				if (question.CorrectAnswer == false) {TestHTML+="class='correctAnswer'";}else{TestHTML+="class='answer'";}
				TestHTML+="><input type='radio' name='question_" + question.Id + "_choices' id='question_" + question.Id + "_False'/>False</div>";
			break;
			
			case QUESTION_TYPE_NUMERIC:
				TestHTML+="<div class='correctAnswer'><input type='text' value='' id='question_" + question.Id + "_Text' onchange='CheckNumeric(this)'/> (";
				TestHTML+=question.CorrectAnswer + ")</div>";
			break;
			
			default:
				alert("invalid question type detected");
			break;
		}
		TestHTML+="</div>";      //close out question div
	}
	TestHTML+="<input type='button' value='Submit Answers' onclick='SubmitAnswers();' />";
	TestHTML+="</form></div>";      //close out test div
	return TestHTML;
}
