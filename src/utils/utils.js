import 'whatwg-fetch';
import $ from "jquery";
// import {TIMEDATE} from '../config/config';
export function checkStatus(response) {
	if (!response.ok) { // (response.status < 200 || response.status > 300)
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
	return response;
}

export function parseJSON(response) {
	return response.json();
}
/**
 * 封装fetch api
 */

export function callApi(url, parm, request, onRequestSuccess, onRequestFailure) {
	let csrfDom = document.querySelector('meta[name="_csrf_header"]'),
		csrfValueDom = document.querySelector('meta[name="_csrf"]'),
		headerKey = csrfDom ? (csrfDom.getAttribute('content') || '_csrf_header') : '_csrf_header',
		headerValue = csrfValueDom ? (csrfValueDom.getAttribute('content') || '_csrf') : '_csrf',
		options = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			credentials: 'same-origin'
		};
	options.headers[headerKey] = headerValue;
	return dispatch => {
		dispatch(request);
	
		return window.fetch(url, {
			method: 'post'
		})
			.then(checkStatus)
			.then(parseJSON)
			.then((json) => {
				dispatch(onRequestSuccess(json));
			}).catch((error) => {
				const response = error.response;
				if (response === undefined) {
					dispatch(onRequestFailure(error));
				} else {
					parseJSON(response)
						.then((json) => {
							error.status = response.status;
							error.statusText = response.statusText;
							error.message = json.message;
							dispatch(onRequestFailure(error));
						});
				}
			});
	};
}
export function getData(url, parm, callback) { //一般ajax请求 
	let csrfDom = document.querySelector('meta[name="_csrf_header"]'),
		csrfValueDom = document.querySelector('meta[name="_csrf"]'),
		headerKey = csrfDom ? (csrfDom.getAttribute('content') || '_csrf_header') : '_csrf_header',
		headerValue = csrfValueDom ? (csrfValueDom.getAttribute('content') || '_csrf') : '_csrf',
		options = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			credentials: 'same-origin'
		};
	options.headers[headerKey] = headerValue;

	window.fetch(url)
		.then(checkStatus)
		.then(parseJSON)
		.then(
			data => callback(data)
		);
}
/**
 * 导出
 */
export function getExport(url, parm) {
	let csrfDom = document.querySelector('meta[name="_csrf_header"]'),
		csrfValueDom = document.querySelector('meta[name="_csrf"]'),
		headerKey = csrfDom ? (csrfDom.getAttribute('content') || '_csrf_header') : '_csrf_header',
		headerValue = csrfValueDom ? (csrfValueDom.getAttribute('content') || '_csrf') : '_csrf',
		options = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			credentials: 'same-origin'
		};
	options.headers[headerKey] = headerValue;

	window.fetch(url, {
			method: 'post',
			...options,
			body: toString(parm)
		})
		.then(checkStatus)
		.then(parseJSON)
		.then(
			data => {
				window.location.href = data.path;
			}
		);
}

function toString(pars) {
	let str = '';
	for (let key in pars) {
		str += key + '=' + pars[key] + '&'
	}
	str = str.substring(0, str.length - 1)
	return str;
}

// export function geteChartData(data, format) {
// 	var arrays = [];
// 	let dateTime = (new Date().getTimezoneOffset() + TIMEDATE*60)*60;
// 	for (let i = 0; i < data.length; i++) {
// 		arrays.push(new Date((data[i]+dateTime) * 1000).format(format))
// 	}
// 	return arrays;
// }
/**
 * 表格内容排序
 */
export function getSort(a, b) {
	a = a || "";
	b = b || "";
	let num = a.length > b.length ? a.length : b.length; //取最大的那个字符串长度
	let bool = 0;
	for (let i = 0; i < num; i++) {
		if (a[i] === undefined) return -1;
		if (b[i] === undefined) return 1;
		bool = a[i].charCodeAt() - b[i].charCodeAt();
		if (bool !== 0) return bool;
	}
	return bool;
}
/**
 * sp、总体概览中 sp group ne参数获取
 * parm即this.parm
 * currentTarget——点击OK
 */
