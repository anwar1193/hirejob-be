const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/response');
const { findEmail, register, registerWorker } = require('../models/auth.model');
const authHelper = require('../helper/auth');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const {fullname, company, position, email, phone, password, confirmpassword} = req.body;
            const {rowCount} = await findEmail(email);
            if (rowCount == 0) {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const id = uuidv4();
                const role = "recruiter";
                const data = {
                    id,
                    fullname,
                    company,
                    position,
                    email,
                    phone,
                    password:passwordHash,
                    confirmpassword,
                    role
                };
                await register(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'register succcess',
                    data: data,
                });
            } else {
                const err = {
                    message: 'email is already used',
                };
                failed(res, {
                    code: 409,
                    status: 'error',
                    message: err.message,
                    error: [],
                });
                return;
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },

    registerWork: async (req, res) => {
        try {
            const {fullname, email, phone, password, confirmpassword} = req.body;
            const {rowCount} = await findEmail(email);
            if (rowCount == 0) {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const id = uuidv4();
                const role = "worker";
                const data = {
                    id,
                    fullname,
                    email,
                    phone,
                    password:passwordHash,
                    confirmpassword,
                    role,
                };
                await registerWorker(data);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'register succcess',
                    data: data,
                });
            } else {
                const err = {
                    message: 'email is already used',
                };
                failed(res, {
                    code: 409,
                    status: 'error',
                    message: err.message,
                    error: [],
                });
                return;
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const {rows:[users]} = await findEmail(email);
            if (!users) {
                failed(res, {
                    code: 403,
                    status: 'error',
                    message: 'Email is invalid',
                    error: [],
                });
            }

            if (email == "" && password == "") {
                failed(res, {
                    code: 403,
                    status: 'error',
                    message: "Email & Password can't be empty",
                    error: [],
                });
            }

            const isValidPassword = bcrypt.compareSync(password, users.password)
            console.log(isValidPassword);

            if(!isValidPassword){
                failed(res, {
                    code: 500,
                    status: 'error',
                    message: 'password is invalid',
                    error: [],
                });
            }
            delete users.password
            const payload = {
                email: users.email,
                role: users.role,
                // password: users.password,
            }

            users.token = authHelper.generateToken(payload)
            users.refreshToken = authHelper.generateRefreshToken(payload)
            success(res, {
                code: 200,
                status: 'success',
                message: 'login succcess',
                data: users,
            });
        } catch (error) {
            console.log(error);
        }
    },
    
    refreshToken : (req, res) => {
        const refreshToken = req.body.refreshToken
        const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT)
        const payload = {
            email : decoded.email,
            role : decoded.role
        }
        const result = {
            token: authHelper.generateToken(payload),
            refreshToken: authHelper.generateRefreshToken(payload)
        }
        success(res, {
            code: 200,
            status: 'success',
            message: 'refresh token success',
            data: result,
        });
    }
}

module.exports = authController