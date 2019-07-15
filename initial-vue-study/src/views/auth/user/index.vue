<template>
    <div>
        <headTop></headTop>
        <top></top>
        <el-table :data="tableData"  size="medium " style="width: 100%;margin: 20px 0px 0px 40px;">
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="date" label="日期"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="name" label="名称"/>
            <!--查找权限 显示修改 添加菜单-->
            <el-table-column label="操作"  align="center"  >
                <template slot-scope="scope" style="margin-right: 30px ">
                    <edit />
                </template>
            </el-table-column>
        </el-table>

        <!--分页组件-->
        <el-pagination style="margin: 30px 0px 0px 30px "
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
        </el-pagination>
    
        <end></end>
    </div>
</template>

<script>
    import headTop from '../../../components/headTop'
    import end from '../../../components/end'
    import top from './top'
    import edit from './edit'


    export default {
        name: "index",
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        data() {
            return {
                currentPage4: 4,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
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