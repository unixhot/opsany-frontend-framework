<template>
    <a-dropdown class="drop">
        <span class="action ant-dropdown-link user-dropdown-menu">
            <a-avatar class="avatar" size="small" :src="userInfo.icon_url" />
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
            <a-menu-item class="name" style="cursor:auto">
                <p style="margin:0;font-size:16px;font-weight:1000" @click.stop>
                    {{userInfo.username}}
                </p>
                <p style="margin:0;font-size:12px;color:#888" @click.stop>
                    {{language.drop_name}}：{{userInfo.ch_name || language.drop_none}}
                </p>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="0">
                <a :href="otherAppUrl + '/workbench/#/personSetting/personCenter'">
                    <a-icon type="user" />
                    <span> {{language.drop_user}}</span>
                </a>
            </a-menu-item>
            <a-menu-item key="1" v-if="userInfo.role == 1">
                <a :href="otherAppUrl + '/rbac/#/'">
                    <a-icon type="safety-certificate" />
                    <span> {{language.drop_rbac}}</span>
                </a>
            </a-menu-item>
            <a-menu-item key="3">
                <a :href="url + '/accounts/logout/'">
                    <a-icon type="logout" />
                    <span> {{language.drop_logout}}</span>
                </a>
            </a-menu-item>
        </a-menu>
    </a-dropdown>
</template>

<script>
import config from '@/config/defaultSettings'
import { mapState } from 'vuex'
export default {
    name: 'UserMenu',
    data() {
        return {
            url: window.API_ROOT.split('/')[0],
            otherAppUrl: "",
        }
    },
    created() {
        this.language = this.$store.state.language.languageAuth.public || {}
        this.otherAppUrl = "/" + window.API_ROOT.split("/")[1] + "/"
    },
    computed: {
        ...mapState({
            userInfo: (state) => {
                return state.user.userInfo || {}
            },
        }),
    },
}
</script>
<style lang="less" scoped>
.drop {
    min-width: 80px;
    text-align: center;
}
.ant-pro-drop-down {
    /deep/ .action {
        margin-right: 8px;
    }
    /deep/ .ant-dropdown-menu-item {
        min-width: 160px;
    }
}
.ant-dropdown-menu-item {
    padding: 10px 18px 10px 18px;
    a i {
        margin: 0 5px 0 0;
    }
}
.ant-dropdown-menu {
    border-radius: 6px;
}
.name{
    &:hover{
        background: #fff;
    }
}
</style>
