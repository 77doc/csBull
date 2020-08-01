import request from '@/utils/request'

//1.智能投顾基金配置信息

export function getCurrentConfigFund(params) {
    return request({
        url: '/investment/fundOptimization/getCurrentConfigFund',
        method: 'GET',
        params
    })
}
//2.保存智能投顾基金配置信息

export function saveConfig(params) {
    return request({
        url: '/investment/fundOptimization/saveConfig',
        method: 'POST',
        params
    })
}
//3.恢复智能投顾大类资产对应基金的默认配置

export function defaultSetting(params) {
    return request({
        url: '/investment/fundOptimization/defaultSetting',
        method: 'GET',
        params
    })
}
//4.搜索基金

export function searchFundsByAssetType(params) {
    return request({
        url: '/investment/fundOptimization/searchFundsByAssetType',
        method: 'GET',
        params
    })
}
//5.添加、替换基金列表

export function getFundsByAssetType(params) {
    return request({
        url: '/investment/fundOptimization/getFundsByAssetType',
        method: 'POST',
        params
    })
}
//6.调仓

export function ztGroupTransfer(params) {
    return request({
        url: '/fundOptimization/ztGroupTransfer',
        method: 'GET',
        params
    })
}

//7.获取定期调仓资产大类配置

export function getAssetConfig(params) {
    return request({
        url: '/investment/fundOptimization/getAssetConfig',
        method: 'GET',
        params
    })
}
//7.获取定期调仓资产大类配置

export function getAssetConfigByRiskControl(params) {
    return request({
        url: '/investment/fundOptimization/getAssetConfigByRiskControl',
        method: 'GET',
        params
    })
}


//定期调仓—保存资产配置
export function saveAssetConfig(params) {
    return request({
        url: '/investment/fundOptimization/saveAssetConfig?orgId=1',
        method: 'POST',
        params
    })
}


//2.1.10 	定期调仓—同意调仓
export function transfer(params) {
    return request({
        url: '/investment/fundOptimization/transfer?orgId=1',
        method: 'POST',
        params
    })
}


//2.1.10 	风控调仓—同意调仓
export function riskControlTransfer(params) {
    return request({
        url: '/investment/fundOptimization/riskControlTransfer?orgId=1',
        method: 'POST',
        params
    })
}
