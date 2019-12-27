const createError = require('http-errors');

// this function is an error handle to deal with async controller methods
// simply wrap the function as follows: catchError(asyncMethod)
const catchErrors = fn => function (req, res, next) {
	return fn(req, res, next).catch(next);
};

// express interprets any route callback with four parameters as error-handling middleware
// since next(error) stops handling the request and falls back on the error handling, notFound() is only called
// if no error is thrown and no route matches the requested one
const notFound = (req, res, next) => {
	next(createError(404));
};

// if the route was indeed found and something broke, this is the fallback
// detailed error object sent back in development
const developmentErrors = (error, req, res, next) => {
	const status = error.status || 500;

	res.status(status).json(
		{
			message: error.message,
			status: error.status,
			stack: error.stack || '',
		},
	);
};

// no stack traces are sent in production to avoid leaks
const productionErrors = (error, req, res, next) => {
	const status = error.status || 500;

	res.status(status).send(
		{
			message: error.message,
			error: {},
		},
	);
};

module.exports = {
	catchErrors,
	notFound,
	developmentErrors,
	productionErrors,
};
