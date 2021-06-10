const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).send('Access Denied');
	}

	try {
		const verfied = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verfied;
		next();
	} catch (err) {
		return res.status(400).send('Invalid Token');
	}
};
