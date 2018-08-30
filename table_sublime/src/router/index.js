import Vue from 'vue'
import Router from 'vue-router'
import Table from '../components/table.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/table',
      component: Table,
      name: 'table'
    }
  ]
})
