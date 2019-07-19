<template>
    <div>
        <headTop></headTop>
        <top :dicts="dicts" :sup_this="tableData"></top>
        <!-- 显示 表单信息 -->
        <el-table :data="tableData" size="medium " style="width: 100%;margin: 20px 0px 0px 40px;">

            <el-table-column prop="name" label="名称"/>

            <el-table-column label="所属部门">
                <template slot-scope="scope">
                    <div>{{ scope.row.deptSuperiorName ? scope.row.deptSuperiorName + ' / ' : '' }}{{
                        scope.row.dept.name }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="sort" label="排序">
                <template slot-scope="scope">
                    {{ scope.row.sort }}
                </template>
            </el-table-column>

            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.enabled === true" :type="scope.row.enabled ? '' : 'info'">正确</el-tag>
                    <el-tag v-else :type="scope.row.enabled ? '' : 'info'">错误</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建日期">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>

            <!--查找权限 显示修改 添加菜单-->
            <el-table-column label="操作" align="center">
                <template style="margin-right: 30px " slot-scope="scope">
                    <edit :data="scope.row"/>
                    <!-- 弹出框 placement出现位置-->
                    <el-popover
                            :ref="scope.row.id"
                            placement="top"
                            width="180">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini"
                                       @click="subDelete(scope.row.id)">确定
                            </el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                    </el-popover>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination style="margin: 30px 0px 0px 30px "
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[5, 10]"
                       :page-size="PageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>

        <end></end>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import end from '../../../components/end'
    import top from './top'
    import edit from './edit'
    import JopbApi from '../../../api/jobApi'
    import {parseTime} from '../../../utils/index'


    export default {
        name: "index",
        created() {
            this.initData();
            window.console.log(11111)
        },
        data() {
            return {
                // 总数据
                tableData: [],
                // 默认显示第几页
                currentPage: 0,
                // 默认每页显示的条数（可修改）
                PageSize: 5,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [1, 2, 3, 4],

                delLoading: false,
                dicts: [{value: true}, {value: false}],
            }
        },
        methods: {
            parseTime,
            initData() {
                JopbApi.findBySearchAll(this.currentPage, this.PageSize).then(({data}) => {
                    if (data.success) {
                        this.tableData = data.data.jobs;
                    }
                    // 将数据的长度赋值给totalCount
                    this.totalCount=data.data.count
                })
            },
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 点击每页显示的条数时，显示第一页
                this.initData(val, 1)
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage = val-1
                // 切换页码时，要获取每页显示的条数
                this.initData( this.currentPage,5)
            },
            subDelete(id) {
                this.delLoading = true
                JopbApi.delByJob(id).then(res => {
                    this.delLoading = false
                    if (res.data.success) {
                        this.$refs[id].doClose()
                        this.$notify({
                            title: '删除成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.initData();
                    } else {
                        this.$refs[id].doClose()
                        this.$notify({
                            title: '删除失败',
                            type: 'ware',
                            duration: 2500
                        })
                    }
                })
            },

        },
        components: {
            headTop,
            end,
            top,
            edit
        }
    }
</script>

<style scoped>

</style>