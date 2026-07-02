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

        if (guestCount === 8) {
            tableNumber++;
            guestCount = 0;
        }
    }

    // 2. WSPÓŁRZĘDNE NA MAPIE (15 STOLIKÓW) 
    const wspolrzedneStolikow = [
        { top: '12%', left: '50%' }, // 1
        { top: '22%', left: '20%' }, // 2
        { top: '22%', left: '80%' }, // 3
        { top: '45%', left: '15%' }, // 4
        { top: '45%', left: '85%' }, // 5
        { top: '70%', left: '15%' }, // 6
        { top: '70%', left: '85%' }, // 7
        { top: '88%', left: '25%' }, // 8
        { top: '88%', left: '75%' }, // 9
        { top: '88%', left: '50%' }, // 10
        { top: '45%', left: '32%' }, // 11
        { top: '45%', left: '68%' }, // 12
        { top: '68%', left: '32%' }, // 13
        { top: '68%', left: '68%' }, // 14
        { top: '25%', left: '35%' }  // 15
    ];

    // 3. RENDEROWANIE MAPY SALI Z IKONKAMI
    const hallMap = document.getElementById('hallMap');
    if (!hallMap) return;

    for (const [nr, goscie] of Object.entries(stoliki)) {
        const listItemsHTML = goscie.map(g => `<li>${g}</li>`).join('');
        const coords = wspolrzedneStolikow[nr - 1] || { top: '50%', left: '50%' };

        const tableHTML = `
            <div class="table-wrapper" style="top: ${coords.top}; left: ${coords.left};">
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
        
        hallMap.innerHTML += tableHTML;
    }

    // 4. LOGIKA WYSZUKIWARKI (PODŚWIETLANIE)
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const szukanaFraza = e.target.value.toLowerCase().trim();
            
            document.querySelectorAll('.table-icon').forEach(icon => {
                icon.classList.remove('glow');
            });

            if (szukanaFraza === "") return;

            for (const [nr, goscie] of Object.entries(stoliki)) {
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