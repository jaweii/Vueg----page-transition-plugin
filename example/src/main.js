// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueg from 'vueg'
import 'vueg/css/transition.css'

Vue.config.productionTip = false

Vue.use(vueg, { duration: .3 })

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
