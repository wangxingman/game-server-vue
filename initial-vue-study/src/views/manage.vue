<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color:darkgray;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" background-color="silver"
                         text-color="navy" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i><span style="color: black;font-weight: bold;font-size: 18px">首页</span></el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i><span style="color: black;font-weight: bold;font-size: 15px">数据管理</span></template>
                        <el-menu-item index="userList"><span style="color: black;font-size: 15px">用户列表</span></el-menu-item>
                        <el-menu-item index="shopList"><span style="color: black;font-size: 15px">商家列表</span></el-menu-item>
                        <el-menu-item index="foodList"><span style="color: black; font-size: 15px">食品列表</span></el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>


            <el-col :span="20" style="height: 100%;overflow: auto;">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {
    }
</style>
