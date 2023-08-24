const languageAuth = {
    state: {
        languageAuth: {},
    },
    mutations: {
        SET_LanguageAuth: (state, data) => {
            state.languageAuth = data
        }
    },
    actions: {
        GenerateLanguageAuth({ commit },data) {
            commit('SET_LanguageAuth', data)
        }
    }
}

export default languageAuth
