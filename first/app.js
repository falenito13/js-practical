let allProducts;

fetch('./products.json')
    .then(response => response.json())
    .then(data => drawData(data))


const table = document.querySelector('#table');

function drawData(data) {
    allProducts = data;
    data.forEach(x => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${x.title}</td>
            <td><img src="${x.picture}" class="image" alt="picture"></td>
            <td>${x.unitPrice}</td>
            <td>
                <div class="last-row">
                    <div class="quantity"> ${x.quantity}</div>
                    <div class="add-to-bucket" id="${x.id}">add to bucket</div>
                </div>
            </td>
        `;

        table.appendChild(tr);
    });

    [...document.querySelectorAll('.add-to-bucket')].forEach(x => {
        x.addEventListener('click', event => {
            addProduct(event.target.id);
        })
    });
}


function addProduct(id) {
    const product = allProducts.find(x => x.id === id);
    console.log(product);
}
