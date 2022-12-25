/**
 * @Author: bzirs
 * @Date: 2022-12-25 10:52:57
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 10:55:04
 * @FilePath: /hm-vue2-hr/src/router/modules/settings.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

/* Layout */
import Layout from '@/layout'

export default {
  path: '/settings',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/settings'),
      meta: { title: '公司设置', icon: 'settings' }
    }
  ]
}
