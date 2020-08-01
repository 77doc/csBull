import request from '@/utils/request'


//获取用户按钮权限
export function getUserButton(params) {
    return request({
        url: '/authority/user/getUserButton',
        method: 'get',
        params,
    })
}
/* 
*
  1.1	接口管理
*
*/
//1.1.1 	接口查询

export function queryInterface(params) {
    return request({
        url: '/authority/interface/queryInterface',
        method: 'POST',
        params
    })
}
//1.1.1 	添加接口

export function addInterface(params) {
    return request({
        url: '/authority/interface/addInterface',
        method: 'POST',
        params
    })
}
//1.1.3 	删除接口

export function deleteInterface(params) {
    return request({
        url: '/authority/interface/deleteInterface',
        method: 'POST',
        params,
        isarr: true
    })
}

//1.1.3 	修改接口
export function updateInterface(params) {
    return request({
        url: '/authority/interface/updateInterface',
        method: 'POST',
        params
    })
}