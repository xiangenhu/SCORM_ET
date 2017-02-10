function mouseOver(btnId) {
    document.getElementById(btnId).src = "../images/" + btnId + "_ro.png";
}
function mouseOut(btnId) {
    document.getElementById(btnId).src = "../images/" + btnId + "_btn.png";
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

    document.getElementById("maindiv").innerHTML = html + popup_html;

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
