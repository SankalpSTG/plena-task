import {config} from "dotenv"
config()
import * as jwt from 'jsonwebtoken';

const payload = {
  _id: "682c365f0c94810840fe95da"
};

const token = jwt.sign(payload, process.env.ADMIN_ACCESS_TOKEN_SECRET!!, { expiresIn: '1h' });
console.log('Access Token:', token);