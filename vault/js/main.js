// page index.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener("DOMContentLoaded", () => {

    // ***************************** Back to Top *******************************************

    // add variable du btn
    const backToTop = document.getElementById("back-to-top");

    // evite des bugs si id plante
    if (backToTop) {
            // back to Top créer au click un effet de smooth
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    behavior: 'smooth',
                    top: 0
                });
            });
        // screen optimisé à 300px d'un scroll user, et l'icon apparait sinon remove
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // ***************************** footer Copyright *******************************************

    // add la variable qui contiendra le Copyright
    const copyrightPosition  = document.getElementById('footer-copyright');

    // evite plantage sur id footer
    if (copyrightPosition) {
            // année actuelle
            const currentYear = new Date().getFullYear();

        // insère le texte dans la variable Copyright
            copyrightPosition.textContent = `© ${currentYear}`;
    }
});