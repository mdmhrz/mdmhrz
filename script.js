document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const detailsBtn = card.querySelector('button');
                detailsBtn.click();
            }
        });
        const detailsBtn = card.querySelector('button');
        detailsBtn.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;
            const projectDesc = card.querySelector('p').textContent;
            const technologies = Array.from(card.querySelectorAll('.flex-wrap span')).map(span => span.textContent);
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
            modal.innerHTML = `
                    <div class="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 transform transition-all">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold">${projectTitle}</h3>
                            <button class="text-gray-500 hover:text-gray-700">
                            <i class="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <img src="${card.querySelector('img').src}" class="w-full h-64 object-cover rounded-xl" alt="${projectTitle}">
                            <p class="text-gray-600">${projectDesc}</p>
                                <div class="flex flex-wrap gap-2">
                                    ${technologies.map(tech => `<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${tech}</span>`).join('')}
                                </div>
                            <div class="flex justify-between items-center mt-6 pt-6 border-t">
                                <a href="#" class="bg-primary text-white px-6 py-2 !rounded-button hover:bg-primary/90 transition-colors">Live Demo</a>
                                <a href="#" class="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                                    View Source <i class="ri-github-line"></i>
                                </a>
                            </div>
                        </div>
                    </div>
            `;
            document.body.appendChild(modal);
            modal.querySelector('button').addEventListener('click', () => {
                modal.remove();
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    const animateElements = document.querySelectorAll('.animate-fadeIn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const parent = bar.closest('.skill-item');
                const percentage = parent.querySelector('.text-primary').textContent.replace('%', '');
                bar.style.width = percentage + '%';
            }
        });
    }, {
        threshold: 0.2
    });
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0%';
        skillObserver.observe(bar);
    });
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
        successMessage.textContent = 'Message sent successfully!';
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        contactForm.reset();
    });
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log('Newsletter subscription:', email);
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg';
        successMessage.textContent = 'Successfully subscribed to newsletter!';
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        newsletterForm.reset();
    });
});
