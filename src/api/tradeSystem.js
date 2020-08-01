import request from '@/utils/request'
/* 
*
  1.1	渠道管理
*
*/
//1.1.1 	合作渠道查询

export function queryPartnerChoiceList(params) {
    return request({
        url: '/systemConfig/partner/queryPartnerChoiceList',
        method: 'GET',
        params
    })
}
//1.1.1 	合作渠道查询

export function queryPartnerList(params) {
    return request({
        url: '/systemConfig/partner/queryPartnerList',
        method: 'GET',
        params
    })
}
//1.1.3 	引流渠道修改

export function updatePartner(params) {
    return request({
        url: '/systemConfig/partner/updatePartner',
        method: 'POST',
        params
    })
}

//1.1.3 	新增渠道提交
export function insertPartnerInfo(params) {
    return request({
        url: '/systemConfig/partner/insertPartnerInfo',
        method: 'POST',
        params
    })
}

//1.1.3 	新增渠道提交
export function ghostPartnerConfig(params) {
    return request({
        url: '/systemConfig/partner/ghostPartnerConfig',
        method: 'GET',
        params
    })
}

//1.1.3 	配置缓存刷新
export function refreshPartnerCache(params) {
    return request({
        url: '/systemConfig/partner/refreshPartnerCache',
        method: 'GET',
        params
    })
}

/* 
*
  1.2	优选基金管理接口
*
*/
//1.2.1 	查询区间收益定义
export function getRatingType(params) {
    return request({
        url: '/systemConfig/fundOptimized/getRatingType',
        method: 'GET',
        params
    })
}
//1.2.1 	添加优选基金（单只）
export function insertSingleFundOptimized(params) {
    return request({
        url: '/systemConfig/fundOptimized/insertSingleFundOptimized',
        method: 'POST',
        params
    })
}

//1.2.2 	优选基金修改（单只）
export function updateSingleFundOptimized(params) {
    return request({
        url: '/systemConfig/fundOptimized/updateSingleFundOptimized',
        method: 'POST',
        params
    })
}

//1.2.3 	优选基金批量导入
export function batchUpdateFundData(params) {
    return request({
        url: '/systemConfig/fundOptimized/batchUpdateFundData',
        method: 'POST',
        params
    })
}

//1.2.4 	优选基金查询
export function queryFundOptimizedList(params) {
    return request({
        url: '/systemConfig/fundOptimized/queryFundOptimizedList',
        method: 'GET',
        params
    })
}

//1.2.5 	初始化优选基金
export function initFundOptimizedList(params) {
    return request({
        url: '/optimize/initFundOptimizedList',
        method: 'GET',
        params
    })
}
/* 
*
  1.3	引流推广配置管理接口
*
*/

//1.3.1 	幻灯片管理（markethot）
export function getPertnerByField(params) {
    return request({
        url: '/systemConfig/partner/getPertnerByField',
        method: 'GET',
        params
    })
}

//1.3.7 	查询推广配置模板
export function getPertnerByDefine(params) {
    return request({
        url: '/systemConfig/partner/getPertnerByDefine',
        method: 'GET',
        params
    })
}

//1.3.8 	更新推广配置信息
export function updatePertnerInfo(params) {
    return request({
        url: '/systemConfig/partner/updatePertnerInfo',
        method: 'POST',
        params
    })
}

//1.3.8 	更新推广配置信息
export function getUserMenu(params) {
    return request({
        url: '/authority/user/getUserMenu',
        method: 'GET',
        params
    })
}