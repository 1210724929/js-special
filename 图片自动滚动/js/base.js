function myAddEvent(obj, sEv, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEv, function (){
			if(false==fn.call(obj))
			{
				event.cancelBubble=true;
				return false;
			}
		});
	}
	else
	{
		obj.addEventListener(sEv, function (ev){
			if(false==fn.call(obj))
			{
				ev.cancelBubble=true;
				ev.preventDefault();
			}
		}, false);
	}
}


//根据class选元素
function getByClass(oParent, sClass)
{
	var aEle=oParent.getElementsByTagName('*');
	var aResult=[];
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

//取得样式的方法
function getStyle(obj,attr)
{
	var result=0;
	if(obj.currentStyle)
	{
		result=obj.currentStyle[attr];
	}
	else
	{
		result=getComputedStyle(obj,false)[attr];
	}
	if(attr=='opacity')
	{
		result*=100;
		result=Math.round(result);
	}
	return parseInt(result);
}



//设置样式的方法
function setStyle(obj,attr,value)
{
	switch(attr)
	{
		case 'width':
		case 'height':
		case 'paddingLeft':
		case 'paddingTop':
		case 'paddingRight':
		case 'paddingBottom':
			value=Math.max(value,0);
		case 'left':
		case 'top':
		case 'marginLeft':
		case 'marginTop':
		case 'marginRight':
		case 'marginBottom':
			obj.style[attr]=value+'px';
			break;
		case 'opacity':
			obj.style.filter="alpha(opacity:"+value*100+")";
			obj.style.opacity=value;
			break;
		default:
			obj.style[attr]=value;
	}
}


function startMove(obj,json,fn)
{
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var isFinihed=true;
		for(var attr in json)
		{
			var iCur=getStyle(obj, attr);
			var iTarget=json[attr];
			var iSpeed=(iTarget-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			var iNew=iCur+iSpeed;
			if(iCur!=iTarget)
			{
				isFinihed=false;
			}
			setStyle(obj,attr,iNew);
		}
		
		if(isFinihed)
		{
			clearInterval(obj.timer);
			if(fn)
			{
				fn();
			}
		}
	},30);
}


