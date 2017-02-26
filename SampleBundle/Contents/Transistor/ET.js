
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

			


function GetLinks(module)
{
	var pageArray = new Array();
	var prefix = '';
	if  (module=="AutoTutorDR")			
    {    
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'e1b6b231-e63e-4c59-bbb0-f19d8f4d94a1');
		pageArray.push(prefix+'26bc9152-2735-44ab-ae6c-27a1879cb7d2');
		pageArray.push(prefix+'04c9e0a4-bb46-4d81-899a-9008babc02af');
	}
	if  (module=="NewAutoTutorDRQ")			
    {    
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'e1b6b231-e63e-4c59-bbb0-f19d8f4d94a1');
		pageArray.push(prefix+'26bc9152-2735-44ab-ae6c-27a1879cb7d2');
		pageArray.push(prefix+'04c9e0a4-bb46-4d81-899a-9008babc02af');
	}
	if  (module=="AutoTutorKC")			
    {       
        prefix='https://prod.x-in-y.com/ASAT2016/Template/Template_ET/Mainpage_ET.html?id=';
		pageArray.push(prefix+'0fe3a7f3-c4bf-4787-a036-a182f6b0af89');
		pageArray.push(prefix+'d2a1c9bf-322d-472b-9db1-d1a8f3c91340');
		pageArray.push(prefix+'c9f46e7d-3997-45f8-9189-bb78ef131c54');		
		pageArray.push(prefix+'e643c2fd-8c96-4eca-ab62-71b3e882e34c');
		pageArray.push(prefix+'4b09e417-9add-4316-b218-3e9ce3166f88');
		pageArray.push(prefix+'c9f46e7d-3997-45f8-9189-bb78ef131c54');
		pageArray.push(prefix+'6bd70043-b26d-4446-8212-0525ee3f19d0');
		pageArray.push(prefix+'6bd70043-b26d-4446-8212-0525ee3f19d0');
		pageArray.push(prefix+'611295d5-7ad9-4a96-8c1f-95a4eba2c191');
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