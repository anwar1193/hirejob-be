const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/response');
const { insert, getAllSkills, allData, select } = require('../models/skills.model');

const skillsController = {
    insertSkill: async (req, res) => {
        try {
            const {skill_name} = req.body;
            const id = uuidv4();
            const data = {
                id,
                skill_name,
            };
            await insert(data);
            success(res, {
                code: 200,
                status: 'success',
                message: 'New skill has been created',
                data: data,
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
    getAllSkill: async (req, res) => {
        try {
            const { search, page, limit, sort, mode } = req.query;
            const searchQuery = search || '';
            const pageValue = page ? Number(page) : 1;
            const limitValue = limit ? Number(limit) : 5;
            const offsetValue = (pageValue - 1) * limitValue;
            const sortQuery = sort ? sort : 'skill_name';
            const modeQuery = mode ? mode : 'ASC';
            if (typeof Number(page) == 'number' && typeof Number(limit) == 'number') {
                const result = await getAllSkills ({
                    searchQuery,
                    offsetValue,
                    limitValue,
                    sortQuery,
                    modeQuery,
                });
                const allDataTotal = await allData();
                const totalData = allDataTotal.rows[0].total;
                if(search) {
                    if (result.rpwCount > 0) {
                        const pagination = {
                            currentPage: pageValue,
                            dataPerPage: limitValue,
                            totalPage: Math.ceil(result.rowCount / limitValue),
                        };
                        success(res, {
                            code: 200,
                            status: 'success',
                            message: 'Success get all skills',
                            data: result.rows,
                            pagination,
                        });
                    } else {
                        failed(res, {
                            code: 500,
                            status: 'error',
                            message: `skills with keyword ${search} is not found`,
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
                        message: `Success get all skills`,
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
    detailSkill: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await select(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get skill by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `Skill with id ${id} is not found`,
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
    }
}

module.exports = skillsController;