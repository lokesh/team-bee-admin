import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexView,
  },
]

const router = new VueRouter({
  routes
})

export default router
