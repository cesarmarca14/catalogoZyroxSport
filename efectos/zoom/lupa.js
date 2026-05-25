// --- LÓGICA PARA AGRANDAR LA IMAGEN (VISTA PREVIA) ---

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

// Cierre al hacer clic en el fondo oscuro fuera de la foto
window.addEventListener('click', function(event) {
    const modalImg = document.getElementById("modal-imagen");
    if (event.target == modalImg) {
        cerrarImagenGrande();
    }
});