/**
 * @Author: bzirs
 * @Date: 2022-12-25 10:51:49
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 10:56:13
 * @FilePath: /hm-vue2-hr/src/router/modules/salarys.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

/* Layout */
import Layout from '@/layout'

export default {
  path: '/salarys',
  component: Layout,
  children: [
    {
      name: 'salarys',
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资管理', icon: 'money' }
    }
  ]
}
