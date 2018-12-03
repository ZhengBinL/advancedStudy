// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import http from '@/axios/common/http';
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import mixin from '@/components/mixin/mixin'
import './assets/scss/element-variables.scss'
import './assets/scss/index.scss'

//  这样就可以通过$http发起请求了
Vue.prototype.$http = http;

Vue.use(ElementUI)
Vue.mixin(mixin)

Vue.config.productionTip = false
// Vue.use(VueLazyLoad,{
//   error:'../static/images/404.png',
//   loading:'../static/images/404.png'
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
