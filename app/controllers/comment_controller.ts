import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import { CommentService } from '#services/comment_service'

@inject()
export default class CommentsController {
  constructor(private commentService: CommentService) {}

  public async create(ctx: HttpContext) {
    return await this.commentService.create(ctx)
  }
}
