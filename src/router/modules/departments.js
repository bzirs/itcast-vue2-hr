/**
 * @Author: bzirs
 * @Date: 2022-12-25 10:51:49
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 11:31:27
 * @FilePath: /hm-vue2-hr/src/router/modules/departments.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

/* Layout */
import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [
    {
      name: 'departments',
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
