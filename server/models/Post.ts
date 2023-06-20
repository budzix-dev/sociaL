import { createSchema, Type, typedModel } from "ts-mongoose";

const postSchema = createSchema(
  {
    creatorId: Type.string({
      required: true,
    }),
    creatorDisplayName: Type.string({
      required: true,
    }),
    creatorPicturePath: Type.string(),
    location: Type.string(),
    description: Type.string({
      max: 200,
    }),
    picturePath: Type.string(),
    likedBy: Type.array({ default: [] }).of(Type.string()),
    comments: Type.array({ default: [] }).of(Type.string()),
  },
  { timestamps: true }
);

const Post = typedModel("Post", postSchema);

export default Post;
