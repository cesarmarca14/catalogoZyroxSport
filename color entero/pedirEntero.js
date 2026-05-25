let textoPedidoGlobal = "";

// --- NUEVA LÓGICA: VISTA PREVIA DE IMAGEN EN GRANDE ---
document.addEventListener("DOMContentLoaded", () => {
    // Escucha el clic en todas las imágenes de los colores
    document.querySelectorAll('.color-img-real').forEach(imagen => {
        imagen.addEventListener('click', function() {
            const srcImagen = this.src;
            const modalImagen = document.getElementById('modal-imagen');
            
            if (modalImagen) {
                document.getElementById('imagen-grande-src').src = srcImagen;
                modalImagen.style.display = 'flex';
            }
        });
    });
});

// Función para cerrar la vista previa de la imagen (Retroceder)
function cerrarImagenGrande() {
    const modalImagen = document.getElementById('modal-imagen');
    if (modalImagen) {
        modalImagen.style.display = 'none';
    }
}
// ------------------------------------------------------

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
        
        if (detallesDeEsteColor.length > 0) {
            pedidoDetalle += `*${colorNombre}*:\n  ${detallesDeEsteColor.join('\n  ')}\n\n`;
        }
    });
    
    if (totalPrendas === 0) {
        alert("Por favor, selecciona al menos 1 prenda y su talla para continuar.");
        return;
    }
    
    textoPedidoGlobal = `Hola ZYROX SPORT, deseo hacer un pedido del *Modelo Cinta*:\n📸 Foto de referencia: ${fotoModeloGeneral}\n\n${pedidoDetalle}*Total prendas:* ${totalPrendas}`;
    
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

// Cierre de modales al hacer clic en los fondos oscuros
window.onclick = function(event) {
    const modalWA = document.getElementById("modal-whatsapp");
    const modalImg = document.getElementById("modal-imagen");
    
    if (event.target == modalWA) {
        cerrarModalWA();
    }
    if (event.target == modalImg) {
        cerrarImagenGrande();
    }
}