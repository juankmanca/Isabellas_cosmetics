document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Funcionalidad Menú Hamburguesa
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // ==========================================
    // Carruseles de Servicios (Soporte Múltiple)
    // ==========================================
    const carousels = document.querySelectorAll('.carousel-wrapper');
    
    carousels.forEach((carousel, index) => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next-btn');
        const prevButton = carousel.querySelector('.prev-btn');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        let currentIndex = 0;
        let slidesPerView = getSlidesPerView();

        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        let isTransitioning = false;

        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        if(nextButton) {
            nextButton.addEventListener('click', () => {
                if (isTransitioning) return;
                isTransitioning = true;
                
                const slideWidthPercentage = 100 / slidesPerView;
                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = `translateX(-${slideWidthPercentage}%)`;
                
                track.addEventListener('transitionend', function handleNextEnd() {
                    track.removeEventListener('transitionend', handleNextEnd);
                    // Move the first element to the end
                    track.appendChild(track.firstElementChild);
                    
                    // Reset transform without animation
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    
                    // Small timeout to ensure browser paints before allowing next click
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 50);
                });
            });
        }

        if(prevButton) {
            prevButton.addEventListener('click', () => {
                if (isTransitioning) return;
                isTransitioning = true;
                
                // Move the last element to the beginning
                track.prepend(track.lastElementChild);
                
                // Immediately shift track to the left without animation
                const slideWidthPercentage = 100 / slidesPerView;
                track.style.transition = 'none';
                track.style.transform = `translateX(-${slideWidthPercentage}%)`;
                
                // Force browser reflow to apply the non-animated transform
                void track.offsetWidth;
                
                // Animate back to 0
                track.style.transition = 'transform 0.4s ease-in-out';
                track.style.transform = 'translateX(0)';
                
                track.addEventListener('transitionend', function handlePrevEnd() {
                    track.removeEventListener('transitionend', handlePrevEnd);
                    setTimeout(() => {
                        isTransitioning = false;
                    }, 50);
                });
            });
        }

        // Recalcular al redimensionar ventana
        window.addEventListener('resize', () => {
            slidesPerView = getSlidesPerView();
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
        });
        
        // Remove dots container if it exists since infinite loop changes DOM order
        if(dotsContainer) {
            dotsContainer.style.display = 'none';
        }
    });

    // ==========================================
    // Lightbox para Testimonios (WhatsApp)
    // ==========================================
    window.openLightbox = function(element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const img = element.querySelector('img');
        
        if (lightbox && lightboxImg && img) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    };

    // ==========================================
    // Envío de Formulario a WhatsApp
    // ==========================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const privacyCheckbox = document.getElementById('privacy-policy');
            if (!privacyCheckbox.checked) {
                alert('Por favor, acepta la política de tratamiento de datos para continuar.');
                return;
            }

            const nombre = contactForm.querySelector('input[name="nombre"]').value;
            const celular = contactForm.querySelector('input[name="celular"]').value;
            const servicio = contactForm.querySelector('select[name="servicio"]').value;
            const mensaje = contactForm.querySelector('textarea[name="mensaje"]').value;

            // Formatear texto con asteriscos para negritas y %0A para saltos de línea
            const text = `¡Hola Isa Bellas! Mi nombre es *${nombre}* y quiero agendar una cita.%0A*Servicio:* ${servicio}%0A*Celular:* ${celular}%0A*Mensaje:* ${mensaje}`;
            
            const btnSubmit = contactForm.querySelector('.btn-submit');
            const originalText = btnSubmit.innerText;
            
            // Efecto de carga visual
            btnSubmit.innerText = 'Conectando...';
            btnSubmit.style.opacity = '0.7';

            setTimeout(() => {
                window.open(`https://wa.me/573003659639?text=${text}`, '_blank');
                // Restaurar botón
                btnSubmit.innerText = originalText;
                btnSubmit.style.opacity = '1';
                // Opcional: resetear el formulario
                contactForm.reset();
            }, 800);
        });
    }

    // Cerrar lightbox al hacer clic fuera de la imagen
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.addEventListener('click', function(e) {
            if(e.target === this) {
                window.closeLightbox();
            }
        });
    }
});
