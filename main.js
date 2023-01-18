
const url = 'http://localhost:3000/products';
const urlDirecciones = 'http://localhost:3000/direcciones';
const urlCarrito = 'http://localhost:3000/carrito'

const mainContainer = document.getElementById('mainContainer');
const mainContainer2 = document.getElementById('mainContainer2');
const mainContainer3 = document.getElementById('mainContainer3');
const modalContainer = document.getElementById('modal__container');
const modal = document.querySelector('.modal');
const place = document.getElementById('location');
const modalLocation = document.getElementById('locations')
const optionSelect = document.getElementById('optionsSelect');
const btnModalLocation = document.getElementById('btnModalLocation')
const city = document.getElementById('cityTop');
const cityCarrito = document.getElementById('cityCarrito')
const btnCarritoNav = document.getElementById('btnCarritoNav');
const carrito = document.getElementById('carrito');
const btnCarrito = document.getElementById('btnCarrito');

const valueOptions = document.getElementById('valueOptions');
const carritoLleno = document.getElementById('carritoLleno');
const allModal = document.getElementById('allModal');
const options = document.getElementById('options');
const productosCarrito = document.getElementById('productosCarrito');
const btnPagarCarrito = document.getElementById('btnPagarCarrito');
const quantity = document.getElementById('quantity');
const quantityTop = document.getElementById('quantityTop');
const valueQuantity = document.getElementById('valueQuantity');
const carritoVacio = document.getElementById('carritoVacio');
const form = document.getElementById('form');
const btnP1 = document.getElementById('button');
const btnP2 = document.getElementById('button2');
const valor = document.getElementById('valor');
const btnSubmit = document.getElementById('submit');
const pago2 = document.getElementById('pago2');
const inputs = document.querySelectorAll('#form input');
const cardCorreo = document.getElementById('label1');
const cardNumber = document.getElementById('label2');
const cardMonth = document.getElementById('label3');
const cardCvc = document.getElementById('label4');
const cardName = document.getElementById('label5');



let carritoSave = JSON.parse(localStorage.getItem("product")) || [];

let products = [];

// const users = JSON.parse(localStorage.getItem("user"))||[];

const getProductsAPI = (data) => {
    products = data;
}


const showCarrito = () => {
    if (carritoSave.length == 0) {
        carritoVacio.classList.remove('hidden');
        carritoLleno.classList.add('hidden')


    } else {
        carritoVacio.classList.add('hidden');
        carritoLleno.classList.remove('hidden')
        productosCarrito.innerHTML = '';
        carritoSave.forEach(e => {

            productosCarrito.innerHTML += `
        <figure id="${e.id}">
                        <img src="${e.img}" alt="" id="imgPago">
                    </figure>
                    <div class="productPago">
                        <p>${e.description}</p>
                        <span>$${e.price}</span>
                    </div>
                    <div class="btnPagoC">
                        <button id="button3" class="btnMMc">-</button>
                        <input type="text" id="valor2" class="valor" value="250g">
                        <button id="button4" class="btnMMc">+</button>
                    </div>`
            const btnP3 = document.getElementById('button3');
            const btnP4 = document.getElementById('button4');
            const valor2 = document.getElementById('valor2');



            let total = 0;

            btnP3.onclick = () => {
                let total = Number(valor2.value.trim(" "));
                total = !isNaN(total) ? total - 1 : 250;

                valor2.value = total;
            }
            btnP4.onclick = () => {
                let total = Number(valor2.value.trim(" "));
                total = !isNaN(total) ? total + 1 : 250;

                valor2.value = total;
            }

        })


    }


}


showCarrito();

// Se capturan los datos de cada producto
const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    renderCards(data);
    getProductsAPI(data);
}
//Se capturan los datos de cada dirección
const getDirecciones = async () => {
    const response = await fetch(urlDirecciones);
    const data = await response.json();
    renderDireccions(data);
}

//Se pintan las cartas de cada producto
const renderCards = (dataProducts) => {
    mainContainer.innerHTML = '';
    //Se recorre el array de productos
    dataProducts.forEach(element => {
        if (element.id <= 7) {
            mainContainer.innerHTML += `
            <div class="cardProduct" id="${element.id}">
                    <p class="descuento">${element.descuento}% dto.</p>
                    <figure>
                        <img src=${element.img} alt="limon" id="imgProduct" class="imgProduct pointer">
                    </figure>
                    <div class="prices">
                        <strong>$${element.price}/kg </strong>
                        <p> $${element.priceDescuento}/kg</p> 
                    </div>
                  
                    <p class="descripcion">${element.description}</p>
        
                    <button class="btnProduct pointer" id="${element.id}">Agregar</button>`

        }



    });
    // Se pintan las cartas de los productos en oferta
    mainContainer2.innerHTML = '';
    dataProducts.forEach(element => {
        if (element.id > 7) {
            mainContainer2.innerHTML += `
            <div class="cardProduct pointer" id="${element.id}">
                    <figure>
                        <img src=${element.img} alt="limon" id="imgProduct" class="imgProduct">
                    </figure>
                    <div class="prices">
                        <strong>$${element.price}</strong>
                        <p>${element.priceDescuento}</p> 
                    </div>
                  
                    <p class="descripcion">${element.description}</p>
                    <p class="gramos"> ${element.gramos}</p>
        
                    <button class="btnProduct" id="${element.id}">Agregar</button>
                    </div>`

        }



    });
    //Se pintan las cartas dentro del modal
    mainContainer3.innerHTML = '';
    dataProducts.forEach(element => {
        if (element.id < 5) {
            mainContainer3.innerHTML += `
            <div class="cardProduct3" id="${element.id}">
                    <p class="descuento">${element.descuento}% dto.</p>
                    <figure>
                        <img src=${element.img} alt="limon" id="imgProduct3" class="imgProduct3 pointer">
                    </figure>
                    <div class="prices3">
                        <strong>$${element.price}/kg </strong>
                        <p> $${element.priceDescuento}/kg</p> 
                    </div>
                  
                    <p class="descripcion3">${element.description}</p>
        
                    <button class="btnProduct pointer" id="btnProduct3">Agregar</button>`

        }



    });


}
//Se pinta el modal
let total = 0;

const renderModal = (id) => {
    let arrayModal = products.filter(datos => datos.id == id)
    allModal.innerHTML = '';
    arrayModal.forEach(element => {
        allModal.innerHTML = `
                <section class="topModal" id="topModal">
                    <div class="leftTopModal">
                        <figure><img src="${element.img}" alt="" id="imgModal"></figure>
                    </div>
                    <div class="rightTopModal">
                        <button id="closeBtn">
                            <figure>
                                <img src="./images/cancel.png" class="modal__close pointer">
                            </figure>
                        </button>
                        <p id="nameProductModal">${element.description}</p>
                        <h3>· $${element.price}<span id="spanPrecio">/</span>Kg</h3>
                        <p id="ivaP">Precios con IVA incluido</p>
                        <p id="descripcionTopModal">Peso aproximado por pieza, puede variar de acuerdo al peso real.</p>

                        <label><strong>Selecciona la madurez que deseas</strong>
                            <select class="opciones pointer">
                                <option value="" class="options pointer">Por elegir</option>
                                <option value="1" class="options pointer">Maduro (Para hoy)</option>
                                <option value="2" class="options pointer">Normal (3-5 días)</option>
                                <option value="3" class="options pointer">Verde (7 días)</option>
                            </select>

                        </label>
                        <div class="confirmProduct">
                            <div class="btnPago">
                                <button id="button" class="btnMM pointer">-</button>
                                <input type="text" id="valor" class="valor" value="250g">
                                <button id="button2" class="btnMM pointer">+</button>
                            </div>
                            <button id="agregarProduct" class="pointer">Agregar</button>

                        </div>

                    </div>



                </section>
                `
                   const agregarProduct = document.getElementById('agregarProduct');
                   agregarProduct.addEventListener('click', () => {
                    total += Number(element.price);
                    console.log(total);
                                       
                    const newProductCarrito ={
                        id: element.id,
                        img: element.img,
                        description: element.description,
                        price: element.price
                    };
                   
            
                    carritoSave.push(newProductCarrito);
                    localStorage.setItem("product", JSON.stringify(carritoSave));
                    
                   quantity.innerHTML = carritoSave.length;
                   quantityTop.innerHTML = carritoSave.length;
                   valueQuantity.innerHTML = total;
                   btnSubmit.innerHTML = `Ir a pagar $${total}`;
                   
                       modal.classList.remove('modal--show');
                       Swal.fire({
                           html: '<div class="check"><img src="./images/check.png"><p>Producto añadido</p></div>',
                           toast: true,
                           position: 'top-end',
                           background: '#0AC763',
                           timer: 1500,
                           timerProgressBar: true,
                           showConfirmButton: false,
                           color: '#fff'
           
           
                       })
                       localStorage.setItem('total', valueQuantity.innerHTML);
                      
                   })
                   
           
                    
            agregarProduct.addEventListener('click', (e) => {
                showCarrito();
                renderPago2();
                if (e.target.classList.contains('modal__close')) {
                    modal.classList.remove('modal--show');
                }
            })
     
    })

}


