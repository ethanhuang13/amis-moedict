import Vue from 'vue'
import Router from 'vue-router'

import Result from '../components/Result.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: ':params',
            name: 'Result',
            component: Result,
            beforeEnter: (to, from, next) => {
                console.log(to, from, next);
            } 
        }
    ]
})

export default router;
