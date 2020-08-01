import request from '@/utils/request'

//1.个人投资查询

//客户持仓查询

export function selectHold(params) {
    return request({
        url: '/user/userInvest/selectHold',
        method: 'GET',
        params
    })
}
//持仓基金收益查询

export function selectHoldFundIncome(params) {
    return request({
        url: '/user/userInvest/selectHoldFundIncome',
        method: 'GET',
        params
    })
}
//帐户收益查询

export function selectAcountIncome(params) {
    return request({
        url: '/user/userInvest/selectAcountIncome',
        method: 'GET',
        params
    })
}
//交易确认查询

export function selectTransConfirm(params) {
    return request({
        url: '/user/userInvest/selectHoldFundIncome',
        method: 'GET',
        params
    })
}
//分红查询

export function selectBonus(params) {
    return request({
        url: '/user/userInvest/selectBonus',
        method: 'GET',
        params
    })
}


//2.机构查询

//2.2.1 	机构持仓查询

export function orgSelectHold(params) {
    return request({
        url: 'org/orgInvest/selectHold',
        method: 'GET',
        params
    })
}
//2.2.2 	客户投资收益查询

export function orgSelectAcountIncome(params) {
    return request({
        url: 'org/orgInvest/selectAcountIncome',
        method: 'GET',
        params
    })
}
//2.2.3 	交易记录查询

export function orgSelectTransConfirm(params) {
    return request({
        url: 'org/orgInvest/selectTransConfirm',
        method: 'GET',
        params
    })
}
//2.2.4 	分红记录查询

export function orgSelectBonus(params) {
    return request({
        url: 'org/orgInvest/selectBonus',
        method: 'GET',
        params
    })
}

//3.私募投资查询

//2.3.1 	私募持仓查询

export function selectPrivateFundHoldList(params) {
    return request({
        url: '/user/userInvest/selectPrivateFundHoldList',
        method: 'GET',
        params
    })
}

//4.	机构持仓邮件发送配置

//2.4.1 	邮件来源：列表查询

export function selectEmailComefromList(params) {
    return request({
        url: '/org/orgEmailConfig/selectEmailComefromList',
        method: 'GET',
        params
    })
}

//2.4.2 	邮件来源：详情

export function selectEmailComefromByKey(params) {
    return request({
        url: '/org/orgEmailConfig/selectEmailComefromByKey',
        method: 'GET',
        params
    })
}

//2.4.3 	邮件来源：添加

export function insertEmailComefrom(params) {
    return request({
        url: '/org/orgEmailConfig/insertEmailComefrom',
        method: 'GET',
        params
    })
}

//2.4.4 	邮件来源：更新

export function updateEmailComefrom(params) {
    return request({
        url: '/org/orgEmailConfig/updateEmailComefrom',
        method: 'GET',
        params
    })
}

//2.4.5 	邮件接收：列表查询

export function selectEmailReceiverList(params) {
    return request({
        url: '/org/orgEmailConfig/selectEmailReceiverList',
        method: 'GET',
        params
    })
}

//2.4.6 	邮件接收：详情

export function selecEmailReceiverByKey(params) {
    return request({
        url: '/org/orgEmailConfig/selecEmailReceiverByKey',
        method: 'GET',
        params
    })
}

//2.4.7 	邮件接收：添加

export function insertEmailReceiver(params) {
    return request({
        url: '/org/orgEmailConfig/insertEmailReceiver',
        method: 'GET',
        params
    })
}

//2.4.8 	邮件接收：更新

export function updateEmailReceiver(params) {
    return request({
        url: '/org/orgEmailConfig/updateEmailReceiver',
        method: 'GET',
        params
    })
}

//2.5.1 	券商持仓列表查询

export function qsSelectHold(params) {
    return request({
        url: '/ucQslc/selectList',
        method: 'GET',
        params
    })
}