import { MomentService } from '#services/moment_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MomentsController {
  constructor(private momentsService: MomentService) {}

  public async create(ctx: HttpContext) {
    return await this.momentsService.create(ctx)
  }

  public async all() {
    return await this.momentsService.all()
  }

  public async getMoment(ctx: HttpContext) {
    return await this.momentsService.getMoment(ctx)
  }

  public async update(ctx: HttpContext) {
    return await this.momentsService.update(ctx)
  }

  public async remove({ params }: HttpContext) {
    return await this.momentsService.remove(params.id)
  }
}
