// File: Client/controllers/userController.mjs
import { UserModel } from "../data/userModel.mjs";

export const userController = {
  createUser: (payload) => UserModel.create(payload),
  editMe: (payload) => UserModel.updateMe(payload),
  deleteAccount: () => UserModel.deleteAccount(),
};
