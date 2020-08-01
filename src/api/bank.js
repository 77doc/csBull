//银行精选管理
import request from '@/utils/request';

//获取银行列表
export function getBankList(params) {
  return request({
    url: '/bank-selection/bs/bank/getBankList',
    method: 'get',
    params,
  })
}
//添加银行
export function addBank(params) {
    return request({
      url: '/bank-selection/bs/bank/addBank',
      method: 'POST',
      params,
    })
  }
  //4.1.3 	编辑银行
export function editBank(params) {
    return request({
      url: '/bank-selection/bs/bank/editBank',
      method: 'POST',
      params,
    })
  }
//获取银行产品列表
  export function getProductList(params) {
    return request({
      url: '/bank-selection/bs/product/getProductList',
      method: 'get',
      params,
    })
  }
  //4.2.2 	更改产品排序
  export function changeProductOrder(params) {
    return request({
      url: '/bank-selection/bs/product/changeProductOrder',
      method: 'get',
      params,
    })
  }

  // 4.2.3 	产品维度上下架
  export function changeProductState(params) {
    return request({
      url: '/bank-selection/bs/product/changeProductState',
      method: 'get',
      params,
    })
  }

   // 4.2.4 	产品详情
   export function getProductDetail(params) {
    return request({
      url: '/bank-selection/bs/product/getProductDetail',
      method: 'get',
      params,
    })
  }
  //  4.2.5 	新增或编辑产品
  export function addOrEditProduct(params) {
    return request({
      url: '/bank-selection/bs/product/addOrEditProduct',
      method: 'POST',
      params,
    })
  }
