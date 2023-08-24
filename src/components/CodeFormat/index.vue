<template>
    <div>
        <div v-if="showBorder" :class="{ openScreen: openScreen }" style="width: 100%; border: 1px solid #eeeeee">
            <div style="height: 30px; background-color: white">
                <a-icon style="line-height: 30px; float: left; margin-left: 10px" type="code" />
                <a-icon
                    style="line-height: 30px; float: right; margin-right: 10px"
                    @click="clickFull"
                    :type="openScreen ? 'fullscreen-exit' : 'fullscreen'"
                />
            </div>
            <div class="ace-container">
                <div class="ace-editor" ref="ace"></div>
            </div>
        </div>
        <div v-else class="ace-container">
            <div class="ace-editor" ref="ace"></div>
        </div>
    </div>
</template>

<script>
import ace from 'ace-builds'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/theme-monokai'

export default {
    model: {
        prop: 'value',
        event: 'change',
    },
    data() {
        return {
            aceEditor: null,
            toggle: false,
            wrap: true,
            themePath: 'ace/theme/monokai',
            modePath: 'ace/mode/javascript',
            modeArray: [
                {
                    name: 'Text',
                    path: 'ace/mode/text',
                },
                {
                    name: 'JavaScript',
                    path: 'ace/mode/javascript',
                },
                {
                    name: 'Yaml',
                    path: 'ace/mode/yaml',
                },
            ],
            openScreen: false,
        }
    },
    props: {
        value: String,
        disabled: {
            type: Boolean,
            default: false,
        },
        showBorder: {
            type: Boolean,
            default: true,
        },
        minLines: {
            type: Number,
            default: 27,
        },
        maxLines: {
            type: Number,
            default: 27, //54
        },
        mode: {
            type: String,
            default: 'Text',
        },
        tabSize: {
            type: Number,
            default: 4,
        },
    },
    watch: {
        disabled: {
            handler() {
                this.aceEditor.setReadOnly(this.disabled)
            },
            inmedited: true,
        },
        value: {
            handler(val) {
                if (this.aceEditor && val != this.aceEditor.getSession().getValue()) {
                    this.handleSetVal(val)
                }
            },
        },
    },
    mounted() {
        this.aceEditor = ace.edit(this.$refs.ace, {
            maxLines: this.realMaxLines,
            minLines: this.minLines,
            fontSize: 14,
            value: this.value || '',
            theme: this.themePath,
            tabSize: this.tabSize,
        })
        // 激活自动提示
        // this.aceEditor.setOptions({
        //     enableSnippets: true,
        //     enableLiveAutocompletion: true,
        //     enableBasicAutocompletion: true,
        // })
        // this.aceEditor.setOptions({
        //     maxLines: this.maxLines,
        //     minLines: this.minLines,
        // })
        const modePath = this.modeArray.find((it) => it.name == this.mode).path || ''
        this.aceEditor.session.setMode(modePath)
        this.aceEditor.setShowPrintMargin(false) //去除中间的横线
        this.aceEditor.setOption('wrap', 'free') //开启自动换行 关闭时free换成off
        this.aceEditor.setReadOnly(this.disabled)
        this.aceEditor.getSession().on('change', this.change)
    },

    methods: {
        clickFull() {
            this.openScreen = !this.openScreen
            this.$nextTick(() => {
                this.aceEditor.setOption('maxLines', this.realMaxLines)
                this.aceEditor.resize()
            })
        },
        change() {
            this.$nextTick(() => {
                this.aceEditor.setOption('maxLines', this.realMaxLines)
                this.aceEditor.resize()
                this.$emit('change', this.aceEditor.getSession().getValue())
            })
        },
        handleSetVal(val) {
            this.aceEditor?.setValue(val)
        },
    },
    computed: {
        realMaxLines() {
            return this.openScreen ? (document.body.offsetHeight - 30) / 16.98148148148148 : this.maxLines
        },
    },
}
</script>

<style lang="less" scoped>
.openScreen {
    position: fixed;
    background-color: #272922;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
}
.ace-container {
    position: relative;
    width: 100%;
    height: 100%;
}
/deep/ .ace_scrollbar-v {
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px #474747;
        background: gray;
    }
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px #474747;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }
}

/deep/ .ace_scrollbar-v {
    width: 10px !important;
    &::-webkit-scrollbar {
        width: 10px;
    }
}
</style>
