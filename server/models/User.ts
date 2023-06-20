import { createSchema, Type, typedModel } from "ts-mongoose";

const userSchema = createSchema(
  {
    email: Type.string({
      required: true,
      max: 70,
      unique: true,
    }),
    password: Type.string({
      required: true,
      min: 6,
      select: false,
    }),
    displayName: Type.string({
      required: true,
      max: 30,
    }),
    picturePath: Type.string(),
    friends: Type.array({ default: [] }).of(Type.string()),
    location: Type.string({
      max: 60,
    }),
    occupation: Type.string({
      max: 60,
    }),
    bio: Type.string({
      max: 200,
    }),
    likes: Type.number({ default: 0 }),
  },
  { timestamps: true }
);

const User = typedModel("User", userSchema);
export default User;
