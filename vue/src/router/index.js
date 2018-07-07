import Vue from 'vue'
import Router from 'vue-router'

import Result from '../components/Result.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: ':params',
            name: 'Result',
            component: Result    
        }
    ]
})
