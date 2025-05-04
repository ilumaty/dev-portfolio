// simulation du chargement, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', function() {
    // variable de progression, initialisation à 0
    let progress = 0;
    // récupère l'id du HTML pour afficher le %
    const loadingPercentage = document.getElementById('loading-percentage');
    // récupère l'id du HTML pour txt Loading..
    const loadingText = document.querySelector('.loading-text');
    // crée l'intervalle de 200ms
    const interval = setInterval(function() {
        // si vérifie le chargement jusqu'à sa fin max 100%
        if (progress >= 100) {
            // arrêt de l'intervalle évitant des exécutions supplémentaires
            clearInterval(interval);
            // insert stylisation pour animer une fin sur %
            loadingPercentage.classList.add('done-loading');
            // change le txt de Loading à completed
            loadingText.textContent = "Completed";
            // add l'id de fond d'arrère plan flash
            document.getElementById('overlay-background-movie').classList.add('fade-out');
            // Github
            window.location.href = 'main.html';
            return;
        }
        // ralentis la progression avant les 100%
        let progressSpeed;
        if (progress < 70) {
            progressSpeed = Math.random() * 5;
        } else if (progress < 90) {
            progressSpeed = Math.random() * 2.5;
        } else {
            progressSpeed = Math.random();
        }
        // simule le chargement par nombre aléatoire sur 100%
        progress = Math.min(progress + progressSpeed, 100);
        // met à jour le texte affiché et le % intégré au HTML
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
        // L'intervalle prend 200ms pour chaque MaJ
    }, 200);
});
