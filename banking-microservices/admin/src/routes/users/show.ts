import { Router, Request, Response } from "express";
import { NotFoundError } from "@ynbanking/common";
import { User } from "../../models/user";

const router = Router();

router.get('/api/admin/users/:userId', async (req: Request, res: Response) => {
  const user = await User.findById(req.params.userId);

  if(!user) {
    throw new NotFoundError();
  }

  res.send(user);
});

export { router as showUserRouter };