const router = require('express').Router();
const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
 } = require('../../controllers/comment-controller');

// need two paramters to delete a comment because after you delete a particular comment, you need to know exactly which comment that originated from

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
    .route('/:pizzaId/:commentId')
    // put route because we are just updating the existing post not posting new content
    .put(addReply)
    .delete(removeComment); 

// /api/comments/<pizzaId>/<commentId>/<replyId>
// trying to implement a restful api so should include the parent ids in the endpoint
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;