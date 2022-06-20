const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// need two paramters to delete a comment because after you delete a particular comment, you need to know exactly which comment that originated from

router.route('/:pizzaId').post(addComment);

router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;