import request from '@/utils/request'

export default {

  pageList(page, limit, searchObj) {
    return request({
      url: `/blog/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  }
}
