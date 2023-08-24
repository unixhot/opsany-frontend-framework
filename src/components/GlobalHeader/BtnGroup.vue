<template>
    <div class="content">
        <!-- <a-input-search placeholder="请输入" style="width: 200px;" /> -->
        <a :href="otherAppUrl + 'bastion/#/console/console'" target="_blank">
            <a-button type="link" class="a-button"><a-icon class="icon-color" type="desktop"></a-icon><span>{{language.btn_console}}</span></a-button>
        </a>
        <a :href="otherAppUrl + 'workbench/#/'">
            <a-button type="link" class="a-button"><a-icon class="icon-color" type="home"></a-icon><span>{{language.btn_workbench}}</span></a-button>
        </a>
        <a :href="otherAppUrl + 'workbench/#/feedback/addFeedBack?from_url=true'" target="_blank">
            <a-button type="link" class="a-button"><a-icon class="icon-color" type="file-add"></a-icon><span>{{language.btn_feedback}}</span></a-button>
        </a>
        <a-dropdown class="message">
            <span>
                <a-icon class="icon-color message_icon" type="bell"></a-icon>
                <span style="margin-left: 5px">{{language.btn_message}}</span>
                <span v-if="count" class="badge">{{ count }}</span>
            </span>
            <div slot="overlay" class="message_content">
                <div class="header">
                    <div class="header_title">{{language.btn_message_title}}</div>
                    <a class="header_right" :href="otherAppUrl + 'workbench/#/msgCenter/subscriptionSetting'">{{language.btn_messageManage}}</a>
                </div>
                <a-spin :spinning="loading">
                    <div v-if="msgList.length" style="background: #ffffff">
                        <div class="desc" v-for="item in msgList" :key="item.id" @click="linkToMsgDesc(item.id)">
                            <div class="desc_title">
                                <a-badge color="green" v-if="!item.is_read" />
                                <a-badge status="default" v-else />
                                {{ item.message.title_one }}
                            </div>
                            <div class="desc_time">{{ item.message.create_time.split('.')[0] }}</div>
                        </div>
                        <div class="more">
                            <a :href="otherAppUrl + 'workbench/#/msgCenter/messageManage'">
                                <a-button v-if="showMore" type="link">{{language.btn_more}}</a-button>
                            </a>
                            <a-button type="link" @click="readAll">{{language.btn_readAll}}</a-button>
                        </div>
                    </div>
                    <a-empty v-else style="padding: 20px 0;margin:0; background: #ffffff" />
                </a-spin>
            </div>
        </a-dropdown>

        <a :href="url + '/docs/'" target="_blank">
            <a-button type="link" class="a-button"><a-icon class="icon-color" type="file-text"></a-icon>{{language.btn_text}}</a-button>
        </a>
    </div>
</template>
<script>
import { getUserMessageList, readAllMessage } from '@/api/messageManage'

export default {
    data() {
        return {
            url: window.API_ROOT.split('/')[0],
            otherAppUrl: "",
            showMore: false,
            loading: false,
            msgList: [],
            count: 0,
        }
    },
    created() {
        this.language = this.$store.state.language.languageAuth.public || {}
        this.otherAppUrl = "/" + window.API_ROOT.split("/")[1] + "/"
    },
    methods: {
        readAll() {
            readAllMessage().then((res) => {
                this.getMsgData()
            })
        },
        getMsgData() {
            this.loading = true
            const params = {
                current: 1,
                pageSize: 5,
            }
            getUserMessageList(params)
                .then((res) => {
                    this.msgList = res.data.message_list
                    this.count = res.data.not_read_count > 99 ? 99 + '+' : res.data.not_read_count
                    this.showMore = res.data.all_count > 5
                })
                .finally(() => {
                    this.loading = false
                })
        },
        linkToMsgDesc(id) {
            const url = this.otherAppUrl + `workbench/#/msgCenter/messageManage/messageManageDesc?id=${id}`
            window.location.href = url
        },
    },
    mounted() {
        this.getMsgData()
    },
}
</script>
<style scoped lang="less">
.content {
    color: #fff;
    button {
        border: none !important;
        color: #fff;
    }
    .icon-color {
        color: #fff;
    }
    .message {
        display: inline-block;
        position: relative;
        min-width: 80px;
        text-align: center;
        .message_icon {
            transform: translateY(-1px);
        }
    }
    .badge {
        display: inline-block;
        padding: 1px 2px;
        min-width: 16px;
        min-height: 15px;
        line-height: 15px;
        text-align: center;
        background-color: #ff9900;
        color: #ffffff;
        border-radius: 50%;
        position: absolute;
        top: 4px;
        right: 0px;
        font-size: 10px;
    }
}

.message_content {
    width: 250px;
    min-height: 100px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eeeeee;
        background: #fafafa;
        &_title {
            font-weight: bold;
        }
        &_right {
            color: #0099ff;
            cursor: pointer;
        }
    }
    .desc {
        width: 100%;
        padding: 8px 10px;
        cursor: pointer;
        &:hover {
            background-color: #eeeeee;
        }
        div {
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        &_title {
            color: #333333;
        }
        &_time {
            font-size: 14px;
            color: #666666;
        }
        &:not(:last-child) {
            border-bottom: 1px solid #eeeeee;
        }
    }
    .more {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 10px;
        color: @primary-color;
    }
}
</style>