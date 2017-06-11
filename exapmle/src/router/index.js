import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import page20 from '@/components/page20'
import page21 from '@/components/page21'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/page-1',
        name: 'page1',
        component: page1
    }, {
        path: '/page-2',
        name: 'page2',
        component: page2,
        children: [{
        	path:'',
        	component:page20
        },{
            path: 'page2-1',
            component: page21
        }]
    }]
})
