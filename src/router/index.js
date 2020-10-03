import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CreateView from '@/views/CreateView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexView,
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateView,
  },
]

const router = new VueRouter({
  routes
})

export default router
