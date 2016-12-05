/*function __getCurrentDateTime(d,t,split){
	var dt=new Date(),x,y;
	if(d=='date'){
		x=(dt.getDate()>10?d.getDate():'0'+dt.getDate())+'-'+((dt.getMonth()+1)>10?(dt.getMonth()+1):'0'+(dt.getMonth()+1))+'-'+dt.getFullYear();
	}
	if(t=='time'){
		y=(dt.getHours()>12?dt.getHours()-12:dt.getHours())+':'+dt.getMinutes()+' '+(dt.getHours()>=12?'PM':'AM');
	}
	if(t=='time13'){
		y=(dt.getHours())+':'+dt.getMinutes()+':'+dt.getSeconds();
	}
	return x&&y?(x+''+(split?split:' ')+''+y):(x?x:y);
}*/

function __getCurrentDateTime(format){
	var dt=new Date(),x='',date=[];
	var date=[];
	date['d']=dt.getDate();
	date['dd']=dt.getDate()>10?dt.getDate():'0'+dt.getDate();
	date['m']=dt.getMonth()+1;
	date['mm']=(dt.getMonth()+1)>10?(dt.getMonth()+1):'0'+(dt.getMonth()+1);
	date['yyyy']=dt.getFullYear();
	date['yy']=dt.getFullYear().toString().slice(-2);
	date['h']=(dt.getHours()>12?dt.getHours()-12:dt.getHours());
	date['hh']=dt.getHours();
	date['mi']=dt.getMinutes();
	date['mimi']=dt.getMinutes()<10?('0'+dt.getMinutes()):dt.getMinutes();
	date['s']=dt.getSeconds();
	date['ss']=dt.getSeconds()<10?('0'+dt.getSeconds()):dt.getSeconds();
	date['sss']=dt.getMilliseconds();
	date['ampm']=(dt.getHours()>=12?'PM':'AM');
	x=format.toLowerCase();
	x=x.indexOf('dd')!=-1?x.replace(/(dd)/i,date['dd']):x.replace(/(d)/i,date['d']);
	x=x.indexOf('mm')!=-1?x.replace(/(mm)/i,date['mm']):x.replace(/(m)/i,date['m']);
	x=x.indexOf('yyyy')!=-1?x.replace(/(yyyy)/i,date['yyyy']):x.replace(/(yy)/i,date['yy']);
	x=x.indexOf('hh')!=-1?x.replace(/(hh)/i,date['hh']):x.replace(/(h)/i,date['h']);
	x=x.indexOf('mimi')!=-1?x.replace(/(mimi)/i,date['mimi']):x.replace(/(mi)/i,date['mi']);
	if(x.indexOf('sss')!=-1){	x=x.replace(/(sss)/i,date['sss']);	}
	x=x.indexOf('ss')!=-1?x.replace(/(ss)/i,date['ss']):x.replace(/(s)/i,date['s']);
	if(x.indexOf('ampm')!=-1){	x=x.replace(/(ampm)/i,date['ampm']);	}
	return x;
}

function __moveToDashboard(t){
	if(!isNaN(t)){
		setTimeout(function(){
			location.href='dashboard';
		},t);
	}
	else{	location.href='dashboard';	}
}

function __chkPreviousHistory(){
	console.log(document.referrer);
	return document.referrer?true:false;
}

function __historyGoBack(t){
	__chkPreviousHistory()?__goToPage(document.referrer,t):__goToPage('dashboard',t);
}

function __goToPage(page,t){
	if(!isNaN(t)){
		setTimeout(function(){
			location.href=page;
		},t);
	}
	else{	location.href=page;	}
}

function __objectSize(x){
	if(typeof x!=='undefined' && x!=''){
		return Object.keys(x).length;
	}
	else return false;
}

function __trimObject(x){
	if(typeof x!=='undefined' && x!=''){
		var o={};
		for(var k in x){
			if(k){	o[k]=x[k];	}
		}
		return o;
	}
	else return false;
}

function __loadScript(url,callback){
	if($('script[src="'+url+'"]').length){	callback(); return true;	}
	var script=document.createElement("script");
	script.type="text/javascript";
	if(script.readyState){  //IE
		script.onreadystatechange=function(){
		  if(script.readyState==="loaded" || script.readyState==="complete") {
				script.onreadystatechange=null;
				callback(); return true;
			}
		};
	}else{
		script.onload=function(){
			callback(); return true;
		};
	}
	script.src=url;
	document.getElementsByTagName("head")[0].appendChild(script);	
}

