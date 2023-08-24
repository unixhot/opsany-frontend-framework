import store from '@/store'
import storage from 'store'
import language from "@/utils/language.js"
import {
  ACCESS_TOKEN,
  APP_LANGUAGE,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR, TOGGLE_HIDE_HEADER,
  TOGGLE_LAYOUT, TOGGLE_NAV_THEME, TOGGLE_WEAK,
  TOGGLE_COLOR, TOGGLE_MULTI_TAB
} from '@/store/mutation-types'
import { printANSI } from '@/utils/screenLog'
import defaultSettings from '@/config/defaultSettings'

export default function Initializer () {
  printANSI() // 请自行移除该行.  please remove this line

  store.commit(TOGGLE_LAYOUT, storage.get(TOGGLE_LAYOUT, defaultSettings.layout))
  store.commit(TOGGLE_FIXED_HEADER, storage.get(TOGGLE_FIXED_HEADER, defaultSettings.fixedHeader))
  store.commit(TOGGLE_FIXED_SIDEBAR, storage.get(TOGGLE_FIXED_SIDEBAR, defaultSettings.fixSiderbar))
  store.commit(TOGGLE_CONTENT_WIDTH, storage.get(TOGGLE_CONTENT_WIDTH, defaultSettings.contentWidth))
  store.commit(TOGGLE_HIDE_HEADER, storage.get(TOGGLE_HIDE_HEADER, defaultSettings.autoHideHeader))
  store.commit(TOGGLE_NAV_THEME, storage.get(TOGGLE_NAV_THEME, defaultSettings.navTheme))
  store.commit(TOGGLE_WEAK, storage.get(TOGGLE_WEAK, defaultSettings.colorWeak))
  store.commit(TOGGLE_COLOR, storage.get(TOGGLE_COLOR, defaultSettings.primaryColor))
  store.commit(TOGGLE_MULTI_TAB, storage.get(TOGGLE_MULTI_TAB, defaultSettings.multiTab))
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN))

//   store.dispatch('setLang', storage.get(APP_LANGUAGE, 'zh-CN'))
    let arr = document.cookie.split(";")
    let obj = {}
    let language_type = ""
    arr.map(item => {
        obj[item.split("=")[0].trim()] = item.split("=")[1]
    })
    if (obj.opsany_language == "english") {
        language_type = "en_language"
    } else if (obj.opsany_language == "chinese_traditional") {
        language_type = "zh_TW_language"
    } else {
        language_type = "zh_CN_language"
        store.dispatch('setLang','zh-CN')
    }
    let languageObj = {}
    for (let key in language) {
        languageObj[key] = language[key][language_type]
    }
    store.commit('SET_LanguageAuth', languageObj)

  // last step
}
