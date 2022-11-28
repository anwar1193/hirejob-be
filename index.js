require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { failed } = require('./src/helper/response');
const app = express();

const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/users.route');
const skillRouter = require('./src/routes/skills.route');
const portfolioRouter = require('./src/routes/portfolio.route');
const experienceRouter = require('./src/routes/experience.route');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);

app.use(express.static('./upload'));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/skills', skillRouter);
app.use('/portfolio', portfolioRouter);
app.use('/experience', experienceRouter);

// app.get('/', (req, res) => {
//     res.json(`Hire Job Api v1.0`);
// });

app.all('*', (req, res, next) => {
    next (failed (res, {
        code: 503,
        status: 'error',
        message: `Service unavailable`,
        error: [],
    }))
})

app.use((err, req, res, next) => {
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message : messageError
    })
    next()
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Service running..`);
});