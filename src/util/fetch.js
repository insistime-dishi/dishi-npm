'use strict';

// qiao
var qiao 	= {};
qiao.ajax	= require('qiao-ajax');
qiao.config	= require('qiao-config').c();
qiao.log	= require('./log.js');

/**
 * post
 *  url
 *  data
 */
exports.post = async function(url, data){
	return await ajax(url, data);
};

/**
 * post
 *  url
 *  data
 */
exports.postWithToken = async function(url, data){
	var userinfo = qiao.config.config('userinfo');
	if(!userinfo || !userinfo.userid || !userinfo.usertoken){
		qiao.log.danger(`please login first`);
		return;
	}

	var headers = {
		userid 		: userinfo.userid,
		usertoken	: userinfo.usertoken
	};
	return await ajax(url, data, headers);
};

// ajax
async function ajax(url, data, headers){
	var options = {data: data};
	if(headers) options.headers = headers;

	var s = Date.now();
	var res;
	try{
		res = await qiao.ajax.post(url, options);
	}catch(e){
	}
	var time = Date.now() - s;

	// res error
	if(!res){
		qiao.log.danger(`${time}ms | request fail`);
		return;
	}

	// not 200
	if(res.status != 200){
		qiao.log.danger(`${time}ms | request fail: ${res.status}`);
		return;
	}

	// no data
	var json = res.data;
	if(!json){
		qiao.log.danger(`${time}ms | request fail: no data`);
		return;
	}

	// danger
	if(json.type == 'danger'){
		qiao.log.danger(`${time}ms | ${json.msg}`);
		return;
	}

	json.time = time;
    return json;
}