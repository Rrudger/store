import express from 'express';
import argon2 from 'argon2';
import pool from '../config/postgresConfig.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { createToken, addUser } from '../utils/userRoutersUtils.js';
import {
  onlyAdminToken,
  onlySuperAdminToken,
  onlyUserToken,
  userOrAdminToken,
  userOrSuperAdminToken,
} from '../middlewares/tokenMiddlewares.js';

const router = express.Router();
router.use(express.json());
router.use('/users_list', onlyAdminToken);
router.use('/alter_user', onlyUserToken);
router.use('/alter_password', onlyUserToken);
router.use('/user', userOrSuperAdminToken);

router.get('/login/', async (req, res) => {
  const { name, pas } = req.query;
  const queryDb = `select password, role, id from users where name='${name}';`;
  try {
    const result = await pool.query(queryDb);
    if (result.rowCount) {
      try {
        const passHash = result.rows[0].password;
        const passValid = await argon2.verify(passHash, pas)
        if (passValid) {
          const token = createToken(result.rows[0].id, result.rows[0].role);
          res.send({ token: token, role: result.rows[0].role, id: result.rows[0].id });
        } else {
          res.status(401).send('Wrong password');
        }
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('A user with this name could not be found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }

})

router.post('/signup/', async (req, res) => {
const { username, password } = req.body;
  try {
    const result = await pool.query(`select name from users where name='${username}';`);
    if (result.rowCount === 0) {
      try {
        const response = await addUser(username, password);
        const id  = response.rows[0].id;
        const token = createToken(id, 'user')
        res.send({ token: token, role: 'user', id: id });
      }
      catch(err) {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('User with this name already exist');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
})

router.delete('/user', async (req, res) => {
  const { id } = req.query;
  try {
    const result = await pool.query(`delete from users where id='${id}';`);
    res.status(200).send('fatto');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
})

router.get('/users_list', async (req, res) => {
  try {
    let test = [];
    const users = await pool.query("select id, name, created_at from users where role='user';");
    const orders = await pool.query("select id, user_id from orders where status!='archived' AND status!='deleted';");
    const result = users.rows.map((user) => {
      const ordersCount = orders.rows.reduce((count, order) => {
        return (order.user_id === user.id) ? count + 1 : count;
      }, 0);
      return { ...user, orders_count: ordersCount };
    });
    res.send(result);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
})

router.post('/alter_user', async (req, res) => {
  const { id, attr, value } = req.body;
  try {
    const result = await pool.query(`select name from users where ${attr}='${value}';`);
    if (result.rowCount === 0) {
      try {
        const result = await pool.query(`UPDATE users SET ${attr}='${value}' WHERE id='${id}';`);
        res.send('fatto');
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('User with this name already exist');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

router.post('/alter_password', async (req, res) => {
  const { id, old_password, new_password } = req.body;
  try {
    const result = await pool.query(`select password from users where id='${id}';`);
    if (result.rowCount) {
      try {
        const passHash = result.rows[0].password;
        const oldPassValid = await argon2.verify(passHash, old_password)
        if (oldPassValid) {
          const hash = await argon2.hash(new_password);
          try {
            const result = await pool.query(`UPDATE users SET password='${hash}' WHERE id='${id}';`);
            res.send('fatto')
          } catch (err) {
            res.status(500).send('Internal Server Error');
          }
        } else {
          res.status(401).send('Wrong password');
        }
      } catch (err) {
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(401).send('A user with this name could not be found');
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
})







export default router;