getProducts();
getDirecciones();

mainContainer.addEventListener('click', (e) => {
    if (e.target.localName == "button") {
        renderModal(e.target.id);
        modal.classList.add('modal--show');
        suma();

    }


})

mainContainer2.addEventListener('click', (e) => {
    if (e.target.localName == "button") {
        renderModal(e.target.id);
        modal.classList.add('modal--show');
        suma();

    }

})

const suma = () => {
    const btnP1 = document.getElementById('button');
    const btnP2 = document.getElementById('button2');
    const valor = document.getElementById('valor');
    let numero = 0;
    btnP1.onclick = () => {
        numero = Number(valor.value.trim(" "));
        numero = !isNaN(numero) ? numero - 1 : 250;

        valor.value = numero;
    }
    btnP2.onclick = () => {
        numero = Number(valor.value.trim(" "));
        numero = !isNaN(numero) ? numero + 1 : 250;

        valor.value = numero;
    }
}



// Se agrega un evento para poder ingresar la ubicacion
place.addEventListener('click', () => {
    modalLocation.classList.remove('hidden');

})
//Aqui se recorre cada dirección y se agrega a el select
const renderDireccions = (dataDirecciones) => {
    dataDirecciones.forEach(e => {
        optionSelect.innerHTML += `
        <option value="${e.ciudad}-${e.departamento}">${e.ciudad}-${e.departamento}</option>`


    })


}
//Aqui inicializo una variable para guardar el valor que seleccione el usuario
let selected = ''
//Se escucha el evento
optionSelect.addEventListener('click', () => {
    //Se agrega ese el valor de ese evento a la variable anteriormente creada
    selected = optionSelect.value;
    city.innerHTML = selected; //Se modifica el html de la ciudad
    cityCarrito.innerHTML = selected; //Se modifica el html de la direccion en el carrito
    localStorage.setItem("location", cityCarrito.innerHTML);

})

city.innerHTML = localStorage.getItem("location");
cityCarrito.innerHTML = localStorage.getItem("location");
quantity.innerHTML = carritoSave.length;
quantityTop.innerHTML = carritoSave.length;
valueQuantity.innerHTML =localStorage.getItem("total");
let valueTotal = localStorage.getItem("total");
btnSubmit.innerHTML = `Ir a pagar $${valueTotal}`;



