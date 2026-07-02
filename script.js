document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchGuest');
    if (!searchInput) return;

    searchInput.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase();
        const cards = document.querySelectorAll('.table-card');

        cards.forEach(card => {
            const guestList = card.getAttribute('data-guests').toLowerCase();
            const parentCol = card.parentElement;
            
            if (guestList.includes(filter)) {
                parentCol.style.display = "";
            } else {
                parentCol.style.display = "none";
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GENEROWANIE DANYCH TESTOWYCH (120 osób, po 8 na stolik)
    const imiona = ["Anna", "Piotr", "Katarzyna", "Michał", "Jan", "Małgorzata", "Tomasz", "Magdalena", "Krzysztof", "Barbara", "Andrzej", "Ewa"];
    const nazwiska = ["Nowak", "Kowalski", "Wiśniewski", "Wójcik", "Kowalczyk", "Kamiński", "Lewandowski", "Zieliński", "Szymański", "Dąbrowski"];

    const stoliki = {};
    let tableNumber = 1;
    let guestCount = 0;

    for (let i = 1; i <= 120; i++) {
        let losoweImie = imiona[Math.floor(Math.random() * imiona.length)];
        let losoweNazwisko = nazwiska[Math.floor(Math.random() * nazwiska.length)];
        let pelneImie = `${losoweImie} ${losoweNazwisko} (Gość ${i})`;

        if (!stoliki[tableNumber]) {
            stoliki[tableNumber] = [];
        }
        
        stoliki[tableNumber].push(pelneImie);
        guestCount++;

        // Przeskok na kolejny stolik co 8 osób
        if (guestCount === 8) {
            tableNumber++;
            guestCount = 0;
        }
    }

    // 2. RENDEROWANIE IKONEK STOLIKÓW Z DYMKAMI
    const hallGrid = document.getElementById('hallGrid');
    if (!hallGrid) return;

    for (const [nr, goscie] of Object.entries(stoliki)) {
        // Tworzymy HTML dla listy gości w dymku
        const listItemsHTML = goscie.map(g => `<li>${g}</li>`).join('');

        // Generujemy cały element: Wrapper -> Ikona stolika + Tooltip
        const tableHTML = `
            <div class="table-wrapper">
                <div class="table-icon" id="stolik-${nr}" data-table="${nr}">
                    ${nr}
                </div>
                <div class="guests-tooltip">
                    <div class="tooltip-title">Stolik ${nr}</div>
                    <ul class="guests-list">
                        ${listItemsHTML}
                    </ul>
                </div>
            </div>
        `;
        
        hallGrid.innerHTML += tableHTML;
    }

    // 3. LOGIKA WYSZUKIWARKI (PODŚWIETLANIE)
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const szukanaFraza = e.target.value.toLowerCase().trim();
            
            // Czyszczenie poprzednich podświetleń
            document.querySelectorAll('.table-icon').forEach(icon => {
                icon.classList.remove('glow');
            });

            // Jeśli pole jest puste, kończymy działanie
            if (szukanaFraza === "") return;

            // Szukanie i podświetlanie odpowiednich stolików
            for (const [nr, goscie] of Object.entries(stoliki)) {
                // Sprawdzamy, czy w danym stoliku jest ktoś pasujący do wyszukiwania
                const czyKtosPasuje = goscie.some(g => g.toLowerCase().includes(szukanaFraza));
                
                if (czyKtosPasuje) {
                    const foundTableIcon = document.getElementById(`stolik-${nr}`);
                    if (foundTableIcon) {
                        foundTableIcon.classList.add('glow');
                    }
                }
            }
        });
    }
});