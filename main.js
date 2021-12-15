
$("#sectorCompraTerminada").fadeOut(); //oculto mi seccion de compra terminada

// Ejecutar Ajax Local para mostrar mis productos
const productos=[]; 
function cargarAjax() {
    $.ajax({
        method: "GET",
        url:"datos.json",
        success: function(respuesta) {
            console.log(respuesta);
            $("#resultadoProductos").fadeIn(2000);
            for (let producto of respuesta) {
                    $("#resultadoProductos").append( `<div class="col-md-4">
                                        <div class="card"style="width: 18rem;">
                                            <div><h3 id="idProducto" class+"text-primary"> Codigo: ${producto.codigo}</h3></div>
                                            <img src="${producto.imagen}" id="idImagen" class="card-img-top" alt="${producto.nombre}">
                                            <div class="card-body">
                                                <div class="row">
                                                    <p> producto: ${producto.nombre} <strong id="idPrecio"> $ ${producto.precio}</strong> </p>
                                                </div>
                                            </div>
                                        </div><br>
                                    </div>`);  
                    productos.push(producto);                  
            }
            console.log(productos);
            $("#estadoAjax").html("El Ajax se cargo correctamente!");
            $("#estadoAjax").removeClass("bg-danger");
            $("#estadoAjax").addClass("bg-success text-white p-3 mt-3");
            $("#estadoAjax").fadeIn(2000);
            $("#estadoAjax").fadeOut(2000)
            
        },
        error: function(respuesta) {
        $("#estadoAjax").html("<b>Error!</b> El Ajax no se cargo correctamente!");
        $("#estadoAjax").removeClass("bg-success");
        $("#estadoAjax").addClass("bg-danger text-white p-3 mt-3");
        $("#estadoAjax").fadeIn(2000);
        }
    });
}
//Ocultamos los productos
function eliminarAjax() {
    $("#resultadoProductos").html("");
    $("#resultadoProductos").fadeOut("slow");
    $("#estadoAjax").html("");
    $("#estadoAjax").fadeOut("slow");
}
//Boton que llama a la funcion que carga mis productos
$("#botonAjax").click(function() {
    cargarAjax();
});
//Boton que llama a la funcion que oculta mis productos
$("#eliminarAjax").click(function() {
    eliminarAjax();
});

//creamos un formulario

//Selectores del formulario en JS
let miVenta = document.getElementById("form-compra"); // seleccionamos el formulario
let productoSeleccionado = document.getElementById("producto_seleccionado"); //selecciono el input de producto
let cantidad = document.getElementById("cantidad_seleccionada"); //selecciono el input de cantidad
let resultado = document.getElementById("importe_momento"); // selecciono el input resultado
let boton= document.getElementById("impTotal"); //selecciono el boton Importe Total
let miTotal= document.getElementById("precio_total");// selecciono el input precio_total
miVenta.addEventListener("submit", ventaProductos); // escuchamos el evento submit del formulario
miVenta.addEventListener("reset", resetear);
boton.addEventListener("click", mostrarTotal); //escuchamos el evento button Importe Total

//realiza la venta
var importeTotal = 0;
let i=1;
function ventaProductos(e) {
  e.preventDefault(); //prevengo el comportamiento por defecto que recarga la pagina al hacer submit
  if (productoSeleccionado.value == 1) {
    importeTotal += productos[0].precio * cantidad.value;
  } else if (productoSeleccionado.value == 2) {
    importeTotal += productos[1].precio * cantidad.value;
  } else if (productoSeleccionado.value == 3) {
    importeTotal += productos[2].precio * cantidad.value;
  } else{
      $("#resultados").append(
                            `<div class="mb-3">
                            <h3 class="text-warning"> Codigo no valido<h3>
                            </div>`
      );
      $("#resultados").fadeOut(3000);
  }
  resultado.value = importeTotal ; // actualizo el valor del input por el importe total
  localStorage.setItem("seleccionados",JSON.stringify([productoSeleccionado.value, productos[productoSeleccionado.value -1].nombre,cantidad.value, productos[productoSeleccionado.value -1].precio]));
  let ver= JSON.parse(localStorage.getItem("seleccionados"));
  guardarPedido(ver);
  $("#resultados").append( `<div id="p${i}">
                        <p class='text-white bg-black p-3'> Usted a seleccionado: Codigo: ${ver[0]} producto: ${ver[1]} precio $ ${ver[3]} </p>
                        </div>`);
//Utilizamos animaciones en cadena
  $(`#p${i}`).slideDown(2000)
          .delay(1000)
          .fadeOut("slow");       
  console.log(ver);
  ++i;
}
//guardo el detalle del pedido en mi localStorage
const pedido=[];
function guardarPedido(ver){
    pedido.push(ver);
    localStorage.setItem("pedido", JSON.stringify(pedido));
    console.log(pedido);
}
//botton reset
function resetear(){
    resultado= 0;
    $("#importeMomento").hide();// Ocultamos nuestro div al hacer click en el boton terminar
    $(".codigoSelec").hide();
    $(".cantidadSelec").hide();
    $("#botonesAceptarTerminar").hide();
}

