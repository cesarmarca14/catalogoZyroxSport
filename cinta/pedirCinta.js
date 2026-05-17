let textoPedidoGlobal = "";

function cambiarCantidad(boton, cambio) {
    const selector = boton.parentElement;
    const visualizador = selector.querySelector('.qty-value');
    let cantidadActual = parseInt(visualizador.innerText);
    
    cantidadActual += cambio;
    if (cantidadActual < 0) cantidadActual = 0;
    
    visualizador.innerText = cantidadActual;
    actualizarContadorTotal();
}

function actualizarContadorTotal() {
    let total = 0;
    document.querySelectorAll('.qty-value').forEach(el => {
        total += parseInt(el.innerText);
    });
    document.getElementById('total-items').innerText = total;
}

function abrirModalWhatsAppGlobal() {
    let pedidoDetalle = "";
    let totalPrendas = 0;
    
    // Obtenemos la URL base de tu web de forma automática
    const urlBase = window.location.origin + window.location.pathname.replace(/[^\/]*$/, '');
    
    // Ruta de la foto del buso negro que representa a todo el "Modelo Cinta"
    const fotoModeloGeneral = `${urlBase}imgCinta/negro_cinta.jpeg`;

    document.querySelectorAll('.color-card-v2').forEach(tarjeta => {
        const colorNombre = tarjeta.getAttribute('data-color');
        let detallesDeEsteColor = [];
        
        tarjeta.querySelectorAll('.qty-value').forEach(visorTalla => {
            const cantidad = parseInt(visorTalla.innerText);
            const tallaNombre = visorTalla.getAttribute('data-talla');
            
            if (cantidad > 0) {
                detallesDeEsteColor.push(`Talla ${tallaNombre} (${cantidad} und.)`);
                totalPrendas += cantidad;
            }
        });
        
        // Si hay prendas seleccionadas en este color, se agregan limpiamente sin links repetidos
        if (detallesDeEsteColor.length > 0) {
            pedidoDetalle += `*${colorNombre}*:\n  ${detallesDeEsteColor.join('\n  ')}\n\n`;
        }
    });
    
    if (totalPrendas === 0) {
        alert("Por favor, selecciona al menos 1 prenda y su talla para continuar.");
        return;
    }
    
    // ARMADO DEL MENSAJE: El enlace general del modelo va justo debajo del título
    textoPedidoGlobal = `Hola ZYROX SPORT, deseo hacer un pedido del *Modelo Cinta*:\n📸 Foto de referencia: ${fotoModeloGeneral}\n\n${pedidoDetalle}*Total prendas:* ${totalPrendas}`;
    
    // Mostrar resumen en el modal de la página
    document.getElementById("resumen-pedido-texto").innerText = `Modelo Cinta\nRef: ${fotoModeloGeneral}\n\n` + pedidoDetalle + `Total: ${totalPrendas} prendas.`;
    document.getElementById("modal-whatsapp").style.display = "flex";
}

function cerrarModalWA() {
    document.getElementById("modal-whatsapp").style.display = "none";
}

function enviarMensajeCompleto(opcionNumero) {
    let telefono = "";
    if (opcionNumero === 1) {
        telefono = "51936506776";
    } else if (opcionNumero === 2) {
        telefono = "51908501761";
    }
    
    const mensajeCodificado = encodeURIComponent(textoPedidoGlobal);
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