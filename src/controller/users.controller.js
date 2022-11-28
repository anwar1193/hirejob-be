const path = require('path');
const { success, failed } = require('../helper/response');
const { usersAllData, detail, allCard, usersUpdate, usersUpdatePhoto, usersDelete, countUsers} = require('../models/users.model');
const deleteFile = require('../helper/deleteFile');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'fullname';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const result = await usersAllData ({
                    searchQuery,
                    offsetValue,
                    limitValue,
                    sortQuery,
                    modeQuery,
                });
                const allUsers = await countUsers();
                const totalData = allUsers.rows[0].total;
                if(search) {
                    if (result.rowCount > 0) {
                        const pagination = {
                            currentPage: pageValue,
                            dataPerPage: limitValue,
                            totalPage: Math.ceil(result.rowCount / limitValue),
                        };
                        success(res, {
                            code: 200,
                            status: 'success',
                            message: 'Success get all users',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `users with keyword ${search} is not found`,
                            error: [],
                        });
                    }
                } else {
                    const pagination = {
                        currentPage: pageValue,
                        dataPerPage: limitValue,
                        totalData: totalData,
                        totalPage: Math.ceil(totalData / limitValue)
                    }
                    success(res, {
                        code: 200,
                        status: 'success',
                        message: `Success get all users`,
                        data: result.rows,
                        pagination,
                    });
                }
            } else {
                failed(res, {
                    code: 400,
                    status: 'error',
                    message: 'limit and page value must be number',
                    error: [],
                });
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    profileUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await detail(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get user by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `users with id ${id} not found`,
                    error: [],
                });
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    getAllCard: async (req, res) => {
        try {
            const result = await allCard();
            success(res, {
                code: 200,
                status: 'success',
                message: 'Success get all data card',
                data: result.rows,
            });
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { fullname, jobdesk, domisili, company, descript } = req.body;
            const usersCheck = await detail(id);
            if (usersCheck.rowCount > 0) {
                const data = {
                    id,
                    fullname, 
                    jobdesk, 
                    domisili, 
                    company, 
                    descript, 
                };
                await usersUpdate(data);
                // const newData = await detail(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success update users',
                    data: data,
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `users with id ${id} not found`,
                    error: [],
                });
                return;
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    updatePhotoUser: async (req, res) => {
        try {
            const { id } = req.params;
            let image;
            if (req.file) {
                const usersCheck = await detail(id);
                if (usersCheck.rowCount > 0) {
                    image = 'http://' + req.file.filename;
                    const data = {
                        id,
                        image,
                    };
                    await usersUpdatePhoto(data);
                    // const newData = await detail(id);
                    success(res, {
                        code: 200,
                        status: 'success',
                        message: 'Success update user photo',
                        data: data,
                    });
                } else {
                    // deleteFile(`public/${req.file.filename}`);
                    failed(res, {
                        code: 404,
                        status: 'error',
                        message: `users with id ${id} not found`,
                        error: [],
                    });
                    return;
                }
            } else {
                failed(res, {
                    code: 400,
                    status: 'error',
                    message: `users photo is required`,
                    error: [],
                });
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const detailUser = await detail(id);
            if (detailUser.rowCount > 0) {
                // deleteFile(`public/${detailUser.rows[0].photo}`);
                await usersDelete(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted users with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `users with id ${id} not found`,
                    error: [],
                });
                return;
            }
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error.message,
                error: [],
            });
        }
    }
}

module.exports = userController;