//Muestra el total a pagar
function mostrarTotal(e){
    e.preventDefault();
    if(importeTotal != 0){
        
        importeTotal= importeTotal * 1.21;
        miTotal.value= "$" +importeTotal; //actualizo el valor del input precio total
        importeTotal= 0;
        localStorage.setItem("total",JSON.stringify(miTotal.value));
        let tot=JSON.parse(localStorage.getItem("total"));
        $("#agradecido").append( `<div id="agrad1">
                                <p class='text-white bg-black p-3'> Gracias por su compra!!! </p>
                                </div>`);
        // creando animacion en agradecido
        $("#agrad1").slideDown(2000)
                    .delay(1000)
                    .slideUp(2000);
        console.log(tot);
    }
    else { 
        miTotal.value= 0;
        $("#agradecido").append( `<div id="agrad1">
                                <p class='text-white bg-black p-3'> No ha generado ninguna compra!!! </p>
                                </div>`);
        // creando animacion en agradecido
        $("#agrad1").slideUp(1000)
                    .slideDown(1000)
                    .fadeOut();
    }
    
}

//Creamos un formulario en jquery
$("#formularioContacto").prepend(` <form id="formContacto">
                                        <div class="mb-3">
                                            <label for="nombre"class="form-label" >Nombre</label>
                                            <input type="text" class="form-control" id= "nombre">
                                            <div id="textoNombre" class="form-text"><div>
                                        </div>
                                        <div class="mb-3">    
                                            <label for="apellido"class="form-label" >Apellido</label>
                                            <input type="text"class="form-control" id= "apellido">
                                            <div id="textoApellido" class="form-text"><div>
                                        </div>
                                        <div class="mb-3">    
                                            <label for="telefono" class="form-label">Telefono</label>
                                            <input type="text" class="form-control" id= "telefono" placeholder="3415000000">
                                            <div id="textoTelefono" class="form-text"><div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="form-label"> email</label>
                                            <input type="email" class="form-control" id="email" placeholder="nombre@ejemplo.com" > 
                                            <div id="textoEmail" class="form-text"><div> 
                                        </div>
                                        <div class="mb-3">
                                            <label for="ciudad" class="form-label">Ciudad</label>
                                            <input type="text" class="form-control" id="ciudad">
                                            <div id="textoCiudad" class="form-text"><div>
                                        </div>
                                        <button id="enviar_form" type="button" class="btn btn-primary" >Enviar</button>
                                        <button id="detallePedido" type="button" class="btn btn-success" > Mostrar Pedido </button>
                                    </form><br>`);
$("#detallePedido").fadeOut();                                    
                                
//funcion guardar datos del formulario
function guardarDatosForm(){
    console.log("guardo los datos en la Localstorage `datosFormulario`");
    var nombre= $("#nombre").val();
    var apellido= $("#apellido").val();
    var telefono= $("#telefono").val();
    var email= $("#email").val();
    var ciudad= $("#ciudad").val();
    localStorage.setItem("datosFormulario", JSON.stringify({nombre:nombre, apellido:apellido, telefono:telefono, email:email, ciudad:ciudad}));
}

$("#enviar_form").click(function() {
    guardarDatosForm();
    $("#formcontacto").submit(); //asociamos el evento submit al formulario
    console.log("Formulario Enviado!");
    let datoForm =JSON.parse(localStorage.getItem("datosFormulario"));
    console.log(datoForm);
    $("#detallePedido").fadeIn();
    
});

//cuando apretamos el boton creado accionamos la funcion que nos detalla el pedido
$("#detallePedido").click(function() {
    $("#sectorContacto").fadeOut();
    $("#sectorVenta").fadeOut();
    $("#sectorMuestraProductos").fadeOut();
    $("#sectorNosotros").fadeOut();
    let tot=JSON.parse(localStorage.getItem("total"));
    let datoForm =JSON.parse(localStorage.getItem("datosFormulario"));
    mostrarPedidohtml(datoForm, tot, pedido);
});

function mostrarPedidohtml(datoForm, tot, pedido){
    $("#sectorCompraTerminada").fadeIn();
    for(let datos of pedido){
        $("#detalleCompra").append(
                                `<div class="mb-3">
                                <p> Código: ${datos[0]} Nombre: ${datos[1]} Precio: $ ${datos[3]} Cantidad: ${datos[2]}</P>
                                <hr>
                                </div>`
        );
    }
    $("#total").append(
                        `<div class="mb-3">
                        <p> Total: $ ${tot}</p>`
    );
    $("#detalleComprador").append(
                                    `<div class="mb-3">
                                        <P> Nombre: ${datoForm.nombre}</p>
                                        <p> Apellido: ${datoForm.apellido}</P>
                                        <p> Teléfono: ${datoForm.telefono}</p>
                                        <p> Ciudad: ${datoForm.ciudad}</p>
                                        <h4> Enviaremos su factura al mail: <b>${datoForm.email}</b> </h4>
                                    </div>`                               
    );
};

