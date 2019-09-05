import express from 'express';
import authRouter from './auth';
import requestRouter from './request';
import permissionRouter from './permission';
import roleRouter from './role';
import { checkToken } from '../../middlewares';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/request', checkToken, requestRouter);
router.use('/', roleRouter);
router.use('/', permissionRouter);

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
