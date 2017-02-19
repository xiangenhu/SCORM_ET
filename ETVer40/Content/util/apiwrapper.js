/*******************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee does
** not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL CTC  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC  HAS BEEN ADVISED OF THE POSSIBILITY
** OF SUCH DAMAGES.
**
*******************************************************************************/

/*******************************************************************************
** This file is part of the ADL Sample API Implementation intended to provide
** an elementary example of the concepts presented in the ADL Sharable
** Content Object Reference Model (SCORM).
**
** The purpose in wrapping the calls to the API is to (1) provide a
** consistent means of finding the LMS API implementation within the window
** hierarchy and (2) to validate that the data being exchanged via the
** API conforms to the defined CMI data types.
**
** This is just one possible example for implementing the API guidelines for
** runtime communication between an LMS and executable content components.
** There are several other possible implementations.
**
** Usage: Executable course content can call the API Wrapper
**      functions as follows:
**
**    javascript:
**          var result = doInitialize();
**          if (result != true) 
**          {
**             // handle error
**          }
**
**    authorware
**          result := ReadURL("javascript:doInitialize()", 100)
**
*******************************************************************************/

var _Debug = false;  // set this to false to turn debugging off
                     // and get rid of those annoying alert boxes.

// Define exception/error codes
var _NoError = 0;
var _GeneralException = 101;
var _GeneralInitializationFailure = 102;
var _AlreadyInitialized = 103;
var _ContentInstanceTerminated = 104;
var _GeneralTerminationFailure = 111;
var _TerminationBeforeInitialization = 112;
var _TerminationAfterTermination = 113;
var _ReceivedDataBeforeInitialization = 122;
var _ReceivedDataAfterTermination = 123;
var _StoreDataBeforeInitialization = 132;
var _StoreDataAfterTermination = 133;
var _CommitBeforeInitialization = 142;
var _CommitAfterTermination = 143;
var _GeneralArgumentError = 201;
var _GeneralGetFailure = 301;
var _GeneralSetFailure = 351;
var _GeneralCommitFailure = 391;
var _UndefinedDataModelElement = 401;
var _UnimplementedDataModelElement = 402;
var _DataModelElementValueNotInitialized = 403;
var _DataModelElementIsReadOnly = 404;
var _DataModelElementIsWriteOnly = 405;
var _DataModelElementTypeMismatch = 406;
var _DataModelElementValueOutOfRange = 407;


// local variable definitions
var apiHandle = null;
var API = null;
var findAPITries = 0;
var startDate;
var gSkeleton = true;
//gSkeleton = false;


/*******************************************************************************
**
** Function: doInitialize()
** Inputs:  None
** Return:  CMIBoolean true if the initialization was successful, or
**          CMIBoolean false if the initialization failed.
**
** Description:
** Initialize communication with LMS by calling the Initialize
** function which will be implemented by the LMS.
**
*******************************************************************************/
function doInitialize()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nInitialize was not successful.");
      return "false";
   }

   var result = api.Initialize("");

   if (result.toString() != "true")
   {
      var err = ErrorHandler();
   }

   return result.toString();
}

/*******************************************************************************
**
** Function doTerminate()
** Inputs:  None
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Close communication with LMS by calling the Terminate
** function which will be implemented by the LMS
**
*******************************************************************************/
function doTerminate()
{  
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nTerminate was not successful.");
      return "false";
   }
   else
   {
      // call the Terminate function that should be implemented by the API

      var result = api.Terminate("");
      if (result.toString() != "true")
      {
         var err = ErrorHandler();
      }

   }

   return result.toString();
}

/*******************************************************************************
**
** Function doGetValue(name)
** Inputs:  name - string representing the cmi data model defined category or
**             element (e.g. cmi.core.student_id)
** Return:  The value presently assigned by the LMS to the cmi data model
**       element defined by the element or category identified by the name
**       input value.
**
** Description:
** Wraps the call to the GetValue method
**
*******************************************************************************/
function doGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nGetValue was not successful.");
      return "";
   }
   else
   {
      var value = api.GetValue(name);
      var errCode = api.GetLastError().toString();
      if (errCode != _NoError)
      {
         // an error was encountered so display the error description
         var errDescription = api.GetErrorString(errCode);
         if(errCode != "403") {
            alert("GetValue("+name+") failed. \n"+ errDescription);
         }
         return "";
      }
      else
      {
         
         return value.toString();
      }
   }
}