//Se captura el id para poder cerra la ventana
document.getElementById('cancelLocationModal').addEventListener('click', () => {
    modalLocation.classList.add('hidden')
})
//Se captura el boton para cerra el modal de la ubicacion
btnModalLocation.addEventListener('click', () => {
    modalLocation.classList.add('hidden')

})

// Para cerrar el modal
modalContainer.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('modal__close')) {
        modal.classList.remove('modal--show');
    }
})
//Se le remueve la clase para poder ver el carrito
btnCarritoNav.addEventListener('click', () => {
    carrito.classList.remove('hidden');
})
//Se cierra el carrito
btnCarrito.addEventListener('click', () => {
    carrito.classList.add('hidden');
})

document.getElementById('btnCancelModalCarrito').addEventListener('click', () => {
    carrito.classList.add('hidden');
})
// localStorage.clear();
// console.log(localStorage);
// console.log(carritoSave);
const renderPago2 = () => {
    pago2.innerHTML = '';
    carritoSave.forEach(e => {

        pago2.innerHTML += `
        <div class="infoProduct">
        <figure>
            <img src="${e.img}" alt="" id="imgPago">
        </figure>
        <div class="productPago">
            <p>${e.description}</p>
            <span>$${e.price}</span>
        </div>
        <div class="btnPago">
            <button id="button" class="btnMM">-</button>
            <input type="text" id="valor" class="valor" value="250g">
            <button id="button2" class="btnMM">+</button>
        </div>

    </div>`
        const btnP3 = document.getElementById('button');
        const btnP4 = document.getElementById('button2');
        const valor2 = document.getElementById('valor');



        let total = 0;

        btnP3.onclick = () => {
            total = Number(valor2.value.trim(" "));
            total = !isNaN(total) ? total - 1 : 250;

            valor2.value = total;
        }
        btnP4.onclick = () => {
            total = Number(valor2.value.trim(" "));
            total = !isNaN(total) ? total + 1 : 250;

            valor2.value = total;
        }

    })
   
}
renderPago2();

//Inicializo una variable para ir sumando
// let numero = 0;
// btnP1.onclick = () => {
//     let numero = Number(valor.value.trim(" "));
//     numero = !isNaN(numero) ? numero - 1 : 250;

//     valor.value = numero;
// }
// btnP2.onclick = () => {
//     let numero = Number(valor.value.trim(" "));
//     numero = !isNaN(numero) ? numero + 1 : 250;

//     valor.value = numero;
// }



//Se oculta toda la ventana principal para desplegar la ventana de pago
btnPagarCarrito.addEventListener('click', () => {
    carrito.classList.add('hidden');
    document.getElementById('all').classList.add('hidden');
    document.getElementById('all2').classList.remove('hidden')

})
//Se abre nuevamente la ventana principal
document.getElementById('btnCancelTop2').addEventListener('click', () => {
    document.getElementById('all2').classList.add('hidden');
    document.getElementById('all').classList.remove('hidden')

})
// Se crea un evento que muestra un modal de confirmacion de compra
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        imageUrl: 'images/Hands Buying.png',
        title: '¡Gracias por tu compra!',
        confirmButtonText: '<p class="swalA" id="confirmBtnText">Seguir comprando</p>',
        confirmButtonColor: '#0AC763',
        width: '50%'

    })
    //Se resetea el formulario
    form.reset();
    localStorage.removeItem("product");
    localStorage.removeItem("total");
    confirmBtnText.addEventListener('click', () => {
        document.getElementById('all2').classList.add('hidden');
        document.getElementById('all').classList.remove('hidden')

    })

})
// form.addEventListener('click', (e) => {
//     console.log(e.target.name);
  
// })

// const expresions = {
//     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
//     card: /\d{4}\s\d{4}\s\d{4}\s\d{4}/,
//     correo: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

// }

// const allRight = {
//     cardCorreo: false,
//     cardNumber: false,
//     cardMonth: false,
//     cardCvc: false,
//     cardName: false
// }

