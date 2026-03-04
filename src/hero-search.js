import { db } from './supabaseClient.js';
document.addEventListener("DOMContentLoaded", () => {
    let debounceTimer;

    // Cache pentru date ca să nu apelăm DB la fiecare literă după ce le avem deja
    const cache = {
        categorii: null,
        localitati: null
    };

    function removeDiacritics(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // --- FUNCȚIE CARE IA TOATE DATELE O SINGURĂ DATĂ SAU DIN CACHE ---
    async function getAllData(tableName, columnName) {
        if (cache[tableName]) return cache[tableName];

        try {
            const { data, error } = await db.from(tableName).select(columnName);
            if (error) throw error;
            
            cache[tableName] = data.map(item => item[columnName]);
            return cache[tableName];
        } catch (err) {
            console.error(`Eroare la încărcarea tabelului ${tableName}:`, err);
            return [];
        }
    }

    // --- FUNCȚIE CĂUTARE INTELIGENTĂ (CLIENT-SIDE) ---
    async function searchSmart(tableName, columnName, query) {
        const allItems = await getAllData(tableName, columnName);
        const cleanQuery = removeDiacritics(query.toLowerCase());

        const startsWith = [];
        const contains = [];

        allItems.forEach(item => {
            const cleanItem = removeDiacritics(item.toLowerCase());
            
            if (cleanItem.startsWith(cleanQuery)) {
                startsWith.push(item);
            } else if (cleanItem.includes(cleanQuery)) {
                contains.push(item);
            }
        });

        startsWith.sort((a, b) => a.localeCompare(b, 'ro'));
        contains.sort((a, b) => a.localeCompare(b, 'ro'));

        return [...startsWith, ...contains].slice(0, 8);
    }

    function setupSearch(inputId, listId, tableName, columnName) {
        const input = document.getElementById(inputId);
        const list = document.getElementById(listId);

        if (!input || !list) return;

        input.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            const val = input.value.trim();

            if (val.length < 2) {
                list.classList.remove("active");
                return;
            }

            debounceTimer = setTimeout(async () => {
                const results = await searchSmart(tableName, columnName, val);
                renderResults(results, input, list);
            }, 100); // Mult mai rapid pentru că datele sunt deja în memorie
        });

        input.addEventListener("blur", () => {
            setTimeout(() => list.classList.remove("active"), 200);
        });
    }

    function renderResults(results, input, list) {
        list.innerHTML = "";
        if (results.length > 0) {
            [...new Set(results)].forEach(text => {
                const div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.textContent = text;
                div.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    input.value = text;
                    list.classList.remove("active");
                });
                list.appendChild(div);
            });
            list.classList.add("active");
        } else {
            list.classList.remove("active");
        }
    }

    setupSearch("input-domeniu", "suggestions-domeniu", "categorii", "sub");
    setupSearch("input-localitate", "suggestions-localitate", "localitati", "nume");
});