import request from '@/utils/request'
import defaultSettings from '@/config/defaultSettings'

//获取菜单列表
export const getMenuList = (data = {}) => {
	return request({
		url: defaultSettings.apiPrefix + "get-menu/",
		method: "get",
		params: data
	})
}
