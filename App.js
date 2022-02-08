
class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
        this.id = new Date().getTime();
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col text-center">
                        <strong>Product Name</strong>: ${product.name}
                        <strong>Product Price</strong>: ${product.price}
                        <strong>Product Year</strong>: ${product.year}
                        <br><strong>Product ID</strong>: ${product.id}</br>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <a href="#" class="btn btn-danger" id="${product.id}" name="delete">Delete</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        productList.appendChild(element);
        
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        
        productos.forEach((product) =>{
            
            if(element.id == product.id){
                element.parentElement.parentElement.parentElement.remove();
                productos.splice(product);
                this.showMessage('Producto Eliminado Satisfactoriamente', 'info');
            }
        })
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in dom
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000)
    }
    
}

//DOM  Events
document.getElementById('product-form').addEventListener('submit', function (e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);

        const ui = new UI();

        if(name === ''  || price === '' || year === ''){
            return ui.showMessage('Complete los campos porfavor', 'danger');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto Agregado Satisfactoriamente', 'success');

        productos.push(product);

        e.preventDefault();
    })

document.getElementById('product-list')
    .addEventListener('click', function(e){
        
        const ui = new UI();
        ui.deleteProduct(e.target);
    })

document.getElementById('Search-quest').addEventListener('submit', function(e){
    productos.forEach((product) =>{
        alert('entro');
        console.log(product.name);
        e.preventDefault();
    })
})



let productos = [];
const ui = new UI();
const busqueda = document.querySelector('#nameProduct');
const filtrar = ()=>{
    document.getElementById("product-list").innerHTML = "";
    const texto = busqueda.value.toLowerCase();
    const vacio = busqueda.value;
    productos.forEach((product) =>{
        let nombre = product.name.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
            ui.addProduct(product);
        }else if(vacio == ''){
            alert("entro");
            ui.showProducts();
        }
    
    })
}

busqueda.addEventListener('keyup', filtrar);


     
    


