<template>
    <div>
        <a-select
            :default-value="language.nav_navigation"
            style="width: 120px"
            :dropdownMatchSelectWidth="false"
            :dropdownMenuStyle="{ width: '100%' }"
            @dropdownVisibleChange="changeSelect"
            class="select"
        >
            <a-icon slot="suffixIcon" type="caret-down" style="color: #fff" />
            <div slot="dropdownRender" class="content" @mousedown="(e) => e.preventDefault()">
                <!-- //我的收藏 -->
                <div class="collect">
                    <div class="collect_title">{{language.nav_collection}}</div>
                    <div class="collect_content">
                        <a
                            v-for="item in user_collection"
                            :key="item.id"
                            :target="item.target == '_blank' ? '_blank' : '_self'"
                            :href="item.nav_url"
                            class="collect_content_box"
                        >
                            <a-avatar
                                class="box_left"
                                shape="square"
                                :src="config.baseUrlOfImg + item.nav_icon.icon_url"
                            ></a-avatar>
                            <div class="box_center">
                                <div>
                                    <a class="link_style" :title="item.nav_name">{{ item.nav_name }}</a>
                                    <a-tooltip v-if="item.target == '_blank'" :title="language.nav_new">
                                        <img
                                            class="target_img"
                                            style="margin: 0 0 0 5px; width: 11px"
                                            src="~@/assets/image/新窗口打开-.png"
                                            alt=""
                                        />
                                    </a-tooltip>
                                    <a-tooltip v-else :title="language.nav_current">
                                        <img
                                            class="target_img"
                                            style="margin: 0 0 0 5px"
                                            src="~@/assets/image/当前窗口打开-.png"
                                            alt=""
                                        />
                                    </a-tooltip>
                                </div>
                                <div class="usernav_box_desc" :title="item.describe">
                                    {{ item.describe || language.nav_nodescription }}
                                </div>
                            </div>

                            <div class="box_right" @mousedown="(e) => e.preventDefault()">
                                <a-icon
                                    class="icon icon_bg"
                                    @click="handleCollect($event, item.id)"
                                    type="star"
                                ></a-icon>
                            </div>
                        </a>
                    </div>
                </div>
                <!-- 用户定义的导航 -->
                <div class="usernav">
                    <div v-for="group in navInfo" :key="group.id" class="usernav_box">
                        <div :title="group.group_name" class="usernav_box_title">
                            {{ group.group_name }}
                        </div>
                        <a
                            v-for="item in group.nav_list"
                            :key="item.id"
                            :target="item.target == '_blank' ? '_blank' : '_self'"
                            :href="item.nav_url"
                            class="usernav_box_item"
                        >
                            <a-avatar
                                class="box_left"
                                shape="square"
                                :src="config.baseUrlOfImg + item.nav_icon.icon_url"
                            ></a-avatar>
                            <div class="box_center">
                                <div>
                                    <a class="link_style" :title="item.nav_name">{{ item.nav_name }}</a>
                                    <a-tooltip v-if="item.target == '_blank'" :title="language.nav_new">
                                        <img
                                            class="target_img"
                                            style="margin: 0 0 0 5px; width: 10px"
                                            src="~@/assets/image/新窗口打开-.png"
                                            alt=""
                                        />
                                    </a-tooltip>
                                    <a-tooltip v-else :title="language.nav_current">
                                        <img
                                            class="target_img"
                                            style="margin: 0 0 0 5px; width: 10px"
                                            src="~@/assets/image/当前窗口打开-.png"
                                            alt=""
                                        />
                                    </a-tooltip>
                                </div>
                                <div class="usernav_box_desc" :title="item.describe">
                                    {{ item.describe || language.nav_nodescription }}
                                </div>
                            </div>
                            <div class="box_right" @mousedown="(e) => e.preventDefault()">
                                <a-icon
                                    class="icon"
                                    @click="handleCollect($event, item.id)"
                                    :class="{ icon_bg: item.is_collection }"
                                    type="star"
                                ></a-icon>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </a-select>
    </div>
