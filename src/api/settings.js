/**
 * @Author: bzirs
 * @Date: 2022-12-28 16:21:08
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-30 09:21:16
 * @FilePath: /hm-vue2-hr/src/api/settings.js
 * @Description:
 * @
 * @Copyright (c) 2022 by bzirs, All Rights Reserved.
 */
// 导入axios实例
import request from '@/utils/request'

// 根据业务要求- 查接口文档-封装api
/**
 * 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
export function getRoles(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}

/**
 * @description: 删除角色
 * @param {*} id 角色id
 * @return {*}
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 新增角色
 * @param {*} data {name,description}
 * @return {*}
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * @description: 编辑角色
 * @param {*} data
 * @return {*}
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
