import request from '@/utils/request'

export default{

  list() {
    return request({
      url: '/user/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/user/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/user/remove/${id}`,
      method: 'delete'
    })
  },

  getById(id) {
    return request({
      url: `/user/get/${id}`,
      method: 'get'
    })
  },

  updateById(user) {
    return request({
      url: '/user/update',
      method: 'put',
      data: user
    })
  }
}
