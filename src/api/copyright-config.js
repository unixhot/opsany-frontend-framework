import request from '@/utils/request'
import defaultSettings from '@/config/defaultSettings'

export const getCopyRight = (data) => {
	return request({
		url: defaultSettings.apiPrefix + "copyright-config/",
		method: "get",
		params: data
	})
}
