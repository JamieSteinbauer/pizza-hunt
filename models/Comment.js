const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // replies will be nested directly in a comments document and not referred to
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//combines the reply count with the comment count to that users can get a full picture of the discussion
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model("Comment", CommentSchema);
const Reply = model("Reply", ReplySchema);

module.exports = { Comment, Reply };
