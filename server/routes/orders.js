import express from 'express';
import bodyParser from 'body-parser';
import {
  onlyUserToken,
} from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.use(express.json());
router.use('/addOrder', onlyUserToken);

router.post('/addOrder/', function(req, res){
    console.log(req.body);
    res.send('fatto')
});





export default router;
