import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import page3 from '@/components/page3'
import page4 from '@/components/page4'
import page20 from '@/components/page20'
import page21 from '@/components/page21'

Vue.use(Router)

export default new Router({
    // mode:'history',
    routes: [{
        path: '',
        name: 'default',
        component: Hello
    }, {
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
            path: '',
            component: page20
        }, {
            path: 'page2-1',
            component: page21
        }]
    }, {
        path: '/page-3',
        name: 'page3',
        component: page3
    }, {
        path: '/page-4',
        name: 'page4',
        component: page4
    }]
})
