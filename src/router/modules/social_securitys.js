/**
 * @Author: bzirs
 * @Date: 2022-12-25 10:51:49
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-27 08:29:35
 * @FilePath: /hm-vue2-hr/src/router/modules/social_securitys.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

/* Layout */
import Layout from '@/layout'

export default {
  path: '/social-securitys',
  component: Layout,
  children: [
    {
      name: 'social_securitys',
      path: '',
      component: () => import('@/views/social_securitys'),
      meta: { title: '社保管理', icon: 'table' }
    }
  ]
}
