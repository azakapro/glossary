document.addEventListener('DOMContentLoaded', function() {
    const alphabetContainer = document.getElementById('alphabet');
    const glossaryContainer = document.getElementById('glossary');

    fetch('https://raw.githubusercontent.com/azakapro/glossary/main/glossary.json')
        .then(response => response.json())
        .then(data => {
            // Generate alphabet links
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            alphabet.split('').forEach(letter => {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = letter;
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    displayGlossary(letter, data);
                });
                alphabetContainer.appendChild(link);
            });

            // Display all glossary entries initially
            displayGlossary('', data);
        })
        .catch(error => console.error('Error fetching glossary data:', error));

    function displayGlossary(letter, data) {
        glossaryContainer.innerHTML = '';
        if (letter) {
            const terms = data[letter] || [];
            terms.forEach(term => {
                const termDiv = document.createElement('div');
                termDiv.classList.add('term');
                termDiv.textContent = `${term.english}: ${term.uzbek}`;
                glossaryContainer.appendChild(termDiv);
            });
        } else {
            Object.values(data).forEach(terms => {
                terms.forEach(term => {
                    const termDiv = document.createElement('div');
                    termDiv.classList.add('term');
                    termDiv.textContent = `${term.english}: ${term.uzbek}`;
                    glossaryContainer.appendChild(termDiv);
                });
            });
        }
    }
});
