import { createRouter, createWebHashHistory } from 'vue-router';
import FlipList from '@/components/FlipList.vue'
import FlipPanel from '@/components/FlipPanel.vue'
import FlipStep from '@/components/FlipStep.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes: [
        { path: '/', component: FlipList },
        { path: '/panel', component: FlipPanel },
        { path: '/step', component: FlipStep },
    ]
})


export default router