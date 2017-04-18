
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

			


function GetLinks(module){
	var pageArray = new Array();
	var prefix = '';
	if  (module=="AutoTutorDR")			
    {    
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'04c9e0a4-bb46-4d81-899a-9008babc02af');
	}
	if  (module=="AutoTutorKC")			
    {       
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'e643c2fd-8c96-4eca-ab62-71b3e882e34c');
	}
	if  (module=="NewAutoTutorDRQ")			
    {    
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'35f867f7-9ef3-4a2a-a82c-c322061e1e67');
	}
	if  (module=="IniReading")			
    {   
        prefix='https://www.youtube.com/v/';
		pageArray.push(prefix+'7ukDKVHnac4');
		pageArray.push(prefix+'h9zL235htnQ');
	}
	if  (module=="Dragoon")			
    {   
        prefix='https://dragoon.asu.edu/ET/index.html?u=jww&m=COACHED&rp=on&a=waveform&sm=feedback&is=algebraic&s=ElectronixTutor';
		pageArray.push(prefix+'&p=ce-transistor-battery-bias');
	}
	if  (module=="BBN")			
    {   
        prefix='';
		pageArray.push(prefix+'https://goo.gl/ZeBTIo');
	}
	
	if  (module=="ATTReading")			
    {   
        prefix='https://www.youtube.com/v/';
		pageArray.push(prefix+'7ukDKVHnac4');
		pageArray.push(prefix+'h9zL235htnQ');
	}
	if  (module=="SkillBuilder")			
    {   
        prefix='https://www.youtube.com/v/';
		pageArray.push(prefix+'7ukDKVHnac4');
		pageArray.push(prefix+'h9zL235htnQ');
	}
	var index=Math.floor(Math.random() * pageArray.length);
	return pageArray[index];
}


