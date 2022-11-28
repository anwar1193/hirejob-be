const pool = require('../config/db')

const usersAllData = ({searchQuery, offsetValue, limitValue, sortQuery, modeQuery}) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT users.id, users.fullname, users.email, users.jobdesk, users.domisili, users.company, users.skill, users.descript, users.instagram, users.github, users.linkedin, users.image, users.role, users.position FROM users WHERE LOWER(fullname) LIKE '%${searchQuery}%' ORDER BY ${sortQuery} ${modeQuery} LIMIT ${limitValue} OFFSET ${offsetValue}`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const allCard = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM card`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const detail = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT users.id, users.fullname, users.email, users.jobdesk, users.domisili, users.company, users.skill, users.descript, users.instagram, users.github, users.linkedin, users.image, users.role, users.position FROM users WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const usersUpdate = (data) => {
    const {id, fullname, jobdesk, domisili, company, descript} = data;
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE users SET fullname='${fullname}', jobdesk='${jobdesk}', domisili='${domisili}', company='${company}', descript='${descript}' WHERE id='${id}'`, 
        (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const usersUpdatePhoto = (data) => {
    const {id, image} = data;
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE users SET image='${image}' WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const usersDelete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM users WHERE id='${id}'`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const countUsers = () => {
    return new Promise ((resolve, reject) => {
        pool.query(`SELECT COUNT(*) AS total FROM users`, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

module.exports = {
    usersAllData,
    detail,
    usersUpdate,
    usersUpdatePhoto,
    usersDelete,
    countUsers,
    allCard
}