/*******************************************************************************
**
** Function doSetValue(name, value)
** Inputs:  name -string representing the data model defined category or element
**          value -the value that the named element or category will be assigned
** Return:  CMIBoolean true if successful
**          CMIBoolean false if failed.
**
** Description:
** Wraps the call to the SetValue function
**
*******************************************************************************/
function doSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nSetValue was not successful.");
      return;
   }
   else
   {
      var result = api.SetValue(name, value);
      if (result.toString() != "true")
      {
        alert("ERROR setting " + name + " = " + value);
        var err = ErrorHandler();
      }
   }

   return;
}

/*******************************************************************************
**
** Function doCommit()
** Inputs:  None
** Return:  None
**
** Description:
** Call the Commit function 
**
*******************************************************************************/
function doCommit()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nCommit was not successful.");
      return "false";
   }
   else
   {
      var result = api.Commit("");
      if (result != "true")
      {
         var err = ErrorHandler();
      }
   }

   return result.toString();
}

/*******************************************************************************
**
** Function doGetLastError()
** Inputs:  None
** Return:  The error code that was set by the last LMS function call
**
** Description:
** Call the GetLastError function 
**
*******************************************************************************/
function doGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nGetLastError was not successful.");
      //since we can't get the error code from the LMS, return a general error
      return _GeneralError;
   }

   return api.GetLastError().toString();
}

/*******************************************************************************
**
** Function doGetErrorString(errorCode)
** Inputs:  errorCode - Error Code
** Return:  The textual description that corresponds to the input error code
**
** Description:
** Call the GetErrorString function 
**
********************************************************************************/
function doGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nGetErrorString was not successful.");
   }

   return api.GetErrorString(errorCode).toString();
}

/*******************************************************************************
**
** Function doGetDiagnostic(errorCode)
** Inputs:  errorCode - Error Code(integer format), or null
** Return:  The vendor specific textual description that corresponds to the 
**          input error code
**
** Description:
** Call the LMSGetDiagnostic function
**
*******************************************************************************/
function doGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nGetDiagnostic was not successful.");
   }

   return api.GetDiagnostic(errorCode).toString();
}

/*******************************************************************************
**
** Function LMSIsInitialized()
** Inputs:  none
** Return:  true if the LMS API is currently initialized, otherwise false
**
** Description:
** Determines if the LMS API is currently initialized or not.
**
*******************************************************************************/
function LMSIsInitialized()
{
   // there is no direct method for determining if the LMS API is initialized
   // for example an LMSIsInitialized function defined on the API so we'll try
   // a simple LMSGetValue and trap for the LMS Not Initialized Error

   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
      return false;
   }
   else
   {
      var value = api.GetValue("cmi.core.student_name");
      var errCode = api.GetLastError().toString();
      if (errCode == _NotInitialized)
      {
         return false;
      }
      else
      {
         return true;
      }
   }
}

/*******************************************************************************
**
** Function ErrorHandler()
** Inputs:  None
** Return:  The current value of the LMS Error Code
**
** Description:
** Determines if an error was encountered by the previous API call
** and if so, displays a message to the user.  If the error code
** has associated text it is also displayed.
**
*******************************************************************************/
function ErrorHandler()
{
   var api = getAPIHandle();
   if (api == null)
   {
      alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
      return;
   }

   // check for errors caused by or from the LMS
   var errCode = api.GetLastError().toString();
   if (errCode != _NoError)
   {
      // an error was encountered so display the error description
      var errDescription = api.GetErrorString(errCode);

      if (_Debug == true)
      {
         errDescription += "\n";
         errDescription += api.GetDiagnostic(null);
         // by passing null to GetDiagnostic, we get any available diagnostics
         // on the previous error.
      }

      alert(errDescription);
   }

   return errCode;
}

/******************************************************************************
**
** Function getAPIHandle()
** Inputs:  None
** Return:  value contained by APIHandle
**
** Description:
** Returns the handle to API object if it was previously set,
** otherwise it returns null
**
*******************************************************************************/
function getAPIHandle()
{
   if (apiHandle == null)
   {
      apiHandle = getAPI();
   }

   return apiHandle;
}


/*******************************************************************************
**
** Function findAPI(win)
** Inputs:  win - a Window Object
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API in parent and opener windows
**
*******************************************************************************/
function findAPI(win)
{
   while ((win.API_1484_11 == null) && (win.parent != null) && (win.parent != win))
   {
      findAPITries++;
      
      if (findAPITries > 500) 
      {
         alert("Error finding API -- too deeply nested.");
         return null;
      }
      
      win = win.parent;

   }
   return win.API_1484_11;
}