</template>
<script>
import { getNavList, collection } from '@/api/navSetting'
import config from '@/config/defaultSettings'
export default {
    data() {
        return {
            user_collection: [],
            navInfo: [],
            config: {},
        }
    },
    created(){
        this.language = this.$store.state.language.languageAuth.public || {}
    },

    methods: {
        getNavList() {
            getNavList().then((res) => {
                const {
                    data: { user_collection, nav_info },
                } = res
                this.navInfo = nav_info
                this.user_collection = user_collection
            })
        },
        handleCollect(e, id) {
            e.preventDefault()
            collection({ nav_id: id }).then((res) => {
                this.getNavList()
            })
        },
        changeSelect(isOpen) {
            // isOpen && this.getNavList()
        },
        hrefWindowUrl(url) {
            window.location.href = url
        },
    },
    mounted() {
        this.config = config
        this.getNavList()
    },
}
</script>
<style scoped lang="less">
.select,
.ant-select {
    background: @primary-color;
    /deep/.ant-select-selection {
        background-color: lighten(@primary-color, 5%);
        border-radius: 25px;
        border-color: @primary-color;
        color: #ffffff;
        transition: none;
    }
}
.content {
    max-height: calc(100vh - 80px);
    height: 100%;
    min-height: 300px;
    margin-bottom: 10px;
    display: flex;
    overflow: auto;
    .collect {
        width: 220px;
        height: auto;
        min-height: 300px;
        border-right: 2px solid #eeeeee;
        &_title {
            padding: 16px 10px 10px 20px;
            margin: 0 0 10px 0;
            border-bottom: 1px solid #eeeeee;
            font-weight: bold;
        }
        &_content {
            &_box {
                padding: 10px 10px 10px 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                .box_left {
                    flex: 0 0 40px;
                }
                .box_center {
                    flex: 1 1 140px;
                }
                .box_right {
                    flex: 0 0 20px;
                }
                &:hover {
                    background: rgba(244, 249, 249, 1);
                    .target_img {
                        display: inline-block !important;
                    }
                    .link_style {
                        color: @primary-color;
                    }
                }
                .target_img {
                    display: none;
                }
            }
        }
    }
    .usernav {
        width: auto;
        height: 100%;
        display: flex;
        max-width: 880px;
        flex-wrap: wrap;
        margin: 0 10px 0 10px;
        &_box {
            display: flex;
            flex-flow: column;
            flex-wrap: wrap;
            min-width: 220px;
            &_title {
                padding: 16px 0px 10px 0px;
                border-bottom: 1px solid #eeeeee;
                font-weight: bold;
                margin: 0 10px 10px 10px;
                overflow: hidden;
                width: 200px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            &_item {
                display: flex;
                justify-content: space-between;
                padding: 10px 5px 10px 10px;
                align-items: center;
                cursor: pointer;
                .box_left {
                    flex: 0 0 40px;
                }
                .box_center {
                    flex: 1 1 140px;
                }
                .box_right {
                    flex: 0 0 20px;
                }
                &:hover {
                    background: rgba(244, 249, 249, 1);
                    .target_img {
                        display: inline-block !important;
                    }
                    .link_style {
                        color: @primary-color;
                    }
                    .icon {
                        display: block !important;
                    }
                }
                .target_img {
                    display: none;
                }
            }
            &_desc {
                width: 140px;
                color: #888;
                padding-left: 10px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
            }
        }
    }
    .icon {
        cursor: pointer;
        color: #555;
        display: none;
    }
    .icon_bg {
        color: #ff9600;
        display: block !important;
    }
}
.link_style {
    font-weight: 600;
    padding-left: 10px;
    color: #333333;
    max-width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
    white-space: nowrap;
    display: inline-block !important;
    &::selection {
        color: #333 !important;
        background: #fff;
    }
}
/deep/.ant-avatar {
    width: 40px;
    height: 40px;
}
</style>