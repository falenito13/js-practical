const form = document.querySelector('#web-from');
const randomButton = document.querySelector('#random-button');
const data = {}


randomButton.addEventListener('click', () => {
    const randomNumber = ~~(Math.random() * 10) + 1;
    sendGetRequest(randomNumber)
})

form.addEventListener('submit', event => {
    event.preventDefault();


    const inputs = [...form.querySelectorAll('input')];

    if (!validateInput(inputs)) return;

    inputs.forEach(input => {
        data[input.id] = input.value;
    })

    const idContainer = form.querySelector('#id');

    if(idContainer.innerText !== "") {
        makePutRequest(idContainer.innerText);
        idContainer.innerText = "";
        return;
    }


    sendPostRequest();
})

function validateInput(inputs) {
    inputs.forEach(input => input.classList.add(input.value === "" ? 'not-valid' : 'valid'));
    return inputs.every(input => input.value);
}

function sendPostRequest() {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(console.log)
}

function sendGetRequest(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => setValues(id, data))
}

function setValues(id, data) {
    const inputs = [...form.querySelectorAll('input')];
    inputs.forEach(input => {
        input.value = data[input.name];
    })

    const idContainer = form.querySelector('#id');
    idContainer.innerText = id;
}

function makePutRequest(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(console.log)
}