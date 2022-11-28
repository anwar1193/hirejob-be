const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/response');
const { insert, getAllExperience, select, deleteExperience } = require('../models/experience.model');

const experienceController = {
    insertExperience: async (req, res) => {
        try {
            const {position, company_name, work_time, descript } = req.body;
            const id = uuidv4();
            const data = {
                id,
                position, 
                company_name, 
                work_time, 
                descript, 
            };
            await insert(data);
            success(res, {
                code: 200,
                status: 'success',
                message: 'New experience has been created',
                data: data,
            });                    
        } catch (error) {
            failed(res, {
                code: 500,
                status: 'error',
                message: error,
                error: [],
            });
        }
    },
    getAllExp: async (req, res) => {
        try {
            const result = await getAllExperience();
            success(res, {
                code: 200,
                status: 'success',
                message: 'Success get all experience',
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
    detailExperience: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await select(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get experience by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `Experience with id ${id} is not found`,
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
    deleteExp: async (req, res) => {
        try {
            const { id } = req.params;
            const detailExp = await select(id);
            if (detailExp.rowCount > 0) {
                await deleteExperience(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted experience with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `Experience with id ${id} is not found`,
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

module.exports = experienceController;