// const handleSubmit = () => {
//     const newUser ={
//         correo        : cardCorreo.value,
//         cardNumber  : cardNumber.value,
//         cardMonth   : cardMonth.value,
//         cardCvc    : cardCvc.value,
//         cardName     : cardName.value
//     }
    
//     users.push(newUser);
//     localStorage.setItem("user", JSON.stringify(users));
//     e.preventDefault();
//     Swal.fire({
//         imageUrl: 'images/Hands Buying.png',
//         title: '¡Gracias por tu compra!',
//         confirmButtonText: '<p class="swalA" id="confirmBtnText">Seguir comprando</p>',
//         confirmButtonColor: '#0AC763',
//         width: '50%'

//     })
//     //Se resetea el formulario
//     form.reset();
//     confirmBtnText.addEventListener('click', () => {
//         document.getElementById('all2').classList.add('hidden');
//         document.getElementById('all').classList.remove('hidden')

//     })

    // form.classList.add('hidden');
    // secondCard.classList.remove('hidden');
    // form.reset();

// }

// const validation = (e) => {
//     switch (e.target.name) {
//         case 'cardCorreo':
//             if (expresions.correo.test(e.target.value)) {
//                 document.getElementById('error1').classList.add('invisible')
//                 allRight['cardCorreo'] = true;

//             }
//             else {
//                 document.getElementById('error1').classList.remove('invisible')
//                 document.getElementById('error1').classList.remove('errorHidden')
//                 allRight['cardName'] = false;
//             }

//             break
//         case 'cardNumber':
//             if (expresions.card.test(e.target.value)) {
//                 document.getElementById('label2').classList.remove('denegate');
//                 document.getElementById('label2').classList.add('success');
//                 document.getElementById('error2').classList.add('invisible')

//                 allRight['cardNumber'] = true;

//             }
//             else {
//                 document.getElementById('label2').classList.add('denegate');
//                 document.getElementById('error2').classList.remove('invisible')
//                 allRight['cardNumber'] = false;
//             }

//             break
//         case 'month':
//             if (e.target.value.lenght != 0) {
//                 if (e.target.value >= 1 && e.target.value <= 12) {
//                     document.getElementById('label3').classList.remove('denegate');
//                     document.getElementById('label3').classList.add('success');
//                     document.getElementById('error3').classList.add('invisible')
//                     allRight['month'] = true;
//                 }
//                 else {
//                     document.getElementById('label3').classList.add('denegate');
//                     document.getElementById('error3').classList.remove('invisible')
//                     allRight['month'] = false;
//                 }

//             }
//             break
//         case 'year':
//             if (e.target.value != 0) {
//                 if (e.target.value != 00) {
//                     document.getElementById('label5').classList.remove('denegate');
//                     document.getElementById('label5').classList.add('success');
//                     document.getElementById('error4').classList.add('invisible')
//                     allRight['year'] = true;
//                 }

//             }
//             else {
//                 document.getElementById('label5').classList.add('denegate');
//                 document.getElementById('error4').classList.remove('invisible')
//                 allRight['year'] = false;
//             }

//             break
//         case 'cvc':
//             if (e.target.value.length == 3 && e.target.value >= 1) {
//                 document.getElementById('label4').classList.remove('denegate');
//                 document.getElementById('label4').classList.add('success');
//                 document.getElementById('error5').classList.add('invisible')
//                 allRight['cvc'] = true;

//             }
//             else {
//                 document.getElementById('label4').classList.add('denegate');
//                 document.getElementById('error5').classList.remove('invisible')
//                 allRight['cvc'] = false;
//             }

//             break
//     }
// }

// inputs.forEach((input) => {
//     input.addEventListener('keyup', validation);
//     // input.addEventListener('blur', validation);

// })

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (allRight.cardName && allRight.cardNumber && allRight.month && allRight.year && allRight.cvc) {

//         handleSubmit();
//         form.reset();
        

//     }

// });







