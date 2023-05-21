import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/createUser', ValidateSchema(Schemas.user.create), controller.createUser);
router.get('/getUserById/:userId', controller.getUserById);
router.get('/getAllUsers', controller.getAllUsers);
router.patch('/updateUser/:userId', ValidateSchema(Schemas.user.update), controller.updateUser);
router.delete('/deleteUser/:userId', controller.deleteUser);

export = router;
