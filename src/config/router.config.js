// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
	name: 'RouteView',
	render: (h) => h('router-view')
}

/**
 * 菜单级别路由
 * @type { *[] }
 */
export const asyncRouterMap = [{
	path: '/',
	name: 'index',
	component: BasicLayout,
	meta: { title: 'menu.home' },
	redirect: '/home',
	children: [{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home'),
		meta: { title: '概览', keepAlive: false, icon: "home" }
	},]
},

]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
	path: '/404',
	component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
},
{
	path: '/403',
	component: () => import('@/views/exception/403')
}, {
	path: '/error',
	component: () => import('@/views/exception/error')
}
]


/**
 * 不在菜单栏的路由 例：详情页路由
 * @type { *[] }
 */
export const detailRouterMap = [
	// {
	// 	path: '/patrolManage/patrolTemplate/quotaGroup',
	// 	name: 'quotaGroup',
	// 	component: () => import('@/views/patrolManage/patrolTemplate/quotaGroup'),
	// 	hidden: true,
	// 	meta: {
	// 		title: '巡检指标组',
	// 		parentRouteName: 'patrolTemplate'
	// 	},
	// },
]