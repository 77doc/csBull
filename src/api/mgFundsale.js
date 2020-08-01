import request from '@/utils/request'

//（in基金）汇总接口

export function inSelectSummary(params) {
    return request({
        url: '/statistics/mg/getMiddleGoundSumData',
        method: 'GET',
        params
    })
}

//（in基金）汇总-审核按钮

export function inAudit(params) {
    return request({
        url: '/statistics/mg/updateMiddleGroundDataFlag',
        method: 'POST',
        params
    })
}

//1.1.3 	IN明细

export function inSelectList(params) {
    return request({
        url: '/statistics/mg/getMiddleGoundGroupData',
        method: 'GET',
        params
    })
}

//1.1.IN明细表格导出
export function inSelectListToExcel(params) {
    return request({
        url: '/statistics/mg/mgExportExcelDetailinfund',
        method: 'GET',
        params,
        responseType: 'arraybuffer',
    })
}

//IN汇总表格导出
export function inSelectSummaryToExcel(params) {
    return request({
        url: '/statistics/mg/mgExportExcelSuminfund',
        method: 'GET',
        params,
        responseType: 'arraybuffer',
    })
}

//IN汇总表格导出
export function mgExportExcelinfund(params) {
    return request({
        url: '/statistics/mg/mgExportExcelinfund',
        method: 'GET',
        params,
        responseType: 'arraybuffer',
    })
}


//新证汇总接口

export function xzSelectSummary(params) {
    return request({
        url: '/statistics/mgFundsaleApply/selectSummary',
        method: 'GET',
        params
    })
}

//新证汇总-审核按钮

export function xzAudit(params) {
    return request({
        url: '/statistics/mgFundsaleApply/audit',
        method: 'POST',
        params
    })
}

//新证明细

export function xzSelectList(params) {
    return request({
        url: '/statistics/mgFundsaleApply/selectList',
        method: 'GET',
        params
    })
}

//新证明细表格导出
export function xzSelectListToExcel(params) {
    return request({
        url: '/statistics/mgFundsaleApply/selectListToExcel',
        method: 'GET',
        params,
        responseType: 'arraybuffer',
    })
}

//新证汇总表格导出
export function xzSelectSummaryToExcel(params) {
    return request({
        url: '/statistics/mgFundsaleApply/selectSummaryToExcel',
        method: 'GET',
        params,
        responseType: 'arraybuffer',
    })
}

//新证长期持有
export function longTermHoldList(params) {
    return request({
        url: '/statistics/mgFundsaleApply/longTermHoldList',
        method: 'GET',
        params,
    })
}

//新证长期持有导出
export function longTermHoldListToExcel(params) {
    return request({
        url: '/statistics/mgFundsaleApply/longTermHoldListToExcel',
        method: 'GET',
        params,
    })
}