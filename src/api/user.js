import request from '@/utils/request';
import defaultSettings from '@/config/defaultSettings'


//获取用户信息
export const getUserInfo = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "user-info/",
		method: "get",
		params: data
	})
}



//上传图标
export const uploadHeadImg = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "user-icon/",
		method: "post",
		data
	})
}


//获取用户信息
export const getUserList = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "user/",
		method: "get",
		params: data
	})
}

