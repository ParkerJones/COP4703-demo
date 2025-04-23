const sql = require('mssql');

exports.render = (req, res) => {
	res.render('index');
}

exports.execute_sp6 = (req, res) => {
	console.log(req.body);
	return res.json({ success: true, message: "Success!" });
}

async function SendQuery() {
	const server = 'localhost';
	const database = 'EERDBS-15';
	const user_id = '';
	const password = '';
	const is_encryt = true;
}
