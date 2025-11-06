import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError  } from '@ynbanking/common';

import { Gender, User } from '../models/user';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = Router();

router.post(
  '/api/users/signup', 
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 50})
      .withMessage('Name must be between 2 and 50 characters'),
    body('surname')
      .trim()
      .isLength({ min: 2, max: 50})
      .withMessage('Surname must be between 2 and 50 characters'),
    body('gender')
      .isIn(Object.values(Gender))
      .withMessage('Gender must be MALE, FEMALE or OTHER'),
    body('age')
      .isInt({ min: 16 })
      .withMessage('Age must be greater than 16')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
    const { email, password, gender, age, name, surname, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    let user;
    if (role) {
      user = User.build({ email, password, gender, age, name, surname, role });  
    } else {
      user = User.build({ email, password, gender, age, name, surname });
    }
    
    
    await user.save();

    const userJwt = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    }, process.env.JWT_KEY!);

    req.session = {
      jwt: userJwt
    };

    await new UserCreatedPublisher(natsWrapper.client).publish(user);

    res.status(201).send(user);
  }
);

export { router as signupRouter };