/*******************************************************************************
**
** Function getAPI()
** Inputs:  none
** Return:  If an API object is found, it's returned, otherwise null is returned
**
** Description:
** This function looks for an object named API, first in the current window's 
** frame hierarchy and then, if necessary, in the current window's opener window
** hierarchy (if there is an opener window).
**
*******************************************************************************/
function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
   {
      theAPI = findAPI(window.opener);
   }
   if (theAPI == null)
   {
      alert("Unable to find an API adapter");
   }
   return theAPI
}


   /**********************************************************************
    **  Function: findObjective()
    **  Description: This function is used to find the approriate
    **               objective (using the identifier).
    **********************************************************************/
   function findObjective(obj)
   {
	   var numOfObj = doGetValue("cmi.objectives._count");
	   var objectiveLocation = -1;

	   for ( var i=0; i < numOfObj; i++ ) 
	   {
                if ( doGetValue("cmi.objectives." + i + ".id") == obj ) {
        			 objectiveLocation = i;
        			 break;
                }
	   }
      
           if ( objectiveLocation == -1 ) 
           {
                alert("objective " + obj + " not found");
                objectiveLocation = numOfObj;
                alert("setting index " + numOfObj + " -- and id to " + obj);
                doSetValue( "cmi.objectives." + objectiveLocation + ".id", obj);
           }

	   return objectiveLocation;
   }

   /**********************************************************************
   **  Function: setObjToPassed()
   **  Description: This function sets the objective at the given index
   **               to passed
   **********************************************************************/
   function setObjToPassed(index)
   {
      doSetValue("cmi.objectives." + index + ".success_status", "passed");
   }

   /**********************************************************************
   **  Function: setObjToFailed()
   **  Description: This function sets the objective at the given index
   **               to failed
   **********************************************************************/
   function setObjToFailed(index) {
      doSetValue("cmi.objectives." + index + ".success_status", "failed");
   }

   function doFindAndSetSuccessStatus(id,value) {
       var index = findObjective(id);
       if (index >= 0) {
           doSetValue("cmi.objectives." + index + ".success_status", value);
       }
   }
   /**********************************************************************
    **  Function: findInteractions()
    **  Description: This function is used to find the approriate
    **               objective (using the identifier).
    **********************************************************************/
   function findInteraction(id)
   {
	   var numOfObj = doGetValue("cmi.interactions._count");
	   var interactionLocation = -1;

	   for ( var i=0; i < numOfObj; i++ ) {
            if ( doGetValue("cmi.interactions." + i + ".id") == id) {
			    interactionLocation = i;
			    break;
            }
	   }
      
       if ( interactionLocation == -1 ) {
            interactionLocation = numOfObj;
            doSetValue( "cmi.interactions." + interactionLocation + ".id", id);
       }

	   return interactionLocation;
   }

    function getInteractionValue(c,key) {
        return doGetValue("cmi.interactions." + c + "." + key);
    }

   // IMEDIA.IT ADDED
   /**********************************************************************
   **  Function: setObjToFailed()
   **  Description: This function sets the objective at the given index
   **               to failed
   **********************************************************************/
   function setObjSuccessStatus(index,stat) {
      doSetValue("cmi.objectives." + index + ".success_status", stat);
   }
   function setObjCompletionStatus(index,stat) {
      doSetValue("cmi.objectives." + index + ".completion_status", stat);
   }
   function setObjNormalizedMeasure(index,val) {
      return doSetValue("cmi.objectives." + index + ".score.scaled",val);
   }
   function setObjRawScore(index,val) {
      return doSetValue("cmi.objectives." + index + ".score.raw",val);
   }

   /**********************************************************************
   **  Function: doGetObjNormalizedMeasure(index)
   **  Description: This function sets the objective at the given index
   **               to failed
   **********************************************************************/
   function getObjNormalizedMeasure(index) {
      return doGetValue("cmi.objectives." + index + ".score.scaled");
   }
   function getObjSuccessStatus(index) {
      return doGetValue("cmi.objectives." + index + ".success_status");
   }

