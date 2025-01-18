import router from '@adonisjs/core/services/router'

const MomentsController = () => import('#controllers/moment_controller')
const CommentsController = () => import('#controllers/comment_controller')

router
  .group(() => {
    router.post('', [MomentsController, 'create'])
    router.get('', [MomentsController, 'all'])
    router.get(':id', [MomentsController, 'getMoment'])
    router.patch(':id', [MomentsController, 'update'])
    router.delete(':id', [MomentsController, 'remove'])
  })
  .prefix('moments/api/')

router.post('/moments/:momentId/comments', [CommentsController, 'create'])
