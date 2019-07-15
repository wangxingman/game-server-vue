<template>
    <div>
        <!--搜索-->
        <el-input placeholder="输入岗位名称搜索"
                  style="width: 200px;display: inline-block;margin: 20px 4px 0px 30px;"></el-input>
        <el-select v-model="value" clearable placeholder="状态" class="filter-item"
                   style="width: 90px;display: inline-block;margin: 0px 4px;">
            <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>

        <el-button class="filter-item" style="display: inline-block;margin: 0px 4px;height: 40px;" size="mini"
                   type="success" icon="el-icon-search" @click="">搜索
        </el-button>

        <div style="display: inline-block;margin: 0px 4px;">
            <el-button
                    style="height: 40px"
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="">新增
            </el-button>
        </div>

        <!-- 导出 -->
        <div style="display: inline-block;">
            <el-button
                    style="height: 40px"
                    v-permission="['ADMIN']"
                    :loading="false"
                    size="mini"
                    class="filter-item"
                    type="warning"
                    icon="el-icon-download"
                    @click="download">导出
            </el-button>
        </div>
        <!--下面就是表单-->

    </div>
</template>

<script>
    export default {
        name: "top",
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
            sup_this: {
                type: Object,
                required: true
            },
        },
        methods: {
            download() {
                this.downloadLoading = true
                import('../../../vendor/Export2Excel').then(excel => {
                    //导出的头
                    const tHeader = ['ID', '用户名', '邮箱', '头像地址', '状态', '注册日期', '最后修改密码日期']
                    //对应的字段
                    const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']
                    const data = this.formatJson(filterVal, this.sup_this.data)
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
