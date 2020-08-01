import request from '@/utils/request'

//券商资管维护数据查询
export function getNeedQslcData(params) {
    return request({
        url: '/qszg/qs/getNeedQslcData',
        method: 'GET',
        params
    })
}

//券商资管全量数据查询
export function getAllQslcData(params) {
    return request({
        url: '/qszg/qs/getAllQslcData',
        method: 'GET',
        params
    })
}

//自定义排序
export function updateByStatus(params) {
    return request({
        url: '/qszg/qs/updateByStatus',
        method: 'POST',
        params,
    })
}

//导入表格
export function uploadQslcExcelFile(params) {
    return request({
        url: '/qszg/qs/uploadQslcExcelFile',
        method: 'POST',
        params,
        headers: {
            'Content-Type': 'multipart/form-data', // 文件上传
        }
    })
}