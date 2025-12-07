document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling untuk Navigasi ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Intersection Observer untuk Animasi Scroll & Highlight Nav ---
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger animasi saat 20% section terlihat
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class 'show' untuk animasi
                entry.target.classList.add('show');

                // Highlight navigasi aktif
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });

                // Animasi Skill Bar khusus untuk section skills
                if (entry.target.getAttribute('id') === 'skills') {
                    animateSkillBars();
                }
                
                // Hentikan observasi setelah animasi di-trigger untuk performa
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observasi semua section yang memerlukan animasi
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => {
        el.classList.add('hidden'); // Tambahkan class hidden untuk state awal
        observer.observe(el);
    });
    
    // Observasi section untuk highlight nav
    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Fungsi untuk Animasi Skill Bar ---
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            // Pastikan animasi hanya berjalan sekali
            if (bar.style.width === '') {
                setTimeout(() => {
                    bar.style.width = width;
                }, 200); // Sedikit delay untuk efek yang lebih halus
            }
        });
    }

    // --- Handler untuk Form Kontak (Placeholder) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim.');
            // Di sini kamu bisa menambahkan logika untuk mengirim data ke server
            this.reset();
        });
    }
});