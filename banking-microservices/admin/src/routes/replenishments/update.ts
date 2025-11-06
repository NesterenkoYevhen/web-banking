import { Router, Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest, NotFoundError, requireAuth } from '@ynbanking/common';
import { natsWrapper } from '../../nats-wrapper';
import { Replenishment } from '../../models/replenishment';
import { ReplenishmentCompletedPublisher } from '../../events/publishers/replenishment-completed-publisher';

const router = Router();

router.patch(
  '/api/admin/replenishments/:id', 
  requireAuth,
  [
    body('approved')
      .not()
      .isEmpty()
      .withMessage('Approved is required')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
  const replenishment = await Replenishment.findByIdAndRemove(req.params.id);

  if(!replenishment) {
    throw new NotFoundError();
  }

  await new ReplenishmentCompletedPublisher(natsWrapper.client).publish({
    id: replenishment.id,
    cardId: replenishment.cardId,
    userId: replenishment.userId,
    amount: replenishment.amount,
    approved: req.body.approved,
    version: replenishment.version,
    date: replenishment.date
  });



  res.send({ success: true });
});

export { router as updateReplenishmentRouter };