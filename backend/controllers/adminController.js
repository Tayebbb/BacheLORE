import jwt from 'jsonwebtoken';

const ADMIN_CODE = process.env.ADMIN_CODE || 'choton2025';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

export const adminLogin = (req, res) => {
  const { adminCode } = req.body;
  if (adminCode !== ADMIN_CODE) {
    return res.status(401).json({ msg: 'Invalid admin code' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
};
