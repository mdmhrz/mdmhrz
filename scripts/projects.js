document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('projectModal');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const viewDetailsBtn = card.querySelector('button');
        viewDetailsBtn.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('img').src;
            const technologies = Array.from(card.querySelectorAll('.flex-wrap span')).map(span => span.textContent);

            modal.querySelector('h3').textContent = title;
            modal.querySelector('img').src = image;
            modal.querySelector('img').alt = title;
            modal.querySelector('p').textContent = description;

            const techContainer = modal.querySelector('.technologies');
            techContainer.innerHTML = technologies.map(tech =>
                `<span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${tech}</span>`
            ).join('');

            const featuresContainer = modal.querySelector('.features');
            featuresContainer.innerHTML = [
                'User Authentication & Authorization',
                'Real-time Data Updates',
                'Responsive Design',
                'Performance Optimization',
                'API Integration',
                'Data Analytics'
            ].map(feature => `
                        <li class="flex items-center gap-2">
                        <i class="ri-checkbox-circle-line text-primary"></i>
                        <span class="text-gray-600">${feature}</span>
                        </li>
                        `).join('');

            const galleryContainer = modal.querySelector('.gallery');
            galleryContainer.innerHTML = Array(4).fill(0).map(() => `
                        <img src="${image}" class="w-full h-48 object-cover rounded-lg" alt="${title}">
                        `).join('');

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    modal.querySelector('button').addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    const filterButtons = document.querySelectorAll('[class*="px-6 py-2"]');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            button.classList.remove('bg-white', 'text-gray-700');
            button.classList.add('bg-primary', 'text-white');
        });
    });

    const searchInput = document.querySelector('input[type="text"]');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.flex-wrap span')).map(span => span.textContent.toLowerCase());
            const shouldShow = title.includes(searchTerm) || description.includes(searchTerm) || technologies.some(tech => tech.includes(searchTerm));
            card.style.display = shouldShow ? 'block' : 'none';
        });
    });
});
