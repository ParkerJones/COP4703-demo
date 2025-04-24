async function Execute_UDF2() {
	const element_table = document.querySelector('#udf2-table');

	const response = await fetch('/execute-udf2', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			msg: "UDF2 executed"
		}),
	});

	const result = await response.json();
	if (result.success) {
		const _tr = document.createElement('tr');
		Object.keys(result.data[0]).forEach((key, i) => {
			const _td = document.createElement('td');
			_td.textContent = Object.keys(result.data[0])[i];
			_tr.appendChild(_td);
		});
		element_table.appendChild(_tr);

		result.data.forEach((row, i) => {
			const tr = document.createElement('tr');

			const values = Object.values(result.data[i]);

			values.forEach(value => {
				const td = document.createElement('td');
				td.textContent = value;
				tr.appendChild(td);
			});
			element_table.appendChild(tr);
		});
		
		console.log(result.data);
	} else {
		alert("Error:", result.data);
	}
}

async function Execute_SP6() {
	const element_receipt_number = document.querySelector('#receipt_number');
	const element_owner_id = document.querySelector('#owner_id');
	const element_store_id = document.querySelector('#store_id');
	const element_clerk_id = document.querySelector('#clerk_id');
	const element_date = document.querySelector('#date');
	const element_time = document.querySelector('#time');
	const element_total_items = document.querySelector('#total_items');
	const element_tax_paid = document.querySelector('#tax_paid');
	const element_total_paid = document.querySelector('#total_paid');
	const element_payment_method = document.querySelector('#payment_method');
	
	const receipt_number = element_receipt_number.value;
	const owner_id = element_owner_id.value;
	const store_id = element_store_id.value;
	const clerk_id = element_clerk_id.value;
	const time = element_date.value + ' ' + element_time.value;
	const total_items = element_total_items.value;
	const tax_paid = element_tax_paid.value;
	const total_paid = element_total_paid.value;
	const payment_method = element_payment_method.value;

	const element_output = document.querySelector('#output-paragraph');

	const response = await fetch('/execute-sp6', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			receipt_number,
			owner_id,
			store_id,
			clerk_id,
			time,
			total_items,
			tax_paid,
			total_paid,
			payment_method
		}),
	});

	const result = await response.json();
	if (result.success) {
		element_output.textContent = 'Successful execution';
	} else {
		element_output.textContent = result.data;
	}
}

async function Execute_SelectQuery() {
	const element_receipt_number = document.querySelector('#_receipt_number');
	const receipt_number = element_receipt_number.value;

	const elements_key_cells = document.querySelectorAll('#output-table .c');
	const key_cells = Array.from(elements_key_cells);

	const elements_value_cells = document.querySelectorAll('#output-table .d');
	const value_cells = Array.from(elements_value_cells);

	console.log(key_cells);
	console.log(value_cells);

	const response = await fetch('/execute-selectQuery', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			receipt_number
		}),
	});

	const result = await response.json();
	if (result.success) {
		const keys = Object.keys(result.data[0]);
		const values = Object.values(result.data[0]);
		key_cells.forEach((cell, i) => {
			cell.textContent = keys[i];
		});
		value_cells.forEach((cell, i) => {
			cell.textContent = values[i];
		});
	} else {
		alert("Error:", result.data);
	}
}
