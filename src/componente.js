const UI = {
    icons: {
        sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
        moon: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
    },

    navbar: (theme) => {
        const icon = theme === 'dark' ? UI.icons.sun : UI.icons.moon;
        return `
        <header class="main-header">
            <div class="nav-content">
                <div class="brand-id">JOB_LAB</div>
                <nav>
                    <ul class="nav-links">
                        <li><a href="#" class="nav-item">Acasă</a></li>
                        <li><a href="#" class="nav-item">Servicii</a></li>
                        <li><a href="#" class="nav-item">Clienți</a></li>
                        <li><a href="#" class="nav-item">Favorite</a></li>
                        <li><a href="#" class="nav-item">Mesaje</a></li>
                        <li><a href="#" class="nav-item">Profil</a></li>
                    </ul>
                </nav>
                <button onclick="app.toggleTheme()" class="mode-switch" id="theme-icon-container">
                    ${icon}
                </button>
            </div>
        </header>`;
    },

    footer: () => `
        <footer class="main-footer">
            <div class="footer-grid">
                <div class="footer-section brand-info">
                    <div class="brand-id">JOB_LAB</div>
                    <p>Platformă industrială pentru resurse umane.</p>
                </div>
                <div class="footer-section">
                    <h4>Navigare</h4>
                    <a href="#">Proiecte</a>
                    <a href="#">Freelancers</a>
                    <a href="#">Companii</a>
                </div>
                <div class="footer-section">
                    <h4>Suport</h4>
                    <a href="#">Documentație</a>
                    <a href="#">Termeni</a>
                    <a href="#">Contact</a>
                </div>
                <div class="footer-section">
                    <h4>Status</h4>
                    <div class="status-tag">SYSTEM_ONLINE</div>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2026 JOB_LAB_MODULE</span>
                <span>UTC+2_OPERATIONAL</span>
            </div>
        </footer>`
};

const app = {
    
    init: () => {
        // Schimbăm 'dark' cu 'light' ca valoare default
        const currentTheme = localStorage.getItem('sys-theme') || 'light';
        const navRoot = document.getElementById('navbar-placeholder');
        const footRoot = document.getElementById('footer-placeholder');
        
        // Dacă tema este dark, aplicăm clasa, dacă e light, ne asigurăm că e scoasă
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        if (navRoot) navRoot.innerHTML = UI.navbar(currentTheme);
        if (footRoot) footRoot.innerHTML = UI.footer();
    },

    toggleTheme: () => {
        const isDark = document.body.classList.toggle('dark-mode');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('sys-theme', newTheme);
        
        const btn = document.getElementById('theme-icon-container');
        if (btn) {
            // Dacă e acum Dark, arătăm Soarele (pentru a trece la Light)
            // Dacă e acum Light, arătăm Luna (pentru a trece la Dark)
            btn.innerHTML = isDark ? UI.icons.sun : UI.icons.moon;
        }
    }
};

window.app = app;

document.addEventListener('DOMContentLoaded', app.init);