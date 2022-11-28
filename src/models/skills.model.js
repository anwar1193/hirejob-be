const pool = require('../config/db')

const insert = (data) => {
    const {id, skill_name} = data;
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO skills (id, skill_name) VALUES ('${id}', '${skill_name}')`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const getAllSkills = ({searchQuery, offsetValue, limitValue, sortQuery, modeQuery}) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT skills.id, skills.skill_name, users.fullname FROM skills 
        INNER JOIN users ON skills.user_id = users.id 
        WHERE LOWER(skill_name) LIKE '%${searchQuery}%' ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`, (err, res) => {
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
        pool.query(`SELECT COUNT(*) AS total FROM skills`, (err, res) => {
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
        pool.query(`SELECT skills.skill_name, users.fullname FROM skills 
        INNER JOIN users ON skills.user_id = users.id WHERE skills.id='${id}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    })
};

module.exports = {
    insert,
    getAllSkills,
    allData,
    select
}