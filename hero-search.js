document.addEventListener("DOMContentLoaded", () => {
    /* --- LISTĂ DOMENII (TOT SPECTRUL) --- */
    const domenii = [
        "Bucătar / Ajutor bucătar", "Chelner / Ospătar", "Barman", "Cofetar / Patiser",
        "Curățenie / Housekeeping", "Pază și Protecție", "Curier / Livrator",
        "Șofer (B / C / E)", "Șofer Transport Persoane", "Mecanic Auto", 
        "Tinichigiu / Vopsitor", "Operator Logistică", "Stivuitorist", "Gestionar",
        "Software Developer (Java/JS/C#)", "Frontend / Backend Developer", 
        "IT Support / Helpdesk", "Graphic Designer", "Social Media Manager",
        "Data Analyst", "Tester (QA)", "Cybersecurity",
        "Zidar / Zugrav", "Instalator", "Electrician Construcții", 
        "Dulgher / Fierar", "Montator Geamuri/Termopan", "Lacatuș",
        "Inginerie Mecanică", "Inginerie Electrică", "Inginerie Automatizări",
        "Management Producție", "Quality Control", "Sudură Industrială",
        "Tehnician Mentenanță", "Operator CNC", "Electromecanică",
        "Vânzător / Lucrător Comercial", "Casier", "Agent Vânzări", 
        "Call Center / Suport Clienți", "Secretariat / Administrativ",
        "Contabilitate / Finanțe", "Resurse Umane (HR)", "Marketing & PR",
        "Asistent Medical", "Medic", "Farmacist", "Îngrijitor bătrâni",
        "Profesor / Educator", "Trainer / Formator"
    ];

    /* --- LISTĂ JUDEȚE ȘI ORAȘE PRINCIPALE --- */
    const localitati = [
        // JUDEȚE
        "Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", "Botoșani", "Brăila", "Brașov", "Buzău", 
        "Călărași", "Caraș-Severin", "Cluj", "Constanța", "Covasna", "Dâmbovița", "Dolj", "Galați", "Giurgiu", 
        "Gorj", "Harghita", "Hunedoara", "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", 
        "Olt", "Prahova", "Sălaj", "Satu Mare", "Sibiu", "Suceava", "Teleorman", "Timiș", "Tulcea", "Vâlcea", 
        "Vaslui", "Vrancea", "București",

        // ORAȘE PRINCIPALE (REȘEDINȚE)
        "Alba Iulia", "Arad", "Pitești", "Bacău", "Oradea", "Bistrița", "Botoșani", "Brăila", "Brașov", "Buzău", 
        "Călărași", "Reșița", "Cluj-Napoca", "Constanța", "Sfântu Gheorghe", "Târgoviște", "Craiova", "Galați", 
        "Giurgiu", "Târgu Jiu", "Miercurea Ciuc", "Deva", "Slobozia", "Iași", "Baia Mare", "Drobeta-Turnu Severin", 
        "Târgu Mureș", "Piatra Neamț", "Slatina", "Ploiești", "Zalău", "Satu Mare", "Sibiu", "Suceava", "Alexandria", 
        "Timișoara", "Tulcea", "Râmnicu Vâlcea", "Vaslui", "Focșani"
    ];

    /* --- LOGICĂ NORMALIZARE DIACRITICE --- */
    function normalizeString(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    function setupSuggestions(inputId, listId, data) {
        const input = document.getElementById(inputId);
        const list = document.getElementById(listId);

        if (!input || !list) return;

        input.addEventListener("input", () => {
            const rawVal = input.value;
            const searchVal = normalizeString(rawVal);
            list.innerHTML = "";

            if (searchVal.length < 2) {
                list.classList.remove("active");
                return;
            }

            // Filtrare: eliminăm duplicatele (județ vs oraș cu același nume) și sortăm
            const filtered = [...new Set(data)]
                .filter(item => normalizeString(item).includes(searchVal))
                .sort((a, b) => a.localeCompare(b, 'ro'))
                .slice(0, 8); // Limităm la 8 rezultate pentru aspect compact

            if (filtered.length === 0) {
                list.classList.remove("active");
                return;
            }

            filtered.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.textContent = item;

                div.addEventListener("mousedown", (e) => {
                    input.value = item;
                    list.classList.remove("active");
                });

                list.appendChild(div);
            });

            list.classList.add("active");
        });

        input.addEventListener("focus", () => {
            if (input.value.length >= 2) list.classList.add("active");
        });

        input.addEventListener("blur", () => {
            setTimeout(() => list.classList.remove("active"), 200);
        });
    }

    /* --- INIȚIALIZARE --- */
    setupSuggestions("input-domeniu", "suggestions-domeniu", domenii);
    setupSuggestions("input-localitate", "suggestions-localitate", localitati);
});