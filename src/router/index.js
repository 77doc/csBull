import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [{
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [{
            path: '/redirect/:path(.*)',
            component: () =>
                import ('@/views/redirect/index')
        }]
    },
    {
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/auth-redirect',
        component: () =>
            import ('@/views/login/auth-redirect'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'home',
            meta: { title: '首页', icon: 'el-icon-edit-outline' }
        }]
    },
    /* {
        path: '*',
        component: Layout,
        redirect: '/dashboard',
        hidden: true,
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'home',
            meta: { title: '首页', icon: 'el-icon-edit-outline' }
        }]
    }, */
    /* { path: '*', redirect: '/404', hidden: true } */
]

/* export const asyncRoutes = [{
        path: '/mgFundsale',
        component: 'Layout',
        redirect: '/mgFundsale/inFund/inDetail',
        name: 'mgFundsale',
        meta: {
            title: '销售数据统计',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/inFund',
            component: '/mgFundsale/inFund/index', // Parent router-view
            name: 'inFund',
            meta: { title: 'IN基金销售费用查询' },
            redirect: '/mgFundsale/inFund/inDetail',
            children: [{
                    path: '/inDetail',
                    component: '/mgFundsale/inFund/inDetail',
                    name: 'inDetail',
                    meta: { title: 'IN明细' }
                },
                {
                    path: '/inSummary',
                    component: '/mgFundsale/inFund/inSummary',
                    name: 'inSummary',
                    meta: { title: 'IN汇总' },
                },
            ]
        }, {
            path: '/xzFund',
            component: '/mgFundsale/xzFund/index', // Parent router-view
            name: 'xzFund',
            meta: { title: 'IN基金销售费用查询' },
            redirect: '/mgFundsale/xzFund/xzDetail',
            children: [{
                    path: '/xzDetail',
                    component: '/mgFundsale/xzFund/xzDetail',
                    name: 'xzDetail',
                    meta: { title: '新证明细' }
                },
                {
                    path: '/xzSummary',
                    component: '/mgFundsale/xzFund/xzSummary',
                    name: 'xzSummary',
                    meta: { title: '新证汇总' },
                },
                {
                    path: '/xzHold',
                    component: '/mgFundsale/xzFund/xzHold',
                    name: 'xzHold',
                    meta: { title: '新证长期持有' },
                },
            ]
        }]
    },
    {
        path: '/authority',
        component: 'Layout',
        redirect: '/authority/apiManage',
        name: 'authority',
        meta: {
            title: '权限管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/apiManage',
            component: '/authority/apiManage', // Parent router-view
            name: 'apiManage',
            meta: { title: '接口管理' },
        }, {
            path: '/userManage',
            component: '/authority/userManage', // Parent router-view
            name: 'userManage',
            meta: { title: '用户管理' },
        }]
    },
    {
        path: '/tradeSystemAllocation',
        component: 'Layout',
        redirect: '/tradeSystemAllocation/channelAllocation',
        name: 'tradeSystemAllocation',
        meta: {
            title: '交易系统配置',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/channelAllocation',
            component: '/tradeSystemAllocation/channelAllocation', // Parent router-view
            name: 'channelAllocation',
            meta: { title: '引流渠道配置' },
        }, {
            path: '/optimalFund',
            component: '/tradeSystemAllocation/optimalFund', // Parent router-view
            name: 'optimalFund',
            meta: { title: '优选基金管理' },
        }, {
            path: '/homeAllocation',
            component: '/tradeSystemAllocation/homeAllocation', // Parent router-view
            name: 'homeAllocation',
            meta: { title: '引流推广配置' },
        }]
    },
    {
        path: '/roboAdvisor',
        component: 'Layout',
        redirect: '/roboAdvisor/allocationFund',
        name: 'roboAdvisor',
        meta: {
            title: '智投组合管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/allocationFund',
            component: '/roboAdvisor/allocationFund', // Parent router-view
            name: 'allocationFund',
            meta: { title: '定期调仓' },
        }, {
            path: '/warehouse',
            component: '/roboAdvisor/warehouse', // Parent router-view
            name: 'warehouse',
            meta: { title: '风控调仓' },
        }]
    },
    {
        path: '/bankProduct',
        component: 'Layout',
        name: 'bankProduct',
        meta: {
            title: '银行产品管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/productlist',
            component: '/bankProduct/productlist', // Parent router-view
            name: 'productlist',
            meta: { title: '产品管理' },
        }, {
            path: '/banklist',
            component: '/bankProduct/banklist', // Parent router-view
            name: 'banklist',
            meta: { title: '银行管理' },
        }]
    },
    {
        path: '/user',
        component: 'Layout',
        name: 'user',
        meta: {
            title: '系统管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/myAccount',
            component: '/user/myAccount/index', // Parent router-view
            name: 'myAccount',
            meta: { title: '我的账户' },
            redirect: '/user/myAccount/password',
            children: [{
                path: '/password',
                component: '/user/myAccount/password',
                name: 'password',
                meta: { title: '修改密码' }
            }, ]
        }]
    },
    {
        path: '/consignment',
        component: 'Layout',
        name: 'consignment',
        meta: {
            title: '代销产品管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/qsManager',
            component: '/consignment/qsManager',
            name: 'qsManager',
            meta: { title: '券商产品管理' },
        }, {
            path: '/fundManager',
            component: '/consignment/fundManager',
            name: 'fundManager',
            meta: { title: '基金产品管理' },
        }, {
            path: '/regularManager',
            component: '/consignment/regularManager',
            name: 'regularManager',
            meta: { title: '定期开放产品管理' },
        }, {
            path: '/goldManager',
            component: '/consignment/goldManager',
            name: 'goldManager',
            meta: { title: '黄金金价数据管理' },
        }, {
            path: '/assessment',
            component: '/consignment/assessment',
            name: 'assessment',
            meta: { title: '基金估值' },
        }, {
            path: '/indicator',
            component: '/consignment/indicator',
            name: 'indicator',
            meta: { title: '指数温度计' },
        }, {
            path: '/userAttention',
            component: '/consignment/userAttention',
            name: 'userAttention',
            meta: { title: '用户关注基金' },
        }, ]
    },
    {
        path: '/customQuery',
        component: 'Layout',
        redirect: '/customQuery/person/holdQuery',
        name: 'customQuery',
        meta: {
            title: '客户投资数据',
            icon: 'el-icon-edit-outline'
        },
        children: [{
                path: '/person',
                component: '/customQuery/person/index', // Parent router-view
                name: 'person',
                meta: { title: '个人投资查询' },
                redirect: '/customQuery/person/holdQuery',
                children: [{
                        path: '/holdQuery',
                        name: 'holdQuery',
                        meta: { title: '客户持仓查询' },
                        component: '/customQuery/person/holdQuery',
                    },
                    {
                        path: '/holdFundIncome',
                        name: 'holdFundIncome',
                        meta: { title: '持仓基金收益查询' },
                        component: '/customQuery/person/holdFundIncome',
                    },
                    {
                        path: '/acountIncome',
                        name: 'acountIncome',
                        meta: { title: '帐户收益查询' },
                        component: '/customQuery/person/acountIncome',
                    },
                    {
                        path: '/transConfirm',
                        name: 'transConfirm',
                        meta: { title: '交易确认查询' },
                        component: '/customQuery/person/transConfirm',
                    },
                    {
                        path: '/bonusQuery',
                        name: 'bonusQuery',
                        meta: { title: '分红查询' },
                        component: '/customQuery/person/bonusQuery',
                    },
                ]
            },
            {
                path: '/organization',
                component: '/customQuery/organization/index', // Parent router-view
                name: 'organization',
                meta: { title: '机构投资查询' },
                redirect: '/customQuery/organization/orgHoldQuery',
                children: [{
                        path: '/orgHoldQuery',
                        name: 'orgHoldQuery',
                        meta: { title: '机构持仓查询' },
                        component: '/customQuery/organization/orgHoldQuery',
                    },
                    {
                        path: '/orgAcountIncome',
                        name: 'orgAcountIncome',
                        meta: { title: '客户投资收益查询' },
                        component: '/customQuery/organization/orgAcountIncome',
                    },
                    {
                        path: '/orgTransConfirm',
                        name: 'orgTransConfirm',
                        meta: { title: '交易记录查询' },
                        component: '/customQuery/organization/orgTransConfirm',
                    },
                    {
                        path: '/orgBonusQuery',
                        name: 'orgBonusQuery',
                        meta: { title: '分红查询' },
                        component: '/customQuery/organization/orgBonusQuery',
                    },
                    {
                        path: '/orgtongji',
                        name: 'orgtongji',
                        meta: { title: '投资数据统计' },
                        component: '/customQuery/organization/orgtongji',
                    },
                ]
            },
            {
                path: '/private',
                component: '/customQuery/private', // Parent router-view
                name: 'private',
                meta: { title: '私募投资查询' },
            },
            {
                path: '/email',
                component: '/customQuery/email/index', // Parent router-view
                name: 'email',
                meta: { title: '机构持仓邮件配置' },
                redirect: '/customQuery/email/selectEmailComefromList',
                children: [{
                        path: '/selectEmailComefromList',
                        name: 'selectEmailComefromList',
                        meta: { title: '邮件来源：列表查询' },
                        component: '/customQuery/email/selectEmailComefromList',
                    },
                    {
                        path: '/selectEmailReceiverList',
                        name: 'selectEmailReceiverList',
                        meta: { title: '邮件接收：列表查询' },
                        component: '/customQuery/email/selectEmailReceiverList',
                    },
                ]
            },
            {
                path: '/qs',
                component: '/customQuery/qs', // Parent router-view
                name: 'qs',
                meta: { title: '券商持仓列表' },
            },

        ],
    },
    {
        path: '/bankManage',
        component: 'Layout',
        name: 'bankManage',
        meta: {
            title: '支持银行管理',
            icon: 'el-icon-edit-outline'
        },
        redirect: '/bankManage/bankLimit',
        children: [{
            path: '/bankLimit',
            component: '/bankManage/bankLimit',
            name: 'bankLimit',
            meta: {
                title: '银行限额查询',
            },
        }, {
            path: '/bankcardBinList',
            component: '/bankManage/bankcardBinList',
            name: 'bankcardBinList',
            meta: {
                title: '银行卡bin列表',
            },
        }],
    },
    {
        path: '/customManage',
        component: 'Layout',
        name: 'customManage',
        meta: {
            title: '客户管理',
            icon: 'el-icon-edit-outline'
        },
        redirect: '/customManage/customInfoList',
        children: [{
            path: '/customInfoList',
            name: 'customInfoList',
            meta: {
                title: '客户信息查询',
            },
            component: '/customManage/customInfoList',
        }, {
            path: '/customInfo',
            name: 'customInfo',
            meta: {
                title: '客户详情查询',
            },
            component: '/customManage/customInfo',
        }],
    },
    {
        path: '/dataReport',
        component: 'Layout',
        redirect: '/dataReport/orgReport/D1001',
        name: 'dataReport',
        meta: {
            title: '数据上报管理',
            icon: 'el-icon-edit-outline'
        },
        children: [{
            path: '/orgReport',
            component: '/dataReport/orgReport/index', // Parent router-view
            name: 'orgReport',
            meta: { title: '机构数据上报管理' },
            redirect: '/dataReport/orgReport/D1001',
            children: [{
                    path: '/D1001',
                    component: '/dataReport/orgReport/D1001',
                    name: 'D1001',
                    meta: { title: '公司基本信息' }
                },
                {
                    path: '/D3002',
                    component: '/dataReport/orgReport/D3002',
                    name: 'D3002',
                    meta: { title: '公司分支机构信息' },
                },
                {
                    path: '/D3003',
                    component: '/dataReport/orgReport/D3003',
                    name: 'D3003',
                    meta: { title: '公司股东信息' },
                },
                {
                    path: '/D3004',
                    component: '/dataReport/orgReport/D3004',
                    name: 'D3004',
                    meta: { title: '公司实际控制人信息' },
                },
                {
                    path: '/D3005',
                    component: '/dataReport/orgReport/D3005',
                    name: 'D3005',
                    meta: { title: '公司持牌业务信息' },
                },
                {
                    path: '/D3006',
                    component: '/dataReport/orgReport/D3006',
                    name: 'D3006',
                    meta: { title: '公司证照信息' },
                },
                {
                    path: '/D3007',
                    component: '/dataReport/orgReport/D3007',
                    name: 'D3007',
                    meta: { title: '公司销售制度文件' },
                },
                {
                    path: '/D3008',
                    component: '/dataReport/orgReport/D3008',
                    name: 'D3008',
                    meta: { title: '公司合作机构信息' },
                },
                {
                    path: '/D3009',
                    component: '/dataReport/orgReport/D3009',
                    name: 'D3009',
                    meta: { title: '公司重大变更事项' },
                }, {
                    path: '/D3010',
                    component: '/dataReport/orgReport/D3010',
                    name: 'D3010',
                    meta: { title: '公司数据报送人员' },
                },
            ]
        }, {
            path: '/saleReport',
            component: '/dataReport/saleReport/index', // Parent router-view
            name: 'saleReport',
            meta: { title: '销售数据上报管理' },
            redirect: '/dataReport/saleReport/D1011',
            children: [{
                    path: '/D1011',
                    component: '/dataReport/saleReport/D1011',
                    name: 'D1011',
                    meta: { title: '产品基本信息' }
                },
                {
                    path: '/D3013',
                    component: '/dataReport/saleReport/D3013',
                    name: 'D3013',
                    meta: { title: '交易确认汇总' },
                },
                {
                    path: '/D1014',
                    component: '/dataReport/saleReport/D1014',
                    name: 'D1014',
                    meta: { title: '份额（保有量）汇总' },
                },
                {
                    path: '/D3015',
                    component: '/dataReport/saleReport/D3015',
                    name: 'D3015',
                    meta: { title: '关系人购买明细' },
                },
                {
                    path: '/D3016',
                    component: '/dataReport/saleReport/D3016',
                    name: 'D3016',
                    meta: { title: '销售收入情况' },
                },
            ]
        }, {
            path: '/rulesReport',
            component: '/dataReport/rulesReport/index', // Parent router-view
            name: 'rulesReport',
            meta: { title: '合规数据上报管理' },
            redirect: '/dataReport/rulesReport/D3017',
            children: [{
                    path: '/D3017',
                    component: '/dataReport/rulesReport/D3017',
                    name: 'D3017',
                    meta: { title: '监管与自律措施' }
                },
                {
                    path: '/D3018',
                    component: '/dataReport/rulesReport/D3018',
                    name: 'D3018',
                    meta: { title: '监管与自律措施主体信息' }
                },
                {
                    path: '/D3019',
                    component: '/dataReport/rulesReport/D3019',
                    name: 'D3019',
                    meta: { title: '行政处罚' }
                },
                {
                    path: '/D3020',
                    component: '/dataReport/rulesReport/D3020',
                    name: 'D3020',
                    meta: { title: '行政处罚主体信息' }
                },
                {
                    path: '/D3021',
                    component: '/dataReport/rulesReport/D3021',
                    name: 'D3021',
                    meta: { title: '刑事处罚' }
                },
                {
                    path: '/D3022',
                    component: '/dataReport/rulesReport/D3022',
                    name: 'D3022',
                    meta: { title: '诉讼情况' }
                },
                {
                    path: '/D3023',
                    component: '/dataReport/rulesReport/D3023',
                    name: 'D3023',
                    meta: { title: '仲裁情况' }
                },
            ]
        }, ]
    }
    //
] */

const createRouter = () => new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router