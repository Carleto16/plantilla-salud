document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
    document.addEventListener('click', (e) => { if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) navLinks.classList.remove('active'); });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight, behavior: 'smooth' });
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop - 100 && scrollPos < section.offsetTop + section.offsetHeight) {
                navItems.forEach(item => item.classList.toggle('active', item.getAttribute('href') === `#${section.id}`));
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('active'); i.querySelector('.faq-answer').style.maxHeight = null; });
            if (!isActive) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
        });
    });

    // Form
    const form = document.getElementById('bookingForm');
    if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = form.querySelector('#nombre').value.trim();
        const telefono = form.querySelector('#telefono').value.trim();
        const servicio = form.querySelector('#servicio').value;
        if (!nombre || !telefono || !servicio) { alert('Completa los campos obligatorios.'); return; }
        window.open(`https://wa.me/34600000000?text=${encodeURIComponent(`Hola, quiero pedir cita.\nNombre: ${nombre}\nTeléfono: ${telefono}\nServicio: ${servicio}`)}`, '_blank');
        form.reset();
    });
});
