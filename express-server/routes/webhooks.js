const express = require('express');
const router = express.Router();

/* Setup Generic Webhook Handler. */
router.post('/:type', (req, res, next) => {

  const io = req.app.get('socketio');
  io.emit(req.params.type, req.body)

  res.status(200).end()
});


module.exports = router;
