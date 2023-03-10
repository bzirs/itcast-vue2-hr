
/* Layout */
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      name: 'employees',
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    }
  ]
}
