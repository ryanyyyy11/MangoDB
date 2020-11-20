import express from 'express'
import * as authControl from '../controller/authController.js'

const router = express.Router();

router.post('/register', authControl.register);
router.post('/login', authControl.login);
router.post('/user/:id', authControl.getUser);
router.get('/products', authControl.getProducts);
router.post('/addProducts', authControl.makeProduct);
router.post('/getUnverified', authControl.getUnverified);
router.put('/verify', authControl.verify);
router.post('/getUsers', authControl.getUsers);
router.delete('/ban', authControl.ban);
router.post('/addToCart', authControl.addToCart);
router.post('/successBuy', authControl.successBuy);
router.post('/getPaymentByZip', authControl.getPaymentByZip);
router.post('/getPaymentById', authControl.getPaymentById);
router.post('/delivered', authControl.delivered);
router.post('/getOrderStatus', authControl.getOrderStatus);

export default router;