export function getParm(parm, currentTarget) {
	let li = $(currentTarget).parent().siblings('ul').find('li');
	li.each(function() {
		let me = $(this);
		if (me.find('.button').length) {
			let models = me.find('.itemBox>li'),
				modelsBox = [],
				liIndex = me.find('.itemBox').attr('name');
			if (parm['GROUPID'][liIndex]) parm['GROUPID'][liIndex]['selected'] = true;
			for (let i = 0; i < models.length; i++) {
				modelsBox.push({
					pid: models[i].getAttribute('pid'),
					text: models[i].innerHTML
				})
			}
			parm.modelId[liIndex] = modelsBox;
		}
	})
}
/**
 * 总体概览、sp页面参数转换成字符串
 * parm 需要处理的参数
 * type模块参数名称
 */
export function parmToString(parm) {
	let par = Object.assign({}, parm),
		modelIdStr = '',
		typeStr = '';
	for (let k in par['GROUPID']) {
		if (par.modelId && par.modelId[k]) {
			modelIdStr += arrayToString(par.modelId[k])
			typeStr += par['GROUPID'][k]['value'].toString() + ',';
		}
	}
	par.modelId = modelIdStr.substring(0, modelIdStr.length - 1);
	par['GROUPID'] = typeStr.substring(0, typeStr.length - 1);
	return par;
}
/**
 * parmToString方法的私有方法
 * @param {Object} data
 */
function arrayToString(data) {
	let str = '';
	for (let i = 0; i < data.length; i++) {
		str += data[i].pid + ','
	}
	str = str.substring(0, str.length - 1);
	return str + ';'
}
/**
 * 深拷贝
 */
export function deepCopy(source) {
	var result;
	(source instanceof Array) ? (result = []) : (result = {});

	for (var key in source) {
		result[key] = (typeof source[key] === 'object') ? deepCopy(source[key]) : source[key];
	}
	return result;
}
/**
 * 重组参数（总体概览、sp、筛选=》对象）;
 * allData 缓存的数组，
 * target 指标名字
 * return 指标id
 */
export function parmToObj(allData, target) {
	for (let i = 0; i < allData.length; i++) {
		if (allData[i].text === target) {
			return allData[i].value;
		}
	}
	return '';
}
/**
 * 总体概览/sp
 * bigModel 最大模块分类，class样式
 * e 点击事件参数
 * par 等同于 this.parm 参数
 * latelyParm 暂存参数
 * getActionOK 点击OK时的 action
 * getActionCancel 点击取消时的 action
 */
export function OKOrCancel(dispatch, e, par, getActionOK) {
	switch (e.currentTarget.innerHTML) {
		case 'OK':
			par.modelId = []; //指标清空
			//将Group全改为为选中状态
			for (let k in par['GROUPID']) {
				par['GROUPID'][k]['selected'] = false;
			}
			//获取参数
			getParm(par, e.currentTarget);
			//将参数拼接成需要的类型
			let parm = parmToString(par);
			dispatch(getActionOK(parm));
			break;
		default:
			break;
	}
}
export function getStartParm(parArray,initData){//获取默认快参数
	let arrays = [];
	for(let i = 0;i<parArray.length;i++){
		let item = initData.filter(e=>e.text === parArray[i]);
		item[0].selected = true;
		arrays.push(item[0]);
	}
	return arrays;
}
/**
 * 总体概览/sp，查询数据后获取下拉列表分别指标框
 * bigModel 最大模块分类，class样式
 * data 查询到的显示数据
 * getActionOptions 获取下拉指标列表的action
 */
export function getOptions(bigModel, dispatch, data, getActionOptions,bool) {
	setTimeout(() => {
		for (let i = 0; i < data['GROUPID'].length; i++) {
			let group = data['GROUPID'][i],
				itemBox = $(bigModel + ' .itemBox[name = ' + i + ']'), //对应多选框
				initData = bool==='newSp'?JSON.parse(sessionStorage.spInitData):JSON.parse(sessionStorage.initData); //获取总体筛选数据

			itemBox.empty(); //先清空
			itemBox.append(() => {
				let str = '';
				for (let k = 0;k<data[group].length;k++) {
					for (let j = 0; j < initData['modelId'].length; j++) {
						if (data[group][k]['text'] === initData['modelId'][j]['text']) {
							str += "<li title = '" + data[group][k]['text'] + "' pid = " + initData['modelId'][j].value + ">" + data[group][k]['text'] + "</li>"
							break; //跳出循环
						}
					}
				}
				return str;
			})
			dispatch(getActionOptions(group, i)); //获取指标下拉框
		}
	}, 0)
}
/**
 * 设置默认参数
 * 
 */
