// page index.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener("DOMContentLoaded", () => {

    // ***************************** section about me *******************************************

    // add la variable const de title_card
    const titleCard = document.getElementById('title-card');

    document.querySelectorAll('.ping-link').forEach(link => {
        // add variables remplacement img
        const changeImgBlack = link.querySelector('img');
        const originalWhiteSrc = changeImgBlack.src;
        const hoverBlackSrc = originalWhiteSrc.replace('.svg', '_black.svg');

        // stylise le contenu de title_card en mouse-enter
        link.addEventListener('mouseenter', () => {
            titleCard.style.color = 'var(--text-details)';
            titleCard.style.textShadow = `0 7px 2px var(--main-background)`;
            changeImgBlack.src = hoverBlackSrc;
        });

        // déstylise le contenu de title_card en mouse leaver
        link.addEventListener('mouseleave', () => {
            // retour à la couleur originale
            titleCard.style.color = 'var(--text-details) ';
            titleCard.style.textShadow = '';
            changeImgBlack.src = originalWhiteSrc;
        });
    });
});