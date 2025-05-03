// Format écrit sur <main> index.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', function() {
    //récupère les id du HTML
    const titleHome = document.getElementById('typed-title-home');
    const pHome = document.getElementById('typed-p-home');
    const spanHome = document.getElementById('typed-span-home');

    // integration variables du txt en title <h1> et <p>
    const titleText = "<h1>Moi, c'est Léo Développeur Web</h1>";
    const pText = "<p>Imaginez votre futur digital. Let's make it real</p>";
    const spanText = "<span>based in Switzerland</span>";

    // ajout de variable pour les intégrer à l'animation
    let titleIndex = 0;
    let pIndex = 0;
    let spanIndex = 0;
    let titleDone = false;
    let pDone = false;
    let spanDone = false;

    // fonction qui gère l'effet
    function typeEffect() {
        // si le titre n'est pas encore complètement affiché
        if (!titleDone) {
            // s'il reste des caractères à afficher dans le titre
            if (titleIndex < titleText.length) {
                // utilise textContent pour afficher les balises
                titleHome.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                // effet de typewrite
                setTimeout(typeEffect, 50 + Math.random() * 30);
            } else {
                // fin de la séquence du typewrite
                titleDone = true;
                setTimeout(typeEffect, 600);
            }
        }
        // sinon si le <p> n'est pas encore complètement affiché
        else if (!pDone) {
            if (pIndex < pText.length) {
            pHome.textContent += pText.charAt(pIndex);
                pIndex++;
                setTimeout(typeEffect, 70 + Math.random() * 30);
        } else {
            pDone = true;
            // continue vers le span
                setTimeout(typeEffect, 600);
            }
        }
        // sinon si le <span> n'est pas encore complètement affiché
        else if (!spanDone) {
            if (spanIndex < spanText.length) {
                spanHome.textContent += spanText.charAt(spanIndex);
                spanIndex++;
                setTimeout(typeEffect, 80 + Math.random() * 30);
            } else {
                spanDone = true;
            }
        }
    }

    // démarre la function après délai
    setTimeout(typeEffect, 500);
});