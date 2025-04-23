function Execute_UDF2() {

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

	console.log(receipt_number, owner_id, store_id, clerk_id, time, total_items, tax_paid, total_paid, payment_method);
	console.log(time);

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
		// show output
	} else {
		console.error("Error:", result.error);
		alert(`Error: ${result.error}`);
	}
}
