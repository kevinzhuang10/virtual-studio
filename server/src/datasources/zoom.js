const { RESTDataSource } = require('apollo-datasource-rest')

class ZoomAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.zoom.us/v2/'
    this.jwtToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Img2Unp2RVkzUzRTdW44WWwtWWY5cnciLCJleHAiOjE1OTM2MzgxMzQsImlhdCI6MTU5MzAzMzMzNH0.wlnICfCW4aQUhTerbhp5VZl5MfPPknyCgrbp9U7YuW0'
    this.zoomUserId = 'kevinzhuang10@gmail.com'
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.jwtToken}`)
  }

  async createMeeting({ topic, startTime }) {
    const self = this
    const response = await self.post(`users/${this.zoomUserId}/meetings`, {
      topic,
      type: 2,
      start_time: startTime,
    })
    return response
  }
}

module.exports = ZoomAPI
