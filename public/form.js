const port = 8080;
var sendAjaxUrl = `http://localhost:${port}/login`;
document.querySelector('.ajaxsend').addEventListener('click', function() {
    var inputEmail = document.getElementsByName('email')[0].value;
    var inputPassword = document.getElementsByName('password')[0].value;
    sendAjax(sendAjaxUrl, inputEmail, inputPassword);
})

async function sendAjax(url, email, password) {
	var res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({email : email, password : password})
	});

	var bodyJson = await res.json();

	if (bodyJson.email)
		// setEmail(bodyJson.name);
		window.location.href = '/main';
	else
		setEmail(bodyJson);
}

function setEmail(email) {
	document.querySelector('.result').innerHTML = `<h2>${email}</h2>`;
}