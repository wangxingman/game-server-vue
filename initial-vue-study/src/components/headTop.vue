<template>
    <div class="head-div">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index"> {{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand" menu-align='start'>
            <img src="../assets/img_user.png" alt="" class="head_img">
            <el-dropdown-menu slot="dropdown" align="center">
                <el-dropdown-item>{{userInfo.username}}</el-dropdown-item>
                <el-dropdown-item command="updatePass">修改密码</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    import loginApi from '../api/loginApi';

    export default {
        name: "headTop",
        computed: {
            userInfo() {
                return this.$store.state.main.userInfo;
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'signout') {
                    loginApi.logout().then(({data}) => {
                        window.console.log("用户退出");
                        if (data.success) {
                            this.$router.push({path: '/login'});
                        }
                    });
                } else if (command == 'updatePass') {
                    this.$store.commit('setMbx', ['个人中心', '修改密码']);
                    this.$router.push({path: '/UpdatePass'})
                } else {
                    this.$message({
                        type: 'error',
                        message: "这是您的用户名"
                    });
                }
            } ,
        }

        
    }
</script>

<style scoped lang="less">
    .head-div {
        height: 60px;
        background-color: beige;
        display: flex;
        justify-content: space-between;
        align-items: center; //可以简单理解上下居中
        padding-left: 20px;

        .head_img {
            padding-right: 20px;
        }
    }
</style>