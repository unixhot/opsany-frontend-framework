<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import { mapActions } from 'vuex'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'

export default {
    data() {
        return {}
    },
    computed: {
        locale() {
            // 只是为了切换语言时，更新标题
            const { title } = this.$route.meta
            title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)

            let arr = document.cookie.split(";")
            let obj = {}
            arr.map(item => {
                obj[item.split("=")[0].trim()] = item.split("=")[1]
            })
            if (obj.opsany_language == "english") {
                return enUS
            } else if (obj.opsany_language == "chinese_traditional") {
                return zhTW
            } else {
                return zhCN
            }

        },
    },
}
</script>
