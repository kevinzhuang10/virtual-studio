const { RESTDataSource } = require('apollo-datasource-rest')

class ZoomAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.zoom.us/v2/'
    this.jwtToken = process.env.ZOOM_JWT_TOKEN
    this.zoomUserId = 'kevinzhuang10@gmail.com'
  }

  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${this.jwtToken}`)
  }

  async createMeeting({ topic, startTime, duration, description }) {
    const response = await this.post(`users/${this.zoomUserId}/meetings`, {
      topic,
      type: 2,
      start_time: startTime,
      duration,
      agenda: description,
    })
    return response
  }
}

module.exports = ZoomAPI
