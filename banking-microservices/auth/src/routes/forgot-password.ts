import crypto from "node:crypto";
import { createTransport } from "nodemailer";
import { NotFoundError } from '@ynbanking/common';
import { Router, Request, Response } from 'express';
import { User } from '../models/user';

const router = Router();

router.patch(
  '/api/users/password', 
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await User.findOne({email})

    if(!user) {
      throw new NotFoundError();
    }

    const password = crypto.randomBytes(10).toString("hex");

    user.set({password});

    await user.save();

    const transporter = createTransport({
      service: 'hotmail',
      auth: {
        user: 'websup3712638@outlook.com',
        pass: process.env.EMAIL_PASSWORD!,
      },
    });
    const options = {
      from: 'websup3712638@outlook.com',
      to: email,
      subject: 'NEW PASSWORD',
      text: password,
    };

    transporter.sendMail(options, (err: Error | null) => {
      if (err) {
        throw new Error();
      }
    });

    res.status(201).send({ success: true });
  }
);

export { router as forgotPasswordRouter };