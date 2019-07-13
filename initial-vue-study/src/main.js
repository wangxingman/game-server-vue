import Vue from 'vue'
import App from './App.vue'
import router, {init} from "./router";
import store from "./store";
import axios from "axios";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  transfer: true
});

Vue.config.productionTip = false;
init(axios, ElementUI); //重新命名

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
