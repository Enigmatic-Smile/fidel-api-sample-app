import express from 'express'
const { Router } = express

const router = Router()

/* Setup Generic Webhook Handler. */
router.post('/:type', (req, res, next) => {

  const io = req.app.get('socketio')
  io.emit(req.params.type, req.body)

  res.status(200).end()
})

export default router
