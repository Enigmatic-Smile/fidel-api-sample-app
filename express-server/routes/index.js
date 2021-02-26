import express from 'express'
const { Router } = express

const router = Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

export default router
