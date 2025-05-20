"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jwt = require("jsonwebtoken");
const payload = {
    _id: "682c365f0c94810840fe95da"
};
const token = jwt.sign(payload, process.env.ADMIN_ACCESS_TOKEN_SECRET, { expiresIn: '1Year' });
console.log('Access Token:', token);
//# sourceMappingURL=index.js.map