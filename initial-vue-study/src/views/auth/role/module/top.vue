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
            <eForm ref="form" :is-add="true" ></eForm>
        </div>

    </div>
</template>

<script>
    import {parseTime} from '../../../../utils/index'
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
            download() {
                this.downloadLoading = true
                import('../../../../vendor/Export2Excel').then(excel => {

                    //导出的头
                    const tHeader = ['名称', '排序', '状态', '创建日期']
                    //对应的字段
                    const filterVal = ['name', 'sort', 'enabled', 'createTime']
                    const data = this.formatJson(filterVal, this.sup_this)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    })
                    this.downloadLoading = false
                })
            },
            // 数据转换
            formatJson(filterVal, jsonData) {
                window.console.log("------"+filterVal+"---------++++++++++++"+jsonData);
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'createTime' || j === 'lastPasswordResetTime') {
                        return parseTime(v[j])
                    } else if (j === 'enabled') {
                        return parseTime(v[j]) ? '启用' : '禁用'
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>

<style scoped>

</style>