//done only for local js fils
function __loadScriptByAjax(url,callback){
	var xhr=new XMLHttpRequest();
	xhr.open("get",url,true);
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4){
			if (xhr.status>=200 && xhr.status<300 || xhr.statu ==304){
				var script=document.createElement("script");
				script.type="text/javascript";
				script.text=xhr.responseText;
				document.body.appendChild(script);
			}
		}
	};
	xhr.send(null);
}

function convert_date_format(x){
	if(typeof x!=='undefined' && x!=''){
		var arr=x.split('-');
		return arr.length==3?arr.reverse().join('-'):x;
		
	}
}

function __htmlEntities(str){
	return String(str).replace(/&/g,"&").replace(/</g,"&lt;").replace(/>/g,">").replace(/"/g, "\"");
}

function __addSlashes(str){
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function __removeSlashes(str){
	return str.replace(/\\(.)/mg, "$1");
}

var ajax_req_url,ajax_ts,ajax_alert=false;
function __get_data(url,data,func,local){
	/*done to filter out the url which are same and made within 100ms	*/
	var t=Math.floor(Date.now());
	if(ajax_ts && (t-ajax_ts)<100 && ajax_req_url==url){	return false;	}
	else{	ajax_req_url=url;	ajax_ts=t;	}
	/*__cl(t+' '+ajax_ts);
	__cl(url+' '+ajax_req_url);*/
	//return new Promise(function(resolve, reject){
		$.ajax({
			url : url,
			data : data?JSON.stringify(data):null,
			dataType : 'json',
			contentType : 'application/json',
			type : 'POST',
			async : true,
			success : function(resp){
				if(__isJson(resp)){
					if(resp.statusCode=='4001' && !ajax_alert){	// Checking for the session error
						alert("Attention!!!\nSession expired.<br>Please login again.<br>We forwarding you to login page.");
						setTimeout(function(){
							if(local!='undefined'){
								local?'':location.href='Login';
							}
							else{	location.href='Login';	}
						},1000);
						ajax_alert=true;
						return false;
					}
					ajax_alert=false;
					/*if(typeof func=='undefined'){ console.log('111');	resolve(resp);	}
					else*/ if(func){	func(resp); return true;	}
					else{
						return resp; return true;	//resolve(resp);
					}
				}
				else{
					return false;	//reject(resp);
				}
			},
			error:function(xhr,type,errorThrown){
				/*This is done to ensure that AJAX error is not due to page reload. As ajax goes to error() when page reloads while connecting*/
				if(xhr.getAllResponseHeaders() && !ajax_alert){
					xhr.abort();
					alert("Attention!!\n\nSome maintainence problem occured. Please try again later.\nWe are forwarding you to dashboard.");
					setTimeout(function(){
						if(local!='undefined'){ console.log('1');	local==true?'':location.href='dashboard';	}
						else{	location.href='dashboard';	}
					},1000);
					ajax_alert=true;
					return false;
				}
			}
		});
	//});
}


function __hasPrototypeProperty(object, name){
    return (name in object) && !object.hasOwnProperty(name);
}

function __cl(x){
	console.log(x);
}

function __slugify(x){
	return x.toLowerCase().replace(/\s+/g, '_');		//replaces only white spaces with '-'
}

// get the complete details of the url
function __get_url_details(x){
	if(typeof(x)!=='undefined'){
		var o={},p=document.createElement('a');
		p.href = decodeURIComponent(x);
		o.href=p.href;
		o.protocol=p.protocol?(p.protocol.split(':'))[0]:p.protocol;
		o.hostname=p.hostname;
		o.port=p.port;
		o.pathname=p.pathname;
		o.query=p.search?p.search.split('?')[1]:null;
		o.hash=p.hash?(p.hash.split('#'))[1]:null;
		o.hash_query=o.hash?(((/=/g).test(o.hash))?o.hash:null):null;
		o.host=p.host;
		o.query_details=o.query?[]:null;
		o.pathname_details=o.pathname==='/'?null:[];
		o.hash_query_details=o.hash_query?[]:null;
		var kv,q,i;
		if(o.query!==null){
			kv=o.query.split('&');
			for(i=0;i<kv.length;i++)
			{
				q=kv[i].split('=');
				o.query_details[q[0]]=q[1];
			}
		}
		if(o.pathname!=='/'){
			kv=o.pathname.split('/');
			for(i=0;i<kv.length;i++)
			{
				kv[i]&&(o.pathname_details.push(kv[i]));
			}
		}
		if(o.hash_query!==null){
			kv=o.hash_query.split('&');
			for(i=0;i<kv.length;i++)
			{
				q=kv[i].split('=');
				o.hash_query_details[q[0]]=q[1];
			}
		}
		return o;
	}
	else{
		return false;
	}
}


function __htmlDecode(x){
	var t=document.createElement("textarea").innerHTML=x;
	return t.value;
}

function __isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function __array_push(arr1,arr2)
{
	Array.prototype.push.apply(arr1, arr2);
}

// check whether a string is a json or not
function __isJson(j){
	var flag=true;
	if(typeof(j)!=='undefined'){
		try{
			try{	JSON.parse(j);	}
			catch(e){	flag=false;	}
			if(!flag){
				try{	JSON.stringify(j);	flag=true;	}
				catch(e){	flag=false;	}
			}
		}
		catch(e){	flag=false;	}
	}
	else{	flag=false;		}
	return flag;
}

// creates the copy of a non-cyclic object without passing reference to the new variable
function __clone(x){	if(typeof(x)!=='undefined' && __isJson(x)){	return JSON.parse(JSON.stringify(x));	}	}

function __hasClass(node,cls)
{
	if(node!==null)
	{
		if(node.className && node!=='undefined')
		{
			var classes=node.className.split(' ');
			for(x=0; x<classes.length ; x++)
			{
				if(classes[x]===cls)	{	return(true);	}
			}
		}
		else{ return(false);	}
	}
	else{ return(false);	}
}

	
function __addClass(node,cls){
	if(node!==null)
	{
		if(node.className && node!=='undefined')
		{
			var classes=node.className.split(' ');
			if(!hasClass(node,cls))
			{
				if(classes.length==0){		node.className=cls;	}
				else
				{	node.className=node.className+" "+cls;		}
			}
			else{ return(false);	}
		}
		else
		{
			node.className=cls;
		}
	}
	else{ return(false);	}
}

function __removeClass(node,cls)
{
	if(node!==null)
	{
		if(node.className && node!=='undefined')
		{
			var classes=node.className.split(' ');
			var a=null;
			for(x=0; x<classes.length ; x++)
			{
				if(classes[x]===cls)
				{
					classes[x]='';
				}
			}
			a=classes.join(" ");
			node.className=a;
		}
		else	{	return(false);	}
	}
	else	{	return(false);	}
}

function __removeClassFromAll(node,cls)
{
	if(node!=null)
	{
		for(i=0;i<node.length;i++)
		{
			if(node[i].className && node[i]!=='undefined')
			{
				var classes=node[i].className.split(' ');
				var a=null;
				for(x=0; x<classes.length ; x++)
				{
					if(classes[x]===cls)
					{
						classes[x]='';
					}
				}
				a=classes.join(" ");
				node[i].className=a;
			}
			else	{	return(false);	}
		}
	}
	else	{	return(false);	}
}

function __removeAllClass(node)
{
	if(node!==null)
	{
		if(node!=='undefined')
		{
			node.className='';
			return true;
		}
		else	{	return(false);	}
	}
	else	{	return(false);	}	
}

function __serialize(form) {if (!form || form.nodeName !== "FORM") {return;}var i, j;var data= new FormData();for (i = form.elements.length - 1; i >= 0; i = i - 1) {if (form.elements[i].name === "") {continue;}switch (form.elements[i].nodeName) {case 'INPUT':switch (form.elements[i].type) {case 'text':case 'hidden':case 'password':case 'button':case 'reset':case 'submit':data.append(form.elements[i].name,(form.elements[i].value));break;case 'checkbox':case 'radio':if (form.elements[i].checked) {data.append(form.elements[i].name,(form.elements[i].value));}break;case 'file':if(form.elements[i].files[0]){var f=form.elements[i];data.append(f.name,f.files[0],f.value);}break;}break; case 'TEXTAREA':data.append(form.elements[i].name,(form.elements[i].value));break;case 'SELECT':switch (form.elements[i].type) {case 'select-one':data.append(form.elements[i].name,(form.elements[i].value));break;case 'select-multiple':for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {if (form.elements[i].options[j].selected) {data.append(form.elements[i].name,(form.elements[i].options[j].value));}}break;}break;case 'BUTTON':switch (form.elements[i].type) {case 'reset':case 'submit':case 'button':data.append(form.elements[i].name,(form.elements[i].value));break;}break;}}return data;}