// responsive, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const contentMain = document.getElementById('content-all-page');

    if (burger && mobileMenu) {
        // toggle menu sur clic du burger
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            // blur le font de page arrière
            contentMain.classList.toggle('blurred');
        });

        // fermer menu sur clic du lien
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                contentMain.classList.remove('blurred');
            });
        });
    }
    // ***************************** section about me *******************************************

        // désactive le hover état des icons ping
    function disableHoverEffects() {
        document.querySelectorAll('.ping-link').forEach(link => {
            // Clone et remplace mes élements img
            const clone = link.cloneNode(true);
            link.parentNode.replaceChild(clone, link);

            // reset des img a leur etat d'origine
            const img = clone.querySelector('img');
            if (img) {
                img.src = img.src.replace('_black.svg', '.svg');
            }
        });
    }

        // active ou désactive en fonction de la taille de l'écran -> effets hover
        function toggleHoverEffects() {
            if (window.innerWidth < 768) {
                disableHoverEffects();
            }
        }

        // lancement de la fonction
        toggleHoverEffects();

        //resize
        window.addEventListener('resize', toggleHoverEffects);
});