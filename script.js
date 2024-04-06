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

            // Add "All" link
            const allLink = document.createElement('a');
            allLink.href = '#';
            allLink.textContent = 'All';
            allLink.addEventListener('click', function(e) {
                e.preventDefault();
                displayGlossary('', data);
            });
            alphabetContainer.appendChild(allLink);

            // Display all glossary entries initially
            displayGlossary('', data);
        })
        .catch(error => console.error('Error fetching glossary data:', error));

    function displayGlossary(letter, data) {
        glossaryContainer.innerHTML = '';
        const englishTermsDiv = document.createElement('div');
        const uzbekTermsDiv = document.createElement('div');
        englishTermsDiv.textContent = 'English';
        uzbekTermsDiv.textContent = 'Uzbek';
        glossaryContainer.appendChild(englishTermsDiv);
        glossaryContainer.appendChild(uzbekTermsDiv);

        if (letter) {
            const terms = data[letter] || [];
            terms.forEach(term => {
                const englishDiv = document.createElement('div');
                englishDiv.textContent = term.english;
                englishTermsDiv.appendChild(englishDiv);

                const uzbekDiv = document.createElement('div');
                uzbekDiv.textContent = term.uzbek;
                uzbekTermsDiv.appendChild(uzbekDiv);
            });
        } else {
            Object.values(data).forEach(terms => {
                terms.forEach(term => {
                    const englishDiv = document.createElement('div');
                    englishDiv.textContent = term.english;
                    englishTermsDiv.appendChild(englishDiv);

                    const uzbekDiv = document.createElement('div');
                    uzbekDiv.textContent = term.uzbek;
                    uzbekTermsDiv.appendChild(uzbekDiv);
                });
            });
        }
    }
});
