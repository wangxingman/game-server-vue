<template>
    <div >
        <headTop></headTop>
        <h3 style="text-align: center;margin: 20px 10px 50px 10px">欢迎使用 wangEditor 富文本编辑器!</h3>
        <div ref="editor" style="text-align:center;margin: 0px 10% 0px 10% ;width: 80%;">
        </div>
        <div class="editor-content"/>
        <end></end>
    </div>
</template>

<script>
    import headTop from '../../components/headTop'
    import end from '../../components/end'
    import { mapGetters } from 'vuex'
    import E from 'wangeditor'

    export default {
        data() {
            return {
            }
        },
        components: {
            headTop,
            end,
        },
        computed: {
            ...mapGetters([
                'imagesUploadApi'
            ])
        },
        mounted() {
            var editor = new E(this.$refs.editor)
            editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
            // 不可修改
            editor.customConfig.uploadImgHeaders = this.headers
            // 自定义文件名，不可修改，修改后会上传失败
            editor.customConfig.uploadFileName = 'file'
            editor.create()
        }   ,
    }
</script>

<style scoped>
    .editor-content{
        padding-left: 5px;
    }
</style>