/*******************************************************************************
** this function will convert seconds into hours, minutes, and seconds in
** CMITimespan type format - HHHH:MM:SS.SS (Hours has a max of 4 digits &
** Min of 2 digits
*******************************************************************************/
function convertTotalSeconds(ts) {
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;              //# of seconds in the total # of hours

   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1) {
      strWholeSec =  strSec.substring(0, strSec.indexOf("."));
      strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2) {
      strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length) {
      strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
      var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
      var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
      hour = "0"+hour;
   if ((new String(min)).length < 2)
      min = "0"+min;

   var rtnVal = "PT" + parseInt(hour)+"H"+parseInt(min)+"M"+parseInt(strSec)+"S";

   return rtnVal;
}

function startTimer() {
   startDate = new Date().getTime();
}

function computeTime() {
   if ( startDate != 0 )
   {
      var currentDate = new Date().getTime();
      var elapsedSeconds = ( (currentDate - startDate) / 1000 );
      var formattedTime = convertTotalSeconds( elapsedSeconds );
   }
   else
   {
      formattedTime = "PT0M0S";
   }

   doSetValue( "cmi.session_time", formattedTime );
}

function setContinueNav() {
    if (doGetValue("adl.nav.request_valid.continue")) {
        return doSetValue("adl.nav.request","continue");
    }
    return false;
}

function setChoiceNav(target) {
    if (doGetValue("adl.nav.request_valid.choice.{target="+target+"}")) {
        return doSetValue("adl.nav.request", "{target="+target+"}choice");
    }
    return false;
}
   

function suspendSco() {
    //alert('suspend');
    //alert("The course is being automatically suspended.  You may resume at a later time.");
    exitPageStatus = true;
    doSetValue("cmi.completion_status", "incomplete" );
    doSetValue("cmi.exit","suspend");
    doTerminate();
}

// callback functions for the applet
function getSuspendData() {
    return doGetValue( "cmi.suspend_data");
}

function setSuspendData(data) {
    doSetValue( "cmi.suspend_data", data);
    doCommit();
    return;
}

/**********************************************************************
 **  Function: objExists()
 **  Description: This function is used to find the approriate
 **               objective and see if it is declared
 **********************************************************************/
function objExists(obj) {
    var numOfObj = doGetValue("cmi.objectives._count");
    var objectiveLocation = -1;

    for ( var i=0; i < numOfObj; i++ ) {
        if ( doGetValue("cmi.objectives." + i + ".id") == obj ) {
     	    objectiveLocation = i;
     		break;
        }
    }
   
    if ( objectiveLocation == -1 ) {
        return false;
    }

    return true;
}

var gGlobalObjMap;
var gGlobalObjMapById;
function initializeObjMaps() {
    var numOfObj = doGetValue("cmi.objectives._count");
    var objectiveLocation = -1;
    var map = new Array();
    var mapById = new Object();

    for ( var i=0; i < numOfObj; i++ ) {
        var _tmpObj = new Object();

        _tmpObj = new Object();
        _tmpObj.id                = doGetValue("cmi.objectives."+i+".id");
        _tmpObj.success_status    = doGetValue("cmi.objectives."+i+".success_status");
        _tmpObj.score_raw         = doGetValue("cmi.objectives."+i+".score.raw");
        _tmpObj.score_scaled      = doGetValue("cmi.objectives."+i+".score.scaled");

        gGlobalObjMap[i] = _tmpObj;
        gGlobalObjMapById[_tmpObj.id] = _tmpObj
    }
}

function fetchGlobalObjMap() {
    var numOfObj = doGetValue("cmi.objectives._count");
    var objectiveLocation = -1;
    var map = new Array();

    for ( var i=0; i < numOfObj; i++ ) {
        map[i] = new Object();
        map[i].id                = doGetValue("cmi.objectives."+i+".id");
        map[i].success_status    = doGetValue("cmi.objectives."+i+".success_status");
        map[i].score_raw         = doGetValue("cmi.objectives."+i+".score.raw");
        map[i].score_scaled      = doGetValue("cmi.objectives."+i+".score.scaled");
        map[i].index             = i;
    }

    return map;
}

function fetchGlobalObjMapById() {
    var numOfObj = doGetValue("cmi.objectives._count");
    var objectiveLocation = -1;
    var map = new Object();

    for ( var i=0; i < numOfObj; i++ ) {
        var _id = doGetValue("cmi.objectives."+i+".id");
        map[_id] = new Object();
        map[_id].id                = _id;
        map[_id].success_status    = doGetValue("cmi.objectives."+i+".success_status");
        map[_id].score_raw         = doGetValue("cmi.objectives."+i+".score.raw");
        map[_id].score_scaled      = doGetValue("cmi.objectives."+i+".score.scaled");
        map[_id].index             = i;
    }

    return map;
}
