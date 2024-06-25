import argon2 from 'argon2';
import pool from '../config/postgresConfig.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const createToken = (id, role) => {
  const token = jwt.sign({
    id: id,
    role: role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '24h'
  }
);
return token;
}

const addUser = async (name, password) => {
  const hash = await argon2.hash(password);
  const query =`insert into users (name, password) values ('${name}', '${hash}')`;
  try {
    const result = await pool.query(query);
    const id = await pool.query(`select id from users where name='${name}';`);
    return id;
  } catch (err) {
    throw err;
  }

}

export {
  createToken,
  addUser,
}
