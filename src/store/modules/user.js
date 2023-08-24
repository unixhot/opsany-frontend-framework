import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { getUserInfo } from '@/api/user'
import { start } from 'nprogress'
import config from '@/config/defaultSettings'
import { updateTheme } from '@/utils/util'

const user = {
	state: {
		token: '',
		name: '',
		welcome: '',
		avatar: '',
		roles: [],
		info: {},
		userInfo: {},
		userCollection: [],
		themeList: [
			{ name: '森林绿', color: '#0ba360', key: 'theme-default' },
			{ name: '极光绿', color: '#13c2c2', key: 'theme-green' },
			{ name: '火山', color: '#fa541c', key: 'theme-red' },
			{ name: '拂晓蓝', color: '#0052d9', key: 'theme-blue' },
			{ name: '日暮', color: '#faad14', key: 'theme-yellow' },
			{ name: '酱紫', color: '#722ed1', key: 'theme-purple' },
		],
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, { name, welcome }) => {
			state.name = name
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_INFO: (state, info) => {
			state.info = info
		},
		//设置用户信息
		setUserInfo: (state, info) => {
			state.userInfo = info
		},
		//设置用户收藏的导航
		setUserCollection: (state, info) => {
			state.userCollection = info;
		}
	},

	actions: {
		// 登录
		Login({ commit }, userInfo) {
			return new Promise((resolve, reject) => {
				login(userInfo).then(response => {
					const result = response.result
					storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
					commit('SET_TOKEN', result.token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取用户信息 -- 系统自带
		GetInfo({ commit }) {
			return new Promise((resolve, reject) => {
				getInfo().then(response => {
					const result = response.result

					if (result.role && result.role.permissions.length > 0) {
						const role = result.role
						role.permissions = result.role.permissions
						role.permissions.map(per => {
							if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
								const action = per.actionEntitySet.map(action => { return action.action })
								per.actionList = action
							}
						})
						role.permissionList = role.permissions.map(permission => { return permission.permissionId })
						commit('SET_ROLES', result.role)
						commit('SET_INFO', result)
					} else {
						reject(new Error('getInfo: roles must be a non-null array !'))
					}

					commit('SET_NAME', { name: result.name, welcome: welcome() })
					commit('SET_AVATAR', result.avatar)

					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 登出
		Logout({ commit, state }) {
			return new Promise((resolve) => {
				logout(state.token).then(() => {
					resolve()
				}).catch(() => {
					resolve()
				}).finally(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					storage.remove(ACCESS_TOKEN)
				})
			})
		},

		//获取用户信息
		getUserInfo({ commit, state }) {
			getUserInfo().then(res => {
				// this.formData = res.data;  
				res.data.icon_url = config.baseUrlOfImg + res.data.icon_url;
				commit('setUserInfo', res.data)

				if (state.themeList.map((item) => item.key).includes(res.data.theme)) {
					updateTheme(res.data.theme)
				} else {
					updateTheme('theme-default')
				}
			})
		},

	}
}

export default user