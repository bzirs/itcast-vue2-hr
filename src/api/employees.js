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

export const getEmployeesInfo = _ => request.get('/sys/user/simple')
