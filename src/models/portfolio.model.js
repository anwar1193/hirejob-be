const pool = require('../config/db')

const insert = (data) => {
    const {id, app_name, link_repo, app_type, image} = data;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO portfolio (id, app_name, link_repo, app_type, image) VALUES ('${id}', '${app_name}', '${link_repo}', '${app_type}', '${image}')`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const getAllPortfolio = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM portfolio`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const allData = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT COUNT(*) AS total FROM portfolio`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const select = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM portfolio  WHERE portfolio.id='${id}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const deletePortfolio = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM portfolio WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = {
    insert,
    getAllPortfolio,
    allData,
    select,
    deletePortfolio
}