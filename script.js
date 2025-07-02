document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    function getPreferredTheme() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        return 'light';
    }

    setTheme(getPreferredTheme());

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(body.classList.contains('dark-mode') ? 'light' : 'dark');
        });
    }

    // Hamburger Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('expanded');
        });
    }

    // Scroll-triggered animations
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Google Sheets Contact Form Submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = "Sending...";

            const formData = new FormData(form);

            fetch('https://script.google.com/macros/s/AKfycbzdAa1D75wIh7EljTkPnO-7Ut3EIldN95hu_SSJGLzX0nS_X9Imy_7aS8sl8--Lg89u/exec', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(() => {
                formStatus.textContent = "Message sent successfully!";
                form.reset();
            })
            .catch(error => {
                formStatus.textContent = "Error! Try again.";
                console.error('Error!', error.message);
            });
        });
    }
});
