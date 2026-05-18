

        // SCRIPT PARA EL LIGHTBOX Y ZOOM
        function abrirLightbox(src) {
            const lightbox = document.getElementById('image-lightbox');
            const img = document.getElementById('lightbox-img');
            img.src = src;
            img.classList.remove('zoomed'); // Resetea el zoom al abrir una nueva imagen
            lightbox.classList.add('active');
        }

        function cerrarLightbox() {
            document.getElementById('image-lightbox').classList.remove('active');
        }

        function toggleZoom(img) {
            img.classList.toggle('zoomed');
        }

