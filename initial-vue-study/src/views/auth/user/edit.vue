<template>
    <div >
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="to" />
    </div>
</template>
<script>
    export default {
        props: {
        },
        methods: {
            to() {
            }
        }
    }
</script>

<style scoped>
    div{
        display: inline-block;
        margin-right: 3px;
    }
</style>
