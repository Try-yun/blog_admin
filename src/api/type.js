import request from '@/utils/request'

export default {

  list() {
    return request({
      url: '/b-type/list',
      method: 'get'
    })
  }
}
