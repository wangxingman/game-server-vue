<template>
    <div class="head-div">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand" menu-align='start'>
            <img src="../assets/img_user.png" alt="" class="head_img">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        computed: {
            userInfo() {
                return 'wx';
            }
        },
    }
</script>

<style scoped lang="less">
    .head-div {
        height: 60px;
        background-color:beige;
        display: flex;
        justify-content: space-between;
        align-items: center;   //可以简单理解上下居中
        padding-left: 20px;
        .head_img {
            padding-right: 20px;
        }
    }
</style>