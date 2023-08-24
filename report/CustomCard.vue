<template>
    <div>
        <a-card :loading="tableLoading || historyInfoLoading" title="总览">
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <a-card class="cardShadow">
                        <div class="title">
                            <span class="text_dot"></span>
                            <span>基本信息</span>
                        </div>
                        <a-row :gutter="[16, 16]" v-if="Object.keys(infoData).length">
                            <a-col :span="8" v-for="(item, index) in infoData" :key="index">
                                {{ item.name }}：{{ item.value === 0 ? item.value : item.value || '--' }}
                                {{ item.unit }}</a-col
                            >
                        </a-row>
                        <a-empty style="margin: 20px 0" v-else></a-empty>
                    </a-card>
                </a-col>
                <a-col v-for="(item, index) in tableArray" :span="item.col * 2" :key="index">
                    <a-card v-if="item.type == 'group' && item.visible_type == 2" class="cardShadow">
                        <div class="title">
                            <span class="text_dot"></span>
                            <span>{{ item.name }}</span>
                        </div>
                        <a-table :columns="item.children" :data-source="item.dataSource" :pagination="false"></a-table>
                    </a-card>

                    <div v-if="item.type == 'quota'">
                        <a-card
                            v-if="item.visible_type == 3"
                            class="cardShadow"
                            :body-style="{
                                height: item.height * 20 + 'px',
                                minHeight: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                maxHeight: '250px',
                            }"
                        >
                            <div class="card_content">
                                <div :title="item.value" class="w-ellipits">
                                    {{ item.value === 0 ? item.value : item.value || '--' }} {{ item.unit }}
                                </div>
                                <div>{{ item.name }}</div>
                            </div>
                        </a-card>

                        <a-card v-if="item.visible_type == 4" class="cardShadow">
                            <div class="title">
                                <span class="text_dot"></span>
                                <span>{{ item.name }}</span>
                            </div>
                            <ve-histogram
                                :data="
                                    item.chartData && item.chartData.rows && item.chartData.rows.length
                                        ? item.chartData
                                        : chartData
                                "
                                :extend="histogramExtend"
                                :legend-visible="false"
                            ></ve-histogram>
                        </a-card>
                        <a-card v-if="item.visible_type == 5" class="cardShadow">
                            <div class="title">
                                <span class="text_dot"></span>
                                <span>{{ item.name }}</span>
                            </div>
                            <ve-line
                                :data="
                                    item.chartData && item.chartData.rows && item.chartData.rows.length
                                        ? item.chartData
                                        : chartData
                                "
                                :extend="histogramExtend"
                                :legend-visible="false"
                            ></ve-line>
                        </a-card>
                        <a-card
                            v-if="item.visible_type == 6"
                            class="cardShadow"
                            :body-style="{
                                height: item.height * 30 + 'px',
                                minHeight: '200px',
                                maxHeight: '400px',
                            }"
                        >
                            <div class="title">
                                <span class="text_dot"></span>
                                <span>{{ item.name }}</span>
                            </div>
                            <div class="circle_style">
                                <a-progress
                                    type="circle"
                                    :percent="item.value || 75"
                                    :stroke-color="{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }"
                                >
                                    <span slot="format" slot-scope="percent">
                                        <div style="margin-bottom: 10px; font-size: 16px">{{ item.name }}</div>
                                        <div>
                                            {{ item.value === 0 ? item.value : item.value || '--' }} {{ item.unit }}
                                        </div>
                                    </span>
                                </a-progress>
                            </div>
                        </a-card>
                    </div>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>
<script>
module.exports = {
    props: {
        dataSource: {
            require: true,
            default: () => {
                return []
            },
        },
        cardStyle: {
            require: true,
            default: () => {
                return []
            },
        },
    },
    data() {
        // visible_type  1 不显示  2 基本信息中  3 显示为卡片  4 显示为柱状图  5 显示为折线图  6 饼图
        return {
            tableArray: [],
            infoData: [],
            //样本
            chartData: {
                columns: ['item', 'count'],
                rows: [
                    // { item: 'a', count: 1393 },
                    // { item: 'b', count: 3530 },
                    // { item: 'c', count: 2923 },
                    // { item: 'd', count: 1723 },
                    // { item: 'e', count: 3792 },
                    // { item: 'f', count: 4593 },
                ],
            },
            histogramExtend: {
                series: {
                    barWidth: 20,
                },
                'xAxis.0.axisLabel.formatter': function (value) {
                    return value.slice(0, 7) + '...'
                },
            },
            tableLoading: false,
            historyInfoLoading: false,
        }
    },
    methods: {
        getReportTemplateQuota() {
            let arr = []
            this.cardStyle.forEach((item) => {
                this.$set(item, '_uid', item.type + item.id)
                this.$set(item, 'col', item.width)
                delete item.width
                arr.push(item)
                if (item.children?.length) {
                    item.children.forEach((it) => {
                        this.$set(it, '_uid', it.type + it.id)
                        this.$set(it, 'title', it.name)
                        this.$set(it, 'key', it.unique)
                        this.$set(it, 'dataIndex', it.unique)
                        this.$set(it, 'ellipsis', true)
                        this.$set(it, 'col', it.width)

                        delete it.width
                    })
                    arr.push(...item.children)
                }
            })
            this.tableArray = arr.filter((item) => item.visible_type != 1).sort((a, b) => a.index - b.index)
            this.infoData = this.tableArray.filter((item) => item.visible_type == 2 && item.type == 'quota')

            this.setData()
        },
        setData() {
            const tableDataSorceItem = {}
            this.dataSource.forEach((item) => {
                for (let key in item) {
                    tableDataSorceItem[item.key] = item.value
                }
            })
            this.tableArray.forEach((item) => {
                this.$set(item, 'value', tableDataSorceItem[item.key])
                if (item.type == 'quota' && (item.visible_type == 4 || item.visible_type == 5)) {
                    this.$set(item, 'chartData', {
                        columns: ['item', 'count'],
                        rows: tableDataSorceItem[item.key] || [],
                    })
                }
                if (item.children?.length) {
                    item.children.forEach((child) => {
                        this.$set(child, 'value', tableDataSorceItem[child.key])
                    })
                    this.$set(item, 'dataSource', Object.keys(tableDataSorceItem).length ? [tableDataSorceItem] : [])
                    for (let key in tableDataSorceItem) {
                        if (tableDataSorceItem[key] instanceof Array) {
                            const columnItem = item.children.find((it) => it.key == key)
                            columnItem &&
                                this.$set(columnItem, 'customRender', (text) => {
                                    return JSON.stringify(text)
                                })
                        }
                    }
                }
            })
        },
    },
    mounted() {
        this.getReportTemplateQuota()
    },
}
</script>
<style scoped >
.title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.title > .text_dot {
    display: inline-block;
    width: 3px;
    height: 15px;
    background: @primary-color;
    margin-right: 10px;
}
.card_content {
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}
.card_content > div:nth-child(1) {
    color: @primary-color;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.card_content > div:nth-child(2) {
    font-size: 16px;
    margin-top: 10px;
}
.cardShadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.circle_style {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>