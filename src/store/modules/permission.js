import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    },
    CLEAR_ROUTES: state => {
        state.routes = []
    }
}

const actions = {
    generateRoutes({ commit }, asyncRoutes) {
        let accessedRoutes
        accessedRoutes = mapComponent(asyncRoutes)
        commit('SET_ROUTES', accessedRoutes)
        return accessedRoutes
    },
    clearRoutes({ dispatch, state, commit }) {
        commit('CLEAR_ROUTES')
    },
}

// 遍历asyncRoutes，将component替换
//asyncRoutes:后台返回的路由
function mapComponent(asyncRoutes) {
    const accessedRouters = asyncRoutes
    accessedRouters.forEach(route => {

        if (route.component != 'Layout') {
            route.component = require('@/views' + route.component).default
        } else { //Layout组件特殊处理
            route.component = Layout
        }
        if (route.children && route.children.length) {
            mapComponent(route.children)
        }
    })
    console.log(accessedRouters);
    return accessedRouters
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}