let productoSeleccionado = "";

function pedirWhatsApp(nombreProducto) {
    productoSeleccionado = nombreProducto;
    document.getElementById("modal-producto-nombre").innerText = `Producto: ${nombreProducto}`;
    document.getElementById("modal-whatsapp").style.display = "flex";
}

function cerrarModalWA() {
    document.getElementById("modal-whatsapp").style.display = "none";
}

function enviarMensajeDirecto(opcionNumero) {
    let telefono = "";
    if (opcionNumero === 1) {
        telefono = "936506776";
    } else if (opcionNumero === 2) {
        telefono = "908501761";
    }

    const mensaje = `Hola ZYROX SPORT, deseo más información sobre el producto: ${productoSeleccionado}`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${telefono}&text=${mensajeCodificado}`;

    window.open(urlWhatsApp, '_blank');
    cerrarModalWA();
}

window.onclick = function(event) {
    const modal = document.getElementById("modal-whatsapp");
    if (event.target == modal) {
        cerrarModalWA();
    }
}