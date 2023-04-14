import { Algorithm } from "jsonwebtoken";

export default () => ({
  MONGO_URL: process.env.MONGO_URI,
  auth: {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {
      algorithm: process.env.JWT_ALGO as Algorithm,
    },
  },
});
