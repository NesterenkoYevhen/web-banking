import { Router } from 'express';

import { currentUser } from '@ynbanking/common';
import { User } from '../models/user';

const router = Router();

router.get('/api/users/currentuser', currentUser, async (req, res) => {
  if(!req.currentUser) {
    return res.send({ currentUser: null });
  }
  const user = await User.findById(req.currentUser!.id);
  const userInfo = {
    id: user!.id,
    email: user!.email,
    name: user!.name,
    surname: user!.surname,
    gender: user!.gender,
    age: user!.age,
    role: user!.role
  };
  res.send({ currentUser: userInfo });
});

export { router as currentUserRouter };