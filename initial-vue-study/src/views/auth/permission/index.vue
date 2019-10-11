<template>
    <div>
        <headTop></headTop>
        <!-- 搜索框 -->
        <top></top>

        <treeTable v-loading="loading" :data="data" :expand-all="expand" :columns="columns" size="small"></treeTable>

        <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
                <span>{{ parseTime(scope.row.createTime)}}</span>
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
                        <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消
                        </el-button>
                        <el-button :loading="delLoading" type="primary" size="mini"
                                   @click="subDelete(scope.row.id)">确定
                        </el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
                </el-popover>
            </template>
        </el-table-column>

        <tree-table></tree-table>
        <end></end>
    </div>
</template>

<script>

    import headTop from '../../../components/headTop'
    import top from './module/top'
    import end from '../../../components/end'
    import treeTable from '../../../utils/treetable'
    import {parseTime} from '../../../utils/index'


    export default {
        name: "index",
        data() {
            return {
                delLoading: false,
            }
        },
        components: {
            treeTable,
            headTop,
            top,
            end
        },
        methods: {
            parseTime,
            subDelete() {

            },
            doClose() {

            }
        }
    }
</script>

<style scoped>

</style>
