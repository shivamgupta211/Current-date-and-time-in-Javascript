/*
	__getCurrentDateTime is used to get date time in any string format
	
		d : 	Date single digit			ex.		4
		dd : 	Date 					ex.		04
		z : 	Full Day format				ex.		Sunday
		x : 	Small Day format			ex.		Sun
		m : 	Month single digit format		ex.		8
		mm : 	Month double digit format		ex.		08
		l : 	Month Alphabetic Large form		ex.		January
		q : 	Month Alphabetic Small form		ex.		Jan
		yy : 	Year full format			ex.		1993
		h : 	Single digit hour format		ex.		2
		hh : 	Double digit hour format		ex.		02
		m : 	Single digit minute format		ex.		5
		mm : 	Double digit minute format		ex.		05
		s : 	Single digit second format.		ex.		9
		ss : 	Double digit second format		ex.		09
		sss : 	Seconds in milliseconds format		ex.		562
		a : 	am or pm format				ex.		am
		
	param :
		format(string) :  format of output String ex : 'yyyy-mm-dd hh:ii:ss'
		dt(object) : Date time object, if no value passed, then it takes current Date Time object
	output :
		string format of date time
		
*/
function __getCurrentDateTime(format,dt){
	format=format||'yyyy-mm-dd hh:ii:ss';
	dt=dt||new Date();
	var x,date=[],monthNameLarge = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],monthNameSmall = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],daysSmall = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var str='qwertyuiopasdfghjklzxcvbnm1234567890';
	date['d']=dt.getDate();
	date['dd']=dt.getDate()>9?dt.getDate():'0'+dt.getDate();
	date['z']=days[dt.getDay()];
	date['x']=daysSmall[dt.getDay()];
	date['m']=dt.getMonth()+1;
	date['l']=monthNameLarge[dt.getMonth()];
	date['q']=monthNameSmall[dt.getMonth()];
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
	date['a']=(dt.getHours()>=12?'PM':'AM');
	x=format.toLowerCase();
	x=x.indexOf('dd')!=-1?x.replace(/(dd)/,date['dd']):x.replace(/(d)/,date['d']);
	x=x.indexOf('mm')!=-1?x.replace(/(mm)/,date['mm']):x.replace(/(m)/,date['m']);
	x=x.indexOf('yyyy')!=-1?x.replace(/(yyyy)/,date['yyyy']):x.replace(/(yy)/,date['yy']);
	x=x.indexOf('hh')!=-1?x.replace(/(hh)/,date['hh']):x.replace(/(h)/,date['h']);
	x=x.indexOf('ii')!=-1?x.replace(/(ii)/,date['ii']):x.replace(/(i)/,date['i']);
	if(x.indexOf('sss')!=-1){	x=x.replace(/(sss)/,date['sss']);	}
	x=x.indexOf('ss')!=-1?x.replace(/(ss)/,date['ss']):x.replace(/(s)/,date['s']);
	if(x.indexOf('a')!=-1){	x=x.replace(/(a)/,date['a']);	}
	x=x.indexOf('z')!=-1?x.replace(/(z)/,date['z']):x.replace(/(x)/,date['x']);;
	x=x.indexOf('l')!=-1?x.replace(/(l)/,date['l']):x.replace(/(q)/,date['q']);
	return x;
}


/*
	__getBackDateTime is used to get date time form present depending upon year, month, days, minutes, hours or seconds
	param :
		f(string) :  'd+10 m-5 y+2 h-1 m+10 s-5 ' depicts date and time after 10 days, before 5 months, after 2 years, before 1 hour, after 10 minutes, before 5 seconds
		format(string) : format in which you want to get date time using __getCurrentDateTime function
	output : 
		Date Time object
*/
function __getBackDateTime(f,format){
	//f='d+10 m-5 y+2 h-1 m+10 s-5 ';
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


/*
	__compareDates is used to compare 2 dates
	param :
		date1(string) : string of date in dd-mm-yyyy format
		date2(string) : string of date in dd-mm-yyyy format
	output : 
		0 => date1 and date2 is same
		1 => date1 is greater than date2
	       -1 => date1 is less than date2
*/
function __compareDates(date1,date2){
	var x=date1.split('-'),d1,d2;
	d1=new Date(x).getTime();
	if(date2){
		x=date2.split('-');
		d2=new Date(x).getTime();
	}
	else{
		x=new Date();
		d2=new Date(x.getFullYear(),x.getMonth()+1,x.getDate()).getTime();
	}
	return d1==d2?0:((d1-d2)<0?-1:1);
}


/*
	__convert12To24Time is used to convert time into respective 24 or 12 hours format
	param :
		time (string) : string of time taken from the user like 02:15 AM or 14:15
		format(string) : the format (12 or 24) in which you want your output time
*/
function __convert12To24Time(time,format){
	time = time.toLowerCase();
	if(format=='24'){
		var ampm = time.split(' ')[1];
		var t = time.split(' ')[0].split(':');
		if(ampm=='pm'){	t[0]=parseInt(t[0])+12;	}
		else if(ampm=='am' && +t[0]==12){	t[0]='0';	}
		if(+t[0]<10){ t[0]='0'+t[0];	}
		
		if(+t[1]<10 && +t[1]>0){ t[1]='0'+t[1];	}
		if(t.length==2){ t[2]='00';	}
		else if(+t[2]<10){ t[2]='0'+t[2];	}
		
		return t.join(':');
	}
	else{
		var t = time.split(':').map(function(e){	return parseInt(e);	});
		var ampm = t[0]>11?'PM':'AM';
		
		if(t[0]>12){	t[0]=parseInt(t[0])-12;	}
		if(t[0]==0){ t[0]='12';	}
		if(t[1]<10 && t[1]>=0){ t[1]='0'+t[1];	}
		if(t[2]){ t[2]=undefined;	}
		
		return t[0]+':'+t[1]+' '+ampm;
	}
}


/*
	__getDatesBetween is used to get date between two dates
	param :
		date(string) : date should be passed in form of dd-mm-yyyy
		format(string) : the type of format of end dates, like in date, milliSecs or DateTime object
*/
function __getDatesBetween(dates,format){
	format = format?format:'date';
	var from = dates[0],to = dates[1];
	var fromMilli = __getDateObject(from,'dd-mm-yyyy').getTime()/1000;
	var toMilli = __getDateObject(to,'dd-mm-yyyy').getTime()/1000;
	var day = 24*60*60;
	var arr = [];
	var d;
	while(fromMilli<=toMilli){
		d = new Date(fromMilli*1000);
		if(format =='date'){	arr.push(d.getDate()+'-'+(d.getMonth()+1)+'-'+ d.getFullYear());	}
		else if(format =='millisec'){	arr.push(fromMilli*1000);	}
		else if(format == 'object'){	arr.push(d);	}
		fromMilli+=day;
	}
	return arr;
}


/*
	__getDateObject is used to convert date into DateTime object
	param :
		date(string/object) : date
		format(string) : the format in which you are providing date
*/
function __getDateObject(date,format){
	format = format?format:'dd-mm-yyyy';
	if(format=='dd-mm-yyyy'){
		var d = date.split('-');
		return new Date(+d[2],+d[1]-1,+d[0]);
	}
}
