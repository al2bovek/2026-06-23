import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authRequired } from '../middleware/authRequired.js';
import { validate } from '../middleware/validate.js';
import { registerRules, loginRules } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerRules, validate, AuthController.register);
router.post('/login',    loginRules,    validate, AuthController.login);
router.post('/logout',   AuthController.logout);
router.get ('/me',       authRequired,  AuthController.me);
router.patch('/update', authRequired, AuthController.update);
router.delete('/remove', authRequired, AuthController.remove);

export default router;