import request from '@/utils/request'

export function login(params) {
    return request({
        url: '/authority/user/login',
        method: 'post',
        params
    })
}

export function getInfo(params) {
    return request({
        url: '/authority/user/getUserMenu',
        method: 'get',
        params
    })
}

export function logout() {
    return request({
        url: '/authority/user/logout',
        method: 'get',
    })
}

export function queryPartnerChoiceList(params) {
    return request({
        url: '/systemConfig/partner/queryPartnerChoiceList',
        method: 'GET',
        params
    })
}