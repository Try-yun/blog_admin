import request from '@/utils/request'

export default{

  list() {
    return request({
      url: '/admin_user/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      url: `/admin_user/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  removeById(id) {
    return request({
      url: `/admin_user/remove/${id}`,
      method: 'delete'
    })
  },

  save(admin_user) {
    return request({
      url: '/admin_user/save',
      method: 'post',
      data: admin_user
    })
  },

  getById(id) {
    return request({
      url: `/admin_user/get/${id}`,
      method: 'get'
    })
  },

  updateById(admin_user) {
    return request({
      url: '/admin_user/update',
      method: 'put',
      data: admin_user
    })
  }
}
