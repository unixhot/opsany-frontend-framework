import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import cloud from './modules/cloud'
import btnAuth from './modules/btnAuth'
import language from './modules/language'
// import permission from './modules/permission'

import permission from './modules/async-router' //后端返回的菜单
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        cloud,
        btnAuth,
        language,
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters
})