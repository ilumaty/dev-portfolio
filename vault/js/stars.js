// Format écrit sur <body> index.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', function() {
    // add variables
    const starsContainer = document.getElementById('stars-background');
    const numberOfStars = 250;

    // étoiles en mouvements
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // tailles des étoiles
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // positions des étoiles
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        // delay pour éviter que les stars clignotent toutes en même temps
        star.style.animationDelay = `${Math.random() * 4}s`;

        starsContainer.appendChild(star);
    }

    // étoile qui brille +
    for (let i = 0; i < 15; i++) {
        const brightStar = document.createElement('div');
        brightStar.classList.add('star');
        brightStar.classList.add('bright');


        const size = Math.random() * 3 + 2;
        brightStar.style.width = `${size}px`;
        brightStar.style.height = `${size}px`;
        brightStar.style.opacity = '0.8';
        brightStar.style.boxShadow = '0 0 3px rgba(221, 234, 225, 0.8)';

        // position aléatoire des stars
        brightStar.style.top = `${Math.random() * 100}%`;
        brightStar.style.left = `${Math.random() * 100}%`;
        brightStar.style.animationDelay = `${Math.random() * 4}s`;

        starsContainer.appendChild(brightStar);
    }
});