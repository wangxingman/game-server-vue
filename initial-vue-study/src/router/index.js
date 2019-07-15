import Vue from 'vue'
import Router from 'vue-router'
import store from "../store";
import {$BASE} from "../const/const";
import Login from '../views/login'
import Home from "../views/home";
import Manage from '../views/manage'
import User from '../views/auth/user'

Vue.use(Router)

let routes = [
    {
        path: '/manage',
        name: 'manage',
        component:Manage,
        children: [
            {
                path: '',
                title: '首页',
                name: 'home',
                component: Home,
            },
            {
                path: '/user',
                component: User,
                title: '用户操作',
                name: 'user',
            }
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
];
const router = new Router({routes});

let isError = true;

export const init = (axios) => {
    axios.defaults.baseURL = $BASE.BASE_API_URL;
    axios.defaults.headers['Cache-Control'] = "no-store";
    axios.defaults.withCredentials = true;
    router.beforeEach((to, from, next) => {
        let login = store.state.main.login;
        if (from.path == '/' && to.path != '/login') {
            if (!login) {
                next('/login');
            } else {
                if (to.path != '/login'&&to.path != '/') {
                    next();
                } else {
                    next({
                        name: 'homeIndex'
                    });
                }
            }
        } else {
            next();
        }
    });

    //路由处理完成
    router.afterEach(() => {
    });

    //请求拦截器 如果有token则给所有请求设置token请求头
    axios.interceptors.request.use(config => {
        return config;
    }, err => {
        return Promise.reject(err);
    });

    //返回拦截器，监听token变化
    axios.interceptors.response.use(response => {

        let data = response.data;
        window.console.log("是不是"+data);
        if (data.success != null && data.success) {
            if (data.message != null) {
            /*    ElementUI.$notify({
                    title: '成功',
                    message: `${data.message}`,
                    duration: 1.5
                });*/
            }
        } else {
            if (data.code==-1000){
                router.replace({path: '/login'});
                return
            }
            if (data.message != null) {
          /*      ElementUI.$notify.error({
                    title: '错误',
                    message: `${data.message}`,
                    duration: 1.5
                });*/
            }
        }
        return response;
    }, error => {
        if (error.response) {
            if (isError) {
                isError = false;
                let data = error.response.data;
                switch (error.response.status) {
                    case 401:
                        store.commit('setClear');
                        // store.dispatch('mainReset');
                        router.replace({path: '/login'});
                    /*    ElementUI.$notify.error({
                            title: '错误',
                            message: `${data.message}`,
                            duration: 1.5
                        });*/
                        break;
                    case 403:
                        if (data && data.message) {
                            window.console.log(403);
                         /*   ElementUI.$notify.error({
                                title: '错误',
                                message: `${data.message}`,
                                duration: 1.5
                            });*/
                        }
                        break;
                    case 406:
                        store.commit('setClear');
                        router.replace({path: '/login'});
                    /*    ElementUI.$notify.error({
                            title: '错误',
                            message: `${data.message}`,
                            duration: 1.5
                        });*/
                        break;
                    case 500:
                        if (data && data.message) {
                     /*       ElementUI.$notify.error({
                                title: '错误',
                                message: `${data.message}`,
                                duration: 1.5
                            });*/
                        }
                        break;
                    default:
                   /*     ElementUI.$notify.error({
                            title: '错误',
                            message: `${data.message}`,
                            duration: 1.5
                        });*/
                }
                setTimeout(() => {
                    isError = true;
                }, 3000);
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });
};

export default router
