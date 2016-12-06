function __getCurrentDateTime(format='yyyy-mm-dd hh:mimi:ss',dt=new Date()){
	var x,date=[];
	date['d']=dt.getDate();
	date['dd']=dt.getDate()>10?dt.getDate():'0'+dt.getDate();
	date['m']=dt.getMonth()+1;
	date['mm']=(dt.getMonth()+1)>=10?(dt.getMonth()+1):'0'+(dt.getMonth()+1);
	date['yyyy']=dt.getFullYear();
	date['yy']=dt.getFullYear().toString().slice(-2);
	date['h']=(dt.getHours()>12?dt.getHours()-12:dt.getHours());
	date['hh']=dt.getHours();
	date['i']=dt.getMinutes();
	date['ii']=dt.getMinutes()<10?('0'+dt.getMinutes()):dt.getMinutes();
	date['s']=dt.getSeconds();
	date['ss']=dt.getSeconds()<10?('0'+dt.getSeconds()):dt.getSeconds();
	date['sss']=dt.getMilliseconds();
	date['ampm']=(dt.getHours()>=12?'PM':'AM');
	x=format.toLowerCase();
	x=x.indexOf('dd')!=-1?x.replace(/(dd)/i,date['dd']):x.replace(/(d)/i,date['d']);
	x=x.indexOf('mm')!=-1?x.replace(/(mm)/i,date['mm']):x.replace(/(m)/i,date['m']);
	x=x.indexOf('yyyy')!=-1?x.replace(/(yyyy)/i,date['yyyy']):x.replace(/(yy)/i,date['yy']);
	x=x.indexOf('hh')!=-1?x.replace(/(hh)/i,date['hh']):x.replace(/(h)/i,date['h']);
	x=x.indexOf('ii')!=-1?x.replace(/(ii)/i,date['ii']):x.replace(/(i)/i,date['i']);
	if(x.indexOf('sss')!=-1){	x=x.replace(/(sss)/i,date['sss']);	}
	x=x.indexOf('ss')!=-1?x.replace(/(ss)/i,date['ss']):x.replace(/(s)/i,date['s']);
	if(x.indexOf('ampm')!=-1){	x=x.replace(/(ampm)/i,date['ampm']);	}
	return x;
}

function __getBackDateTime(f,format){
	f=f.toLowerCase().split(' ');
	var dt=new Date(),arr={};
	for(var i in f){ 	arr[f[i].slice(0,1)]=f[i].substr(1);	}
	arr['y']?dt.setFullYear(dt.getFullYear()+parseInt(arr['y'])):null;
	arr['m']?dt.setMonth(dt.getMonth()+parseInt(arr['m'])):null;
	arr['d']?dt.setDate(dt.getDate()+parseInt(arr['d'])):null;
	arr['h']?dt.setHours(dt.getHours()+parseInt(arr['h'])):null;
	arr['i']?dt.setMinutes(dt.getMinutes()+parseInt(arr['i'])):null;
	arr['s']?dt.setSeconds(dt.getSeconds()+parseInt(arr['s'])):null;
	return __getCurrentDateTime(format,dt);
}
