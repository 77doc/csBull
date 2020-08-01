import request from '@/utils/request'


//客户持仓查询

export function getUCGetLimitation(params) {
    return request({
        url: '/limitbank/ltdBank/getUCGetLimitation',
        method: 'GET',
        params
    })
}

export function updateLimitByBank(params) {
    return request({
        url: '/limitbank/ltdBank/updateLimitByBank',
        method: 'POST',
        params
    })
}