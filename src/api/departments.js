/**
 * @Author: bzirs
 * @Date: 2022-12-25 17:45:14
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-25 17:59:10
 * @FilePath: /hm-vue2-hr/src/api/departments.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'
// 获取部门列表
export const getDepartmentList = _ => request.get('/company/department')
