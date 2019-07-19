<template>

    <div>
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
        <eForm ref="form" :is-add="false"></eForm>
    </div>

</template>

<script>
    import eForm from './form'

    export default {
        name: "edit",
        components: {
            eForm
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        methods: {
            to() {
                window.console.log("赋值单条数据！");
                const _this = this.$refs.form
                _this.form = {
                    id: this.data.id,
                    name: this.data.name,
                    sort: this.data.sort,
                    enabled: this.data.enabled.toString(),
                    createTime: this.data.createTime,
                    dept: { id: this.data.dept.id }
                }
                _this.dialog = true
            }
        }
    }
</script>

<style scoped>
    div {
        display: inline-block;
        margin-right: 3px;
    }
</style>
