import { Router } from 'express';
import passportFacebook from '../../auth/facebook';
import passportGoogle from '../../auth/google';
import { AuthController } from '../../controllers';
import AuthValidator from '../../middlewares/inputVaidator';
import emailValidation from '../../middlewares/Validations/emailValidation';
import passwordValidation from '../../middlewares/Validations/passwordValidator';
import { checkToken } from '../../middlewares';

const router = Router();

// router.post('/signup', AuthController.signUp);
router.post('/signup', AuthValidator.validateSignUp, AuthController.signUp);
router.post('/verifyuser', AuthValidator.validateSignIn, AuthController.verifyUser);
router.post('/signin', AuthController.signIn);
router.post('/sendEmail', emailValidation, AuthController.sendEmail);
router.post('/resetPassword', passwordValidation, AuthController.resetPassword);
router.post('/logout', checkToken, AuthController.logout);


// GOOGLE ROUTER
router.get('/google', passportGoogle.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
  });

// FACEBOOK ROUTER
router.get('/facebook', passportFacebook.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
  });

export default router;
