import request from '@/utils/request';
import defaultSettings from '@/config/defaultSettings'

/**
 * @deprecated  获取收藏的导航
 * @param {data} Object
 * @returns Promise
 */
export const getNavList = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "get-nav-and-collection/",
		method: "get",
		params: data
	})
}


/**
 * @deprecated  收藏/取消收藏
 * @param {data} Object
 * @returns Promise
 */
//上传图标
export const collection = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "collection/",
		method: "post",
		data
	})
}
