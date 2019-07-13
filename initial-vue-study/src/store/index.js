import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import main from './modules/main';

Vue.use(Vuex);

export default new Vuex.Store( {
    modules: {
        //子模块的对象 合并到store
        main,
    },
        //插件运用 【使用其固话数据】
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
        //使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误
    strict: process.env.NODE_ENV !== 'production'
});