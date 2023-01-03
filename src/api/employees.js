/**
 * @Author: bzirs
 * @Date: 2022-12-27 11:26:08
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-27 11:27:21
 * @FilePath: /hm-vue2-hr/src/api/employees.js
 * @Description: 员工 api
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
import request from '@/utils/request'

// 获取用户信息
export const getEmployeesInfo = _ => request.get('/sys/user/simple')

// 获取用户列表
export const getEmployeeList = params => request.get('/sys/user', { params })

/**
 * @description: 删除用户
 * @param {*} id 用户id
 * @return {*}
 */
export function deleteUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * @description: 导入excel
 * @param {*} data
 * @return {*}
 */
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
// 修改员工信息
export const saveUserDetailById = obj => request.put(`/sys/user/${obj.id}`, obj)
