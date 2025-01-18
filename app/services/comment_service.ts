import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import { CommentAdapter } from '#adapters/comments_adapter'

@inject()
export class CommentService {
  constructor(private commentAdapter: CommentAdapter) {}

  public async create(ctx: HttpContext) {
    return await this.commentAdapter.create(ctx)
  }
}
