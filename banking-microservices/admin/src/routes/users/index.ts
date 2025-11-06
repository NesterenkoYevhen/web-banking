import { Router, Request, Response } from "express";
import { User } from "../../models/user";

const router = Router();

router.get('/api/admin/users', async (req: Request, res: Response) => {
  const users = await User.find({});
  const updatedUsers = users.filter(user => user.id !== req.currentUser!.id)

  res.send(updatedUsers);
});

export { router as indexUserRouter };