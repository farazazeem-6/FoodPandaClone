// Safe Load HTML Components (only if element exists)
function safeLoadHTML(id, file) {
    const element = document.getElementById(id);
    if (element) {
        return fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`❌ Failed to load ${file} (status: ${response.status})`);
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;
            });
    } else {
        return Promise.resolve(); // Skip loading if the ID doesn't exist
    }
}

// Array of City Data

const citiesData = [
    { name: "Islamabad", image: "/Images/Islamabad.webp" },
    { name: "Karachi", image: "/Images/Karachi.webp" },
    { name: "Lahore", image: "/Images/Lahore.webp" },
    { name: "Faisalabad", image: "/Images/Faisalabad.webp" },
    { name: "Rawalpindi", image: "/Images/Rawalpindi.webp" },
    { name: "Abottabad", image: "/Images/city-tile-Abottabad.webp" },
    { name: "Bahawalpur", image: "/Images/city-tile-Bahawalpur.webp" },
    { name: "DeraGhaziKhan", image: "/Images/city-tile-DeraGhaziKhan.jpg" },
    { name: "Gujranwala", image: "/Images/city-tile-Gujranwala.jpg" },
    { name: "Gujrat", image: "/Images/city-tile-Gujrat.jpg.webp" },
    { name: "Hyderabad", image: "/Images/Hyderabad.webp" },
    { name: "Jhelum", image: "/Images/city-tile-Jhelum.webp" },
    { name: "Kamoke", image: "/Images/city-tile-Kamoke.webp" },
    { name: "Larkana", image: "/Images/city-tile-Larkana.jpg" },
    { name: "Mangla", image: "/Images/city-tile-Mangla.jpg" },
    { name: "Mardan", image: "/Images/city-tile-Mardan.webp" },
    { name: "Multan", image: "/Images/Multan.webp" },
    { name: "Murree", image: "/Images/city-tile-Murree.webp" },
    { name: "Okara", image: "/Images/city-tile-Okara.webp" },
    { name: "PanoAqil", image: "/Images/city-tile-PanoAqil.jpg" },
    { name: "Peshawar", image: "/Images/Peshawar.webp" },
    { name: "Quetta", image: "/Images/city-tile-Quetta.jpg" },
    { name: "RahimYarKhan", image: "/Images/city-tile-RahimYarKhan.webp" },
    { name: "Sadiqabad", image: "/Images/city-tile-Sadiqabad.jpg" },
    { name: "Sahiwal", image: "/Images/city-tile-Sahiwal.webp" },
    { name: "Sarghoda", image: "/Images/city-tile-Sargodha.jpg" },
    { name: "Sheikhupura", image: "/Images/city-tile-Sheikhupura.jpg.webp" },
    { name: "Sialkot", image: "/Images/Sialkot.webp" },
    { name: "Wahh Cannt", image: "/Images/city-tile-WahhCannt.jpg" },
];

// Generate City Boxes
function generateCityBoxes() {
    const container = document.getElementById("cities-container");
    if (!container) return;

    citiesData.forEach(city => {
        const anchor = document.createElement("a");
        anchor.href = "product.html";

        const box = document.createElement("div");
        box.className = "city-box";

        const img = document.createElement("img");
        img.src = city.image;
        img.alt = city.name;

        const span = document.createElement("span");
        span.textContent = city.name;

        box.appendChild(img);
        box.appendChild(span);
        anchor.appendChild(box);
        container.appendChild(anchor);
    });
}

// Load all available components
Promise.all([
    safeLoadHTML("header-placeholder", "header.html"),
    safeLoadHTML("login-model-form-placeholder", "login-form.html"),
    safeLoadHTML("home-section-placeholder", "home-section.html"),
    safeLoadHTML("hero-1-section-placeholder", "hero-1-section.html"),
    safeLoadHTML("city-section-placeholder", "city-section.html"),
    safeLoadHTML("mobile-section-placeholder", "mobile-section.html"),
    safeLoadHTML("hero-2-section-placeholder", "hero-2-section.html"),
    safeLoadHTML("major-text-section-placeholder", "major-text.html"),
    safeLoadHTML("country-links-section-placeholder", "country-links.html"),
    safeLoadHTML("footer-section-placeholder", "footer.html"),
    safeLoadHTML("last-footer-section-placeholder", "last-footer.html")
]).then(() => {
    generateCityBoxes();

    // Modal Logic
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const userIconMobile = document.querySelector('.user-icon-mobile');
    const modalContainer = document.querySelector('.modal-container');
    const modalOverlay = document.getElementById('dim-bg-overlay-modal');
    const modalCloseBtn = document.querySelector('.cross-btn img');

    function showLoginModal() {
        modalContainer?.classList.add('modal-form-visible');
        modalOverlay?.classList.add('modal-dim-visible');
        document.body.classList.add('body-modal-lock');
    }

    function hideLoginModal() {
        modalContainer?.classList.remove('modal-form-visible');
        modalOverlay?.classList.remove('modal-dim-visible');
        document.body.classList.remove('body-modal-lock');
    }

    loginBtn?.addEventListener('click', showLoginModal);
    signupBtn?.addEventListener('click', showLoginModal);
    userIconMobile?.addEventListener('click', e => {
        e.preventDefault();
        showLoginModal();
    });

    modalOverlay?.addEventListener('click', hideLoginModal);
    modalCloseBtn?.addEventListener('click', hideLoginModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') hideLoginModal();
    });

    // Dropdown Logic
    const dropdownToggle = document.getElementById('dropdown-icons');
    const dropdown = document.getElementById('dropdown');
    const chevron = document.querySelector('.chevron-down-icon i');
    const overlay = document.getElementById('overlay');

    function closeDropdown() {
        dropdown.style.display = 'none';
        overlay?.classList.remove('active');
        chevron?.classList.remove('chevron-rotate');
        document.body.classList.remove('no-scroll');
    }

    dropdownToggle?.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = dropdown?.style.display === 'block';

        if (dropdown) dropdown.style.display = isOpen ? 'none' : 'block';
        overlay?.classList.toggle('active', !isOpen);
        chevron?.classList.toggle('chevron-rotate', !isOpen);
        document.body.classList.toggle('no-scroll', !isOpen);
    });

    document.addEventListener('click', e => {
        if (!dropdown?.contains(e.target) && !dropdownToggle?.contains(e.target)) {
            closeDropdown();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDropdown();
    });

    // Language Toggle
    const engBtn = document.querySelector('.Eng');
    const urduBtn = document.querySelector('.Urdu');
    const allH1 = document.querySelectorAll('h1');

    urduBtn?.addEventListener('click', () => {
        allH1.forEach(h1 => {
            h1.textContent = h1.getAttribute('data-ur');
        });
        closeDropdown();
    });

    engBtn?.addEventListener('click', () => {
        allH1.forEach(h1 => {
            h1.textContent = h1.getAttribute('data-en');
        });
        closeDropdown();
    });
});


