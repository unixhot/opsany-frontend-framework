import request from '@/utils/request';
import defaultSettings from '@/config/defaultSettings'

export const updateDirector = (data = {}) => {
    return request({
        url: defaultSettings.apiPrefix + "update-director/",
        method: "get",
        params: data
    })
}