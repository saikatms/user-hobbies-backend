import express from 'express';
import controller from '../controllers/Hobbies';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/createHobby', ValidateSchema(Schemas.hobbies.create), controller.createHobby);
router.get('/getHobby/:hobbyId', controller.getHobbyById);
router.get('/getUserHobbies/:userId', controller.getUserHobbies);
router.get('/getAllHobbies', controller.getAllHobbies);
router.patch('/updateHobby/:hobbyId', ValidateSchema(Schemas.hobbies.update), controller.updateHobby);
router.delete('/deleteHobby/:hobbyId', controller.deleteHobby);

export = router;