export function setDefaultParm(data, k, me) {
	if (data.GROUPID.length === 0) return;
	me.go = false; //保证只执行一次默认参数
	let initData = JSON.parse(sessionStorage.initData);
	for (let i = 0, group = data.GROUPID; i < group.length; i++) {
		me.parm.GROUPID.push({
			group: parmToObj(initData[k], group[i]),
			groupName: group[i],
			selected: true
		})
		let arrays = setDefaultMoldel(initData.modelId, data[group[i]]); //获取对应模块的默认指标
		me.parm.modelId.push(arrays);
	}
	me.latelyParm = deepCopy(me.parm); //拷贝一份给暂存值
}
/**
 * 获取对应模块的对应指标
 */
function setDefaultMoldel(data, groupItem) {
	let arrays = [];
	for (let k in groupItem) {
		if (/TREND$/.test(k) || k === 'CRITICALALARM' || k === 'PROMPTALARM' || k === 'CRITICALALARMTREND' || k === 'PROMPTALARMTREND' || k === 'icon') continue;
		arrays.push({
			pid: parmToObj(data, k),
			text: k
		})
	}

	return arrays;
}
/**
 * 创建一个guid
 * @return {[type]} [description]
 */
export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

/**
 * 时间对象格式化方法
 * @param {[type]} fmt [description]
 */
// if (typeof Date.prototype.format !== 'function') {
// 	Date.prototype.format = function(str) {
// 		str = str.toLowerCase();
// 		var that = this;

// 		if (/yyyy/.test(str)) {
// 			str = str.replace(/yyyy/, this.getFullYear());
// 		}
// 		if (/mm/.test(str)) {
// 			str = str.replace(/mm/, this.getMonth() + 1);
// 		}
// 		if (/dd/.test(str)) {
// 			str = str.replace(/dd/, this.getDate());
// 		}
// 		if (/hh/.test(str)) {
// 			str = str.replace(/hh/, function() {
// 				return that.getHours() >= 10 ? that.getHours() : ("0" + that.getHours());
// 			});
// 		}
// 		if (/ii/.test(str)) {
// 			str = str.replace(/ii/, function() {
// 				return that.getMinutes() >= 10 ? that.getMinutes() : ("0" + that.getMinutes());
// 			});
// 		}
// 		if (/ss/.test(str)) {
// 			str = str.replace(/ss/, function() {
// 				return that.getSeconds() >= 10 ? that.getSeconds() : ("0" + that.getSeconds());
// 			});
// 		}
// 		if (/week/.test(str)) {
// 			if (this.getDay() === 0) {
// 				str = str.replace(/week/, '星期日');
// 			}
// 			if (this.getDay() === 1) {
// 				str = str.replace(/week/, '星期一');
// 			}
// 			if (this.getDay() === 2) {
// 				str = str.replace(/week/, '星期二');
// 			}
// 			if (this.getDay() === 3) {
// 				str = str.replace(/week/, '星期三');
// 			}
// 			if (this.getDay() === 4) {
// 				str = str.replace(/week/, '星期四');
// 			}
// 			if (this.getDay() === 5) {
// 				str = str.replace(/week/, '星期五');
// 			}
// 			if (this.getDay() === 6) {
// 				str = str.replace(/week/, '星期六');
// 			}
// 		}

// 		return str

// 	}
// }


export function digitalRegularization(arr,digit){
	/*
	*@func:数据规整;
	*@params:(num)数据规整的数据，可以是数组和数字。
	*@params(str):取多少位小数.
	*/
	/*var digit=digit||0;
	var prence=Math.pow(10,digit);
	if(Array.isArray(arr)){
		var backArr=[];
		for(var i=0;i<arr.length;i++){
			if(arr[i]!=null&&arr[i]!=undefined){
				backArr.push(Math.floor(arr[i]*prence)/prence);
			}else{
				backArr.push(0);
			}
		}
		return backArr;
	}else{
		var num=Math.floor(arr*prence)/prence;
		return num;
	}*/
	return arr;
}