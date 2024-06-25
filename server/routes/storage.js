import express from 'express';
import pool from '../config/postgresConfig.js';
import {
  onlySuperAdminToken
} from '../middlewares/tokenMiddlewares.js';


const router = express.Router();

router.use(express.json());
router.use('/alter', onlySuperAdminToken);
router.use('/item', onlySuperAdminToken);
router.use('/add', onlySuperAdminToken);

router.get('/goods_list', async (req, res) => {
  try {
    const result = await pool.query(`select * from goods`);
    res.send(result.rows);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/alter', async (req, res) => {
  const values = req.body.newValues;
  const query = values.length === 1 ?
  `UPDATE goods SET ${values[0].attr}='${values[0].value}' WHERE id=${req.body.id};` :
  `UPDATE goods SET price_eur=${values[0].value}, price_cent=${values[1].value} WHERE id=${req.body.id};`;
  console.log(query)
  try {
    const result = await pool.query(query);
    res.send('fatto');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/add', async (req, res) => {
  const { name, price_eur, price_cent, quantity } = req.body;
  const query = `INSERT INTO goods (name, price_eur, price_cent, quantity) VALUES ('${name}', ${price_eur || 0}, ${price_cent || 0}, ${quantity || 0});`
  try {
    const result = await pool.query(query);
    res.send('fatto');
  } catch (err) {
    console.log(err)
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/item', async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query(`delete from goods where id='${id}';`);
    res.status(200).send('fatto');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

export default router;
