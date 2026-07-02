// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgb(255, 255, 255)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Image Modal Functionality
    class ImageModal {
        constructor() {
            this.modal = document.getElementById('imageModal');
            this.modalImage = document.getElementById('modalImage');
            this.modalCaption = document.getElementById('modalCaption');
            this.closeBtn = this.modal ? this.modal.querySelector('.modal-close') : null;
            this.prevBtn = this.modal ? this.modal.querySelector('.modal-prev') : null;
            this.nextBtn = this.modal ? this.modal.querySelector('.modal-next') : null;
            this.galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
            this.currentIndex = 0;
            
            this.init();
        }
        
        init() {
            // Add click event to all gallery images
            this.galleryImages.forEach((img, index) => {
                img.addEventListener('click', (e) => {
                    this.openModal(e.target);
                });
                
                // Add keyboard support
                img.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.openModal(e.target);
                    }
                });
            });
            
            // Add click event to all gallery items (for the entire card)
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    // Find the image within this gallery item
                    const img = item.querySelector('.gallery-image');
                    if (img) {
                        this.openModal(img);
                    }
                });
                
                // Add keyboard support for gallery items
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const img = item.querySelector('.gallery-image');
                        if (img) {
                            this.openModal(img);
                        }
                    }
                });
            });
            
            // Close modal events
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => {
                    this.closeModal();
                });
            }
            
            // Prev / Next button events
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showPrevImage();
                });
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showNextImage();
                });
            }
            
            // Close on background click
            if (this.modal) {
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) {
                        this.closeModal();
                    }
                });
            }
            
            // Keyboard events (Close on ESC, Navigate on Arrows)
            document.addEventListener('keydown', (e) => {
                if (this.modal && this.modal.classList.contains('show')) {
                    if (e.key === 'Escape') this.closeModal();
                    if (e.key === 'ArrowLeft') this.showPrevImage();
                    if (e.key === 'ArrowRight') this.showNextImage();
                }
            });
        }
        
        openModal(img) {
            if (!this.modal || !this.modalImage || !this.modalCaption) return;
            
            this.currentIndex = this.galleryImages.indexOf(img);
            this.updateModalContent();
            
            // Show modal with animation
            this.modal.style.display = 'block';
            setTimeout(() => {
                this.modal.classList.add('show');
            }, 10);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus management
            if (this.closeBtn) {
                this.closeBtn.focus();
            }
        }
        
        updateModalContent() {
            if (this.currentIndex < 0 || this.currentIndex >= this.galleryImages.length) return;
            const img = this.galleryImages[this.currentIndex];
            const src = img.src;
            const caption = img.dataset.caption || img.alt;
            
            this.modalImage.src = src;
            this.modalCaption.textContent = caption;
        }

        showPrevImage() {
            if (this.galleryImages.length === 0) return;
            this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
            this.updateModalContent();
        }

        showNextImage() {
            if (this.galleryImages.length === 0) return;
            this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
            this.updateModalContent();
        }
        
        closeModal() {
            if (!this.modal) return;
            
            this.modal.classList.remove('show');
            
            setTimeout(() => {
                this.modal.style.display = 'none';
                if (this.modalImage) this.modalImage.src = '';
                if (this.modalCaption) this.modalCaption.textContent = '';
                
                // Restore body scroll
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Initialize Image Modal
    new ImageModal();

    // Partner Modal Functionality
    const partnerModal = document.getElementById('partnerModal');
    const partnerModalTitle = document.getElementById('partnerModalTitle');
    const partnerModalDesc = document.getElementById('partnerModalDesc');
    const partnerCloseBtn = document.querySelector('.partner-close');
    const sliderTrack = document.querySelector('.slider-track');

    if (partnerModal && sliderTrack) {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.addEventListener('click', () => {
                const partnerName = slide.getAttribute('data-name');
                const partnerDesc = slide.getAttribute('data-desc');
                
                if (partnerName && partnerDesc) {
                    partnerModalTitle.textContent = partnerName;
                    partnerModalDesc.textContent = partnerDesc;
                    
                    partnerModal.style.display = 'block';
                    setTimeout(() => partnerModal.classList.add('show'), 10);
                    
                    sliderTrack.classList.add('paused');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closePartnerModal = () => {
            partnerModal.classList.remove('show');
            setTimeout(() => {
                partnerModal.style.display = 'none';
                sliderTrack.classList.remove('paused');
                document.body.style.overflow = '';
            }, 300);
        };

        if (partnerCloseBtn) {
            partnerCloseBtn.addEventListener('click', closePartnerModal);
        }
        
        partnerModal.addEventListener('click', (e) => {
            if (e.target === partnerModal) {
                closePartnerModal();
            }
        });
    }

    console.log('ProjeBilgi website loaded successfully!');
});

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}