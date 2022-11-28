const pool = require('../config/db')

const insert = (data) => {
    const {id, position, company_name, work_time, descript } = data;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO experience (id, position, company_name, work_time, descript ) VALUES ('${id}', '${position}', '${company_name}', '${work_time}', '${descript}')`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const getAllExperience = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM experience`, (err, res) => {
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
        pool.query(`SELECT COUNT(*) AS total FROM experience`, (err, res) => {
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
        pool.query(`SELECT * FROM experience WHERE experience.id='${id}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
};

const deleteExperience = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM experience WHERE id='${id}'`, (err, res) => {
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
    getAllExperience,
    allData,
    select,
    deleteExperience
}