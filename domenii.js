document.addEventListener("DOMContentLoaded", () => {
    const categorii = [
        {
            main: "ENGINEERING",
            sub: "MESERII TEHNICE",
            img: "https://images.unsplash.com/photo-1581092120530-66a8e351843b?q=80&w=800",
            count: 124
        },
        {
            main: "PRODUCTION",
            sub: "INDUSTRIE GREA",
            img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800",
            count: 89
        },
        {
            main: "CYBER_CORE",
            sub: "TECH & SOFTWARE",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
            count: 56
        },
        {
            main: "LOGISTICS",
            sub: "SUPPLY CHAIN",
            img: "https://images.unsplash.com/photo-1580674271108-033faff74831?q=80&w=800",
            count: 72
        },
        {
            main: "CHEF_LAB",
            sub: "GASTRONOMIE",
            img: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=800",
            count: 45
        },
        {
            main: "STRUCTURE",
            sub: "CONSTRUCȚII",
            img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
            count: 93
        }
    ];

    const container = document.getElementById('domains-container');

    if (container) {
        container.innerHTML = ""; 

        categorii.forEach((cat, index) => {
            const card = document.createElement('div');
            card.className = 'domain-card';
            // Adăugăm un mic delay pentru fiecare card ca să apară pe rând
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            
            card.innerHTML = `
                <div class="domain-shape">
                    <img src="${cat.img}" alt="${cat.main}">
                    <div class="domain-overlay"></div>
                    <h3 class="domain-title">
                        ${cat.main}
                        <span class="accent-text">${cat.sub}</span>
                    </h3>
                </div>
                <div class="domain-footer">
                    <span>${cat.count} UNITS_AVAILABLE</span>
                </div>
            `;

            container.appendChild(card);

            // Trigger animație de intrare
            setTimeout(() => {
                card.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 100 * index);
        });
    }
});