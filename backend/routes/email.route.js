import expresss from 'express';
import { 
    test,

 } from '../controllers/email.controller.js';

const router = expresss.Router();

router.get('/', test);


export default router;

