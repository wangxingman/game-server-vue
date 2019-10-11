<template>
    <div>
        <!--搜索-->
        <el-input placeholder="输入岗位名称搜索"
                  style="width: 200px;display: inline-block;margin: 20px 4px 0px 30px;"></el-input>

        <el-button class="filter-item" style="display: inline-block;margin: 0px 4px;height: 40px;" size="mini"
                   type="success" icon="el-icon-search" @click="searchUser">搜索
        </el-button>

        <div style="display: inline-block;margin: 0px 4px;">
            <el-button
                    style="height: 40px"
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="addUser">新增
            </el-button>
            <eForm ref="form" :is-add="true"></eForm>
        </div>

        <div style="display: inline-block">
            <el-button style="height: 40px" size="mini" type="warning" icon="el-icon-more" @click="expand">{{ $parent.expand ? '折叠' : '展开' }}
            </el-button>
            <eForm ref="form" :is-add="true"/>
        </div>

    </div>
</template>

<script>
    import eForm from './form'

    export default {
        name: "top",
        components: {
            eForm
        },
        data() {
            return {
                enabledTypeOptions: [
                    {key: 'true', display_name: '正常'},
                    {key: 'false', display_name: '禁用'}
                ],
                value: "",
                downloadLoading: false,
            }
        },
        props: {
            dicts: {
                type: Array,
                required: true
            },
            sup_this: {
                type: Array,
                required: true
            },
        },
        methods: {
            searchUser() {
                this.$message({
                    message: '警告哦，功能占位开放！',
                    type: 'warning'
                });
            },
            addUser() {
                this.$refs.form.dialog = true
            },
            expand() {

            }
        }
    }
</script>

<style scoped>

</style>
