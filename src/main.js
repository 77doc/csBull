import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
//import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.use(Element, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
    //locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false


//引入共用的js
import key from '@/utils/constant'
Vue.prototype.$key = key

//引入共用的js
import common from '@/utils/common'
Vue.prototype.$common = common

//封装提示语
Vue.prototype.$msg = function(type, msg) {
    var msgLen = msg.length
    var s = 1000;
    if (msgLen < 10) {
        s = 2000
    } else if (s > 9 && s < 17) {
        s = 3000
    } else if (s > 16 && s < 26) {
        s = 4000
    } else {
        s = 5000
    }
    this.$message[type]({
        message: msg,
        showClose: true,
        duration: s
    })
}
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})