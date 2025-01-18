import type { HttpContext } from '@adonisjs/core/http'

import Comment from '#models/comment'
import Moment from '#models/moment'

export class CommentAdapter {
  public async create({ request, response, params }: HttpContext) {
    const body = request.body()
    const momentId = params.momentId
    try {
      const moment = await Moment.findOrFail(momentId)

      if (!moment) {
        throw new Error('Moment not found!')
      }

      body.moment_id = momentId

      const comment = await Comment.create(body)

      response.status(201)

      return {
        message: 'Comment created successfully!',
        data: comment,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
