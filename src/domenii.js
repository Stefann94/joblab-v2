import { db } from './supabaseClient.js';
document.addEventListener("DOMContentLoaded", async () => {
    const domainsContainer = document.getElementById("domains-container");

    // 1. Funcția care descarcă datele din Supabase
    async function fetchCategorii() {
        try {
            const { data, error } = await db
                .from('categorii')
                .select('*')
                .order('count', { ascending: false }); // Le punem pe cele mai populare primele

            if (error) throw error;

            if (data) {
                renderCategorii(data);
            }
        } catch (error) {
            console.error("Eroare la încărcarea categoriilor:", error.message);
            domainsContainer.innerHTML = "<p>Nu am putut încărca domeniile momentan.</p>";
        }
    }

    // 2. Funcția care generează HTML-ul pentru fiecare card
    function renderCategorii(categorii) {
        // Curățăm containerul (ștergem cardurile demo din HTML)
        domainsContainer.innerHTML = "";

        categorii.forEach(cat => {
            const card = document.createElement("div");
            card.classList.add("domain-card");

card.innerHTML = `
    <div class="dial-outer">
        <div class="dial-ticks"></div>
        <div class="dial-core">
            <img src="${cat.img}" alt="${cat.sub}" class="dial-img">
            <div class="dial-overlay"></div>
            <div class="dial-content">
                <h3 class="dial-title">${cat.sub}</h3>
            </div>
        </div>
        <div class="dial-stats">
            <span class="dial-number">${cat.count} POSIBILITĂȚI</span>
        </div>
    </div>
`;

            // Opțional: Adăugăm un eveniment de click pentru filtrare viitoare
            card.addEventListener('click', () => {
                console.log(`Ai ales categoria: ${cat.main}`);
                // Aici vei pune logica de redirecționare către pagina de rezultate
            });

            domainsContainer.appendChild(card);
        });
    }

    // Pornim procesul
    fetchCategorii();
});