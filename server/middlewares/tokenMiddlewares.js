import jwt from 'jsonwebtoken';
import 'dotenv/config';

const onlySuperAdminToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(403).send('Access is denied or the token has expired');
    } else {
      if (decoded.role !== 'superadmin') {
        res.status(403).send('Access is denied');
      } else {
        next();
      }
    }
  });
};

const onlyAdminToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(403).send('Access is denied or the token has expired');
    } else {
      if (decoded.role !== 'admin' && decoded.role !== 'superadmin') {
        res.status(403).send('Access is denied');
      } else {
        next();
      }
    }
  });
};

const onlyUserToken = (req, res, next) => {
  const { id } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(403).send('Access is denied or the token has expired');
    } else {
      if (decoded.id!==id) {
        res.status(403).send('Access is denied');
      } else {
        next();
      }
    }
  });
};

const userOrAdminToken = (req, res, next) => {
  const { id } = req.query;
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(403).send('Access is denied or the token has expired');
    } else {
      if (decoded.id!==id && decoded.role !== 'admin' && decoded.role !== 'superadmin') {
        res.status(403).send('Access is denied');
      } else {
        next();
      }
    }
  });
}

const userOrSuperAdminToken = (req, res, next) => {
  const { id } = req.query;
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      res.status(403).send('Access is denied or the token has expired');
    } else {
      if (decoded.id!==id && decoded.role !== 'superadmin') {
        res.status(403).send('Access is denied');
      } else {
        next();
      }
    }
  });
}

export {
  onlySuperAdminToken,
  onlyAdminToken,
  onlyUserToken,
  userOrAdminToken,
  userOrSuperAdminToken,
}
