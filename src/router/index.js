import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import CreateView from '@/views/CreateView.vue'
import DictionariesView from '@/views/DictionariesView.vue'

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
  {
    path: '/dictionaries',
    name: 'Dictionaries',
    component: DictionariesView,
  },
]

const router = new VueRouter({
  routes
})

export default router
