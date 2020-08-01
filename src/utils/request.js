import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (config.isarr) {
            let arr = [];
            arr = config.params
            config.data = arr
            console.log(config.data);
        } else if (config.isstr) {
            console.log(config.params);

            let str = '';
            str = config.params
            config.data = str
            console.log(config.data);
        } else if (config.isfile) {
            console.log(config.data);
        } else {

            let params = {
                ...config.params,
            }

            if (config.method == 'post' || config.method == 'POST') {
                config.params = {}
            }


            config.data = params
            console.log(config.data);
            if (config.method == 'get' || config.method == 'GET') {
                config.params = params
            }
        }
        if (store.getters.token) {
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        console.log(response);
        // if the custom code is not 20000, it is judged as an error.
        if (response.data.code !== '0000') {
            Message({
                message: response.data.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (response.data.code === '401' || response.data.code === 50012 || response.data.code === 50014) {
                // to re-login
                /* MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    
                }) */
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            }
            console.log(response.data.message);

            return Promise.reject(new Error(response.data.message || 'Error'))
        } else {
            return response
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service