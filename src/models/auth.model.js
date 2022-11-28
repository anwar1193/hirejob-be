const pool = require('../config/db')

const findEmail = (email) => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const register = (data) => {
    const {id, fullname, company, position, email, phone, password, confirmpassword, role} = data;
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT INTO users (id, fullname, company, position, email, phone, password, confirmpassword, role) VALUES ('${id}', '${fullname}', '${company}', '${position}', '${email}', '${phone}', '${password}', '${confirmpassword}', '${role}')`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const registerWorker = (data) => {
    const {id, fullname, email, phone, password, confirmpassword, role} = data;
    return new Promise ((resolve, reject) => {
        pool.query(`INSERT INTO users (id, fullname, email, phone, password, confirmpassword, role) VALUES ('${id}', '${fullname}', '${email}', '${phone}', '${password}', '${confirmpassword}', '${role}')`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = {
    findEmail,
    register,
    registerWorker
}