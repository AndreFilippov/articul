const express = require('express');
const controller = require("../controllers/user");
const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
