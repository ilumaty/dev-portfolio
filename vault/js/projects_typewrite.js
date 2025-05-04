// Format écrit sur <section> projects.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', function() {
    //récupère les id du HTML
    const projectsTitle = document.getElementById('typed-title-projects');
    const projectsSubtitle = document.getElementById('subtitle-projects');

    // integration variables du txt en title <h1> et <h2>
    const textHeading = "<h1>Des projets qui prennent vie</h1>";
    const subHeading = "<h2>Des idées, de l\'innovation tout commence ici</h2>";

    // vide cash HTML titre projects.html
    projectsTitle.textContent = "";
    projectsSubtitle.textContent = "";

    // ajout de variable pour les intégrer à l'animation
    let mainPos = 0;
    let subPos = 0;
    let mainDone = false;
    let subDone = false;

    // animation de l'écriture
    function typewriter() {
        // titre principal
        if (!mainDone) {
            // s'il reste des caractères à afficher dans le titre
            if (mainPos < textHeading.length) {
                // utilise textContent pour afficher les balises
                projectsTitle.textContent += textHeading.charAt(mainPos);
                mainPos++;
                // effet de typewrite
                setTimeout(typewriter, 50 + Math.random() * 30);
            } else {
                // fin de la séquence de l'animation
                mainDone = true;
                setTimeout(typewriter, 600);
            }
        }
        // animation sous-titre
        else if (!subDone) {
            if (subPos < subHeading.length) {
                projectsSubtitle.textContent += subHeading.charAt(subPos);
                subPos ++;
                setTimeout(typewriter, 70 + Math.random() * 30);
                } else {
                    subPos ++;
                // change le style des mots définis : projets, idées, innovation
                colorWord(projectsTitle, "projets");
                colorWord(projectsSubtitle, "idées");
                colorWord(projectsSubtitle, "innovation");

                // ajoute un effet après court délai pour DOM MàJ
                setTimeout(() => {
                    const highlighted = document.querySelectorAll('.highlighted-word');
                    highlighted.forEach(el => el.classList.add('show'));
                }, 50);
            }
        }
    }

    // function qui gère la color des mots pré-définis
    function colorWord(element, word) {
        let html = element.innerHTML;
        const regex = new RegExp(`\\b(${word})\\b`, 'g');
        element.innerHTML = html.replace(regex, `<span class="highlighted-word">$1</span>`);
    }

    // démarre la function après délai
    setTimeout(typewriter, 500)
});
