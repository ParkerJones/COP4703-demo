const sql = require('mssql');

const sql_config = {
	user: 'node_user',
	password: 'node',
	server: '192.168.68.69',	// KEEP NOTE OF THIS!!!!!!!!!!!!!! 
	database: 'EERDBS-15',
	options: {
		encrypt: true, 
		trustServerCertificate: true 
	}
};

exports.render = (req, res) => {
	res.render('index');
}

exports.execute_udf2 = async (req, res) => {
	try {
		const pool = await sql.connect(sql_config);
		const result = await pool.request().query(`
			SELECT * FROM UDF2() ORDER BY Year, Month;
			`);

		res.json({ success: true, data: result.recordset });
	} catch (error) {
		res.json({ success: false, data: error.message });
	}
}

exports.execute_sp6 = async (req, res) => {
	console.log(req.body);
	//return res.json({ success: true, message: "Success!" });
	const {	receipt_number,
			owner_id,
			store_id,
			clerk_id,
			time,
			total_items,
			tax_paid,
			total_paid,
			payment_method } = req.body;
	try {
		const pool = await sql.connect(sql_config);
		const request = pool.request()
			.input('Receipt_Number', sql.Int, receipt_number)
			.input('Owner_ID', sql.Int, owner_id)
			.input('Store_ID', sql.Int, store_id)
			.input('Clerk_ID', sql.Int, clerk_id)
			.input('Time', sql.DateTime, new Date(time)) // assuming ISO format from input
			.input('Total_Items', sql.Int, total_items)
			.input('Tax_Paid', sql.Money, tax_paid)
			.input('Total_Paid', sql.Money, total_paid)
			.input('Payment_Method', sql.VarChar(20), payment_method);

		const result = await request.query(`EXEC sp6
			@Receipt_Number = @Receipt_Number,
			@Owner_ID = @Owner_ID,
			@Store_ID = @Store_ID,
			@Clerk_ID = @Clerk_ID,
			@Time = @Time,
			@Total_Items = @Total_Items,
			@Tax_Paid = @Tax_Paid,
			@Total_Paid = @Total_Paid,
			@Payment_Method = @Payment_Method
		`);

		res.json({ success: true, data: result.recordset });
	} catch (error) {
		console.error('SQL Error:', error);
		res.json({ success: false, data: error.number + error.message });
	}
}


exports.execute_selectQuery = async (req, res) => {
	console.log(req.body);
	const {	receipt_number } = req.body;
	try {
		const pool = await sql.connect(sql_config);
		const result = await pool.request().query(`
			SELECT * FROM receipts WHERE Receipt_Number = ${receipt_number}
			`);

		res.json({ success: true, data: result.recordset });
	} catch (error) {
		res.json({ success: false, data: error.message });
	}
}

async function SendQuery() {
}
