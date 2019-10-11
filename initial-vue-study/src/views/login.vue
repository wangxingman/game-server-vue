<template>
    <div class="login_page">
        <transition>
            <section class="" v-show="showLogin">
                <div class="login_desc">
                    <P>我的管理系统</P>
                </div>
                <div class="login_desc_two">
                    <P>欢迎来到@系统</P>
                </div>
                <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="80px" class="login_from">
                    <el-form-item label="账号:" style="font-family: 微软雅黑" class="login_input">
                        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" style="font-family: 微软雅黑" class="login_input">
                        <el-input v-model="loginForm.password" placeholder="密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="code">
                        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 60%">
                            <div class="login-code">
                                <img :src="codeUrl" @click="getCode">
                            </div>
                        </el-input>
                    </el-form-item>
                    <!--记住自己-->
                    <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>

                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit" class="login_sumbit">登陆</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import loginApi from '../api/loginApi';
    import menuApi from '../api/menuApi';
    import Cookies from 'js-cookie';
    import Config from '../config';

    export default {
        data() {
            return {
                codeUrl: '',
                loginForm: {
                    username: "wx",
                    password: "123456",
                    code: '',
                    uuid: "" ,
                    rememberMe:false
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, trigger: 'change', message: '验证码不能为空'}
                    ]
                },
                showLogin: false,
            }
        },
        created() {
            this.getCode();
            this.getCookie();
        },
        mounted() {
            this.showLogin = true;
        },
        methods: {
            ...mapActions([
                'setLogin',
                'setMenus'
            ]),
            toIndex() {
                this.$router.push('manage')
            },
            getCode() {
                loginApi.getCode().then(res => {
                    this.codeUrl = 'data:image/gif;base64,' + res.img
                    this.loginForm.uuid = res.uuid
                })
            },
            getCookie() {
                const username = Cookies.get('username')
                let password = Cookies.get('password')
                const rememberMe = Cookies.get('rememberMe')
                password = password === undefined ? this.loginForm.password : password
                this.loginForm = {
                    username: username === undefined ? this.loginForm.username : username,
                    password: password,
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
                    code: ''
                }
            },
            handleSubmit() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {

                        const user = this.loginForm
                        if (user.rememberMe) {
                            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
                            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
                            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
                        } else {
                            Cookies.remove('username')
                            Cookies.remove('password')
                            Cookies.remove('rememberMe')
                        }
                        loginApi.login(this.loginForm.username, this.loginForm.password).then(({data}) => {
                            window.console.log("返回datade shuju " + data);
                            if (data.success) {
                                this.$store.commit('setLogin', true);
                                this.$store.commit('setUserInfo', data.data);
                                menuApi.findAllMenu().then(({data}) => {
                                    window.console.log("打印出菜单的值： " + data.data);
                                    if (data.success) {
                                        this.$store.commit('setMenus', data.data);
                                        this.toIndex();
                                    }
                                });
                            }                  ``
                        });
                    } else {
                        this.getCode()
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                            offset: 100
                        })
                    }
                })
            }
        },
        watch: {
            setLogin: function () {
                this.$message({
                    type: 'success',
                    message: '检测到您之前登录过，将自动登录'
                });
                this.toIndex();
            }
        }
    }
</script>

<style scoped lang="less">
    .login_page {
        text-align: center;
        width: 100%;
        height: 100%;
        background: url("https://aurora-1255840532.cos.ap-chengdu.myqcloud.com/1547428971990.jpg") center center/100% 100%;
    }

    .login_desc {
        padding-top: 10%;
        padding-bottom: 2%;

        p {
            font-size: 34px;
            color: #fff;
        }
    }

    .login_desc_two {
        padding-bottom: 2%;

        p {
            font-size: 20px;
            color: #3190e8;
        }
    }

    .login_from {
        position: absolute;
        left: 37%;
        border-radius: 10px;
        background-color: lightyellow;
        text-align: center;
        width: 25%;
        height: 30%;
        padding-top: 50px;

        .login_input {
            width: 90%;
            padding-top: 15px;
            margin-right: 30px;

            label {
                color: #3190e8;
            }
        }

        .login_sumbit {
            margin-right: 100%;
            margin-top: 30px;
            width: 90%;
        }
    }

</style>
