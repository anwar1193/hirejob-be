const { v4: uuidv4 } = require('uuid');
const { success, failed } = require('../helper/response');
const { insert, getAllPortfolio, select, deletePortfolio } = require('../models/portfolio.model');

const portfolioController = {
    insertPortfolio: async (req, res) => {
        try {
            const {app_name, link_repo, app_type} = req.body;
            const id = uuidv4();
            const image = req.file.filename;
            const data = {
                id,
                app_name, 
                link_repo, 
                app_type, 
                image,
            };
            await insert(data);
            success(res, {
                code: 200,
                status: 'success',
                message: 'New portfolio has been created',
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
    getAllPort: async (req, res) => {
        try {
            const result = await getAllPortfolio()
            success(res, {
                code: 200,
                status: 'success',
                message: 'Success get all portfolio',
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
    detailPortfolio: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await select(id);
            if (result.rowCount > 0) {
                success(res, {
                    code: 200,
                    status: 'success',
                    message: 'Success get portfolio by id',
                    data: result.rows[0],
                });
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `Portfolio with id ${id} is not found`,
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
    deletePorto: async (req, res) => {
        try {
            const { id } = req.params;
            const detailPort = await select(id);
            if (detailPort.rowCount > 0) {
                await deletePortfolio(id);
                success(res, {
                    code: 200,
                    status: 'success',
                    message: `success deleted portfolio with id ${id}`,
                    error: [],
                });
                return;
            } else {
                failed(res, {
                    code: 404,
                    status: 'error',
                    message: `portfolio with id ${id} is not found`,
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

module.exports = portfolioController;