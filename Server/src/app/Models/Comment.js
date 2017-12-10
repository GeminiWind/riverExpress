import mongoose from 'mongoose';

const { Schema } = mongoose;

// define the schema for our user model
const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

// create the model for users and expose it to our app
export default mongoose.model('Comment', commentSchema);
