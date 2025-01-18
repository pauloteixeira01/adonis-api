import { v4 as uuidv4 } from 'uuid'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

import Moment from '#models/moment'

export class MomentAdapter {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  public async create({ request, response }: HttpContext) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    try {
      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(app.tmpPath('uploads'), {
          name: imageName,
        })

        body.image = imageName
      }

      const moment = await Moment.create(body)

      response.status(201)

      return {
        message: 'Moment created successfully!',
        data: moment,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async all() {
    try {
      const moment = await Moment.query().preload('comments')

      return {
        data: moment,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async getMoment(id: number) {
    try {
      const moment = await Moment.findOrFail(id)

      if (!moment) {
        throw new Error('Moment not found!')
      }

      await moment.load('comments')

      return {
        data: moment,
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  public async update({ request, params }: HttpContext) {
    const body = request.body()
    try {
      const moment = await Moment.findOrFail(params.id)

      moment.title = body.title
      moment.description = body.description

      if (moment.image !== body.image || !moment.image) {
        const image = request.file('image', this.validationOptions)

        if (image) {
          const imageName = `${uuidv4()}.${image.extname}`

          await image.move(app.tmpPath('uploads'), {
            name: imageName,
          })
          moment.image = imageName
        }
      }

      await moment.save()

      return {
        message: 'Moment updated successfully!',
        data: moment,
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }

  public async remove(id: number) {
    try {
      const moment = await Moment.findOrFail(id)

      if (!moment) {
        throw new Error('Moment not found!')
      }

      await moment.delete()

      return {
        message: 'Moment deleted successfully!',
        data: moment,
      }
    } catch (error) {
      console.log(error.message)
      throw error
    }
  }
}
