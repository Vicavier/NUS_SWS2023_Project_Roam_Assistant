import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    //register and login
    {
        path: '/',
        component: () => import('../views/HomePage.vue'),
    },
    {
        path: '/result',
        component: () => import('../views/contentPage.vue'),
        meta:{ loadRequired: true }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 路由守卫
// router.beforeEach((to,from,next)=>{
//     const token = localStorage.getItem('token')
//     if (to.name !== 'Login' && !token) next({name:'Login'})
//     else next()
// })

export default router