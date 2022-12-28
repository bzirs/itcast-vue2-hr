/**
 * @Author: bzirs
 * @Date: 2022-12-25 17:45:14
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-27 21:17:28
 * @FilePath: /hm-vue2-hr/src/api/departments.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */

import request from '@/utils/request'
// 获取部门列表
export const getDepartmentList = _ => request.get('/company/department')

// 新增部门
export const addDepartment = obj => request.post('/company/department', obj)

// 删除部门
export const removeDepartment = id => request.delete(`/company/department/${id}`)

// 获取部门信息
export const getDepartmentInfo = id => request.get(`/company/department/${id}`)

// 修改部门信息
export const editDepartmentInfo = obj => request.put(`/company/department/${obj.id}`, obj)

