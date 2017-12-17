import mongoose from 'mongoose';
import slug from 'slug';
// define the schema for our article model
const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    short_intro: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      intro: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
      enum: ['Bussiness', 'Technology', 'Game', 'Fashion', 'Politics', 'Economy', 'Lifstyle', 'Travel'],
    },
    tags: {
      type: Array,
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: Array,
    },
    relateds: {
      type: Array,
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

/**
 * Password hash middleware.
 */
articleSchema.pre('save', function save(next) {
  const article = this;
  // slug title
  article.slug = slug(this.title);
  // slug author name
  article.author.slug = slug(this.author.name);
  next();
});

articleSchema.set('toObject', {
  virtuals: true,
});
articleSchema.set('toJSON', {
  virtuals: true,
});

// create the model for users and expose it to our app
export default mongoose.model('Article', articleSchema);
