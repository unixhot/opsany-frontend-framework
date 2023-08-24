<template>
    <div>
        <a-card>
            <div class="content">
                <div class="content_left">
                    <a-card>
                        <a-table style="margin-top: 10px" :pagination="false" :columns="columns" :dataSource="tableData" :loading="tableLoading" :row-key="record => record.unique_code">
                            <template slot="name" slot-scope="text,record">
                                <img v-if="record.data_type == 'folder'" style="width:20px;" src="~@/assets/icons/folder.png" alt="">
                                <img v-else-if="record.data_type == 'article' && record.contents_type==1" style="width:20px;" src="~@/assets/icons/text.png" alt="">
                                <img v-else-if="record.data_type == 'article' && record.contents_type==2" style="width:20px;" src="~@/assets/icons/markdown.png" alt="">
                                <a :title="text" style="margin:0 0 0 10px">{{text}}</a>
                            </template>
                            <template slot="created" slot-scope="record">
                                <span>{{ record.create_user && (record.create_user.ch_name || record.create_user.username) || "--"}}</span> / <span>{{record.created_at || "--"}}</span>
                            </template>

                        </a-table>
                    </a-card>
                </div>
                <div class="content_right">
                    <a-card>
                        <a-row style="border-bottom:1px solid #e8e8e8;">
                            <a-col span="8">
                                <div style="cursor: pointer;" class="statistics_box">
                                    <img src="~@/assets/icons/kbase.png" alt="">
                                    <div>
                                        <h4>{{number.all_kbase || 0}}</h4>
                                        <p>所有知识库</p>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span="8">
                                <div style="cursor: pointer;" class="statistics_box">
                                    <img src="~@/assets/icons/public.png" alt="">
                                    <div>
                                        <h4>{{number.public_kbase || 0}}</h4>
                                        <p>公共知识库</p>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span="8">
                                <div style="cursor: pointer;" class="statistics_box">
                                    <img src="~@/assets/icons/private.png" alt="">
                                    <div>
                                        <h4>{{number.owner_kbase || 0}}</h4>
                                        <p>我的知识库</p>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col span="8">
                                <div class="statistics_box">
                                    <img src="~@/assets/icons/text.png" alt="">
                                    <div>
                                        <h4>{{number.contents_type && number.contents_type[1] || 0}}</h4>
                                        <p>所有普通文章</p>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span="8">
                                <div class="statistics_box">
                                    <img src="~@/assets/icons/markdown.png" alt="">
                                    <div>
                                        <h4>{{number.contents_type && number.contents_type[2] || 0}}</h4>
                                        <p>所有Markdown文章</p>
                                    </div>
                                </div>
                            </a-col>
                            <a-col span="8">
                                <div class="statistics_box">
                                    <img src="~@/assets/icons/folder.png" alt="">
                                    <div>
                                        <h4>{{number.article_folder || 0}}</h4>
                                        <p>所有文章分类</p>
                                    </div>
                                </div>
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            size: { xxl: 8, xl: 12, lg: 12, md: 24, sm: 24, xs: 24, },
            number: {
                all_kbase: 8,
                public_kbase: 5,
                owner_kbase: 3,
                contents_type: {
                    "1": 4,
                    "2": 4,
                },
                article_folder: 3,
            },
            tableData: [
                {
                    data_type: "article",
                    unique_code: "111111",
                    name: "前端框架使用手册",
                    contents_type: 2,
                    created_at: "2023-03-22 20:14:27",
                    kbase: {
                        unique_code: "111111",
                        name: "前端模板知识库"
                    },
                    create_user: {
                        id: 6,
                        username: "lin",
                        ch_name: "林"
                    }
                },
                {
                    data_type: "article",
                    unique_code: "222",
                    name: "前端框架使用手册",
                    contents_type: 1,
                    created_at: "2023-03-22 20:12:59",
                    kbase: {
                        unique_code: "2222",
                        name: "前端模板知识库"
                    },
                    create_user: {
                        id: 6,
                        username: "lin",
                        ch_name: "林"
                    }
                },
                {
                    data_type: "article",
                    unique_code: "3333",
                    name: "111",
                    contents_type: 1,
                    created_at: "2023-03-18 14:53:43",
                    kbase: {
                        unique_code: "3333",
                        name: "测试w1"
                    },
                    create_user: {
                        id: 6,
                        username: "lin",
                        ch_name: "林"
                    }
                },
            ],
            columns: [
                { title: '名称', dataIndex: 'name', ellipsis: true, scopedSlots: { customRender: 'name' } },
                { title: '所属知识库', dataIndex: 'kbase.name', ellipsis: true },
                { title: '创建者 / 最近浏览时间', ellipsis: true, scopedSlots: { customRender: 'created' } },
            ],
            tableLoading: false,
        }
    }
}
</script>

<style lang="less" scoped>
.content {
    display: flex;
    .content_left {
        flex: 1300 1300 0;
        border-right: 1px solid #f5f5f5;
    }
    .content_right {
        flex: 1325 1325 0;
        padding: 0 0 0px 10px;
        overflow: hidden;
    }
}
.statistics_box {
    display: flex;
    align-items: center;
    padding: 20px 0;
    img {
        width: 40px;
        margin: 0 20px 0 0;
    }
    p {
        margin: 0;
    }
}
</style>