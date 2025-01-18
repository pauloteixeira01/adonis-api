import { MomentAdapter } from '#adapters/moments_adapter'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export class MomentService {
  constructor(private momentAdapter: MomentAdapter) {}

  public async create(ctx: HttpContext) {
    return await this.momentAdapter.create(ctx)
  }

  public async all() {
    return await this.momentAdapter.all()
  }

  public async getMoment(ctx: HttpContext) {
    return await this.momentAdapter.getMoment(ctx.params.id)
  }

  public async update(ctx: HttpContext) {
    return await this.momentAdapter.update(ctx)
  }

  public async remove(id: number) {
    return await this.momentAdapter.remove(id)
  }
}
