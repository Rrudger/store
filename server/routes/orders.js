import express from 'express';
import bodyParser from 'body-parser';
import pool from '../config/postgresConfig.js';
import {
  onlyUserToken,
  onlyAdminToken,
  userOrAdminToken,
} from '../middlewares/tokenMiddlewares.js';

const router = express.Router();

router.use(express.json());
router.use('/addOrder', onlyUserToken);
router.use('/user_orders', userOrAdminToken);
router.use('/active_orders', onlyAdminToken);
router.use('/archived_orders', onlyAdminToken);
router.use('switch_status', onlyAdminToken);

router.post('/addOrder/', async (req, res) => {
  const { id, status, cart } = req.body;
  const cartVals = cart.map((item) => `(${item.id}, ${item.quantity})`)
  .join(',');

try {
    const query = `INSERT INTO orders (user_id, status, created_at, updated_at) VALUES (${id}, '${status}', to_timestamp(${Date.now()} / 1000.0), to_timestamp(${Date.now()} / 1000.0)) returning id;`;
    const result = await pool.query(query);
    const order_id = result.rows[0].id;
    const newTableQuery = `CREATE TABLE order_${order_id} (
  item_id bigint REFERENCES goods(id) NOT NULL,
  quantity bigint NOT NULL);`;
    const resultCreateTable = await pool.query(newTableQuery);
    const insertOrderQuery = `INSERT INTO order_${order_id} (item_id, quantity) VALUES ${cartVals};`;
    const resultInsertOrder = await pool.query(insertOrderQuery);
    res.send('fatto');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/switch_status/', async (req, res) => {
  const { id, newStatus } = req.body;
  try {
    const result = await pool.query(`UPDATE orders SET status='${newStatus}' WHERE id=${id};`);
    res.send('fatto');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/user_orders/', async (req, res) => {
  const { id } = req.query;
  try {
    const { rows } = await pool.query(`SELECT id, created_at, status from orders WHERE user_id=${id};`);
    const result = await Promise.all(rows.map(async (order) => {
      const orderData = await pool.query(`SELECT * from order_${order.id};`);
      return {
        id: order.id,
        created_at: order.created_at,
        status: order.status,
        itemsList: orderData.rows,
      }
    }));
    res.send(result);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/active_orders/', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, user_id, created_at, status from orders WHERE status!='cancelled' AND status!='archived';`);
    const result = await Promise.all(rows.map(async (order) => {
      const orderData = await pool.query(`SELECT * from order_${order.id};`);
      return {
        id: order.id,
        user_id: order.user_id,
        created_at: order.created_at,
        status: order.status,
        itemsList: orderData.rows,
      }
    }));
    res.send(result);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.get('/archived_orders/', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT id, user_id, created_at, status from orders WHERE status='cancelled' OR status='archived';`);
    const result = await Promise.all(rows.map(async (order) => {
      const orderData = await pool.query(`SELECT * from order_${order.id};`);
      return {
        id: order.id,
        user_id: order.user_id,
        created_at: order.created_at,
        status: order.status,
        itemsList: orderData.rows,
      }
    }));
    res.send(result);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});





export default router;
