// slider, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener('DOMContentLoaded', function() {
    // variables du slider
    const slides = document.querySelector('.slide');
    const projects = document.querySelectorAll('.project-container');
    const pausePlay = document.getElementById('play-pause');
    const containerWork = document.getElementById('container-works');
    const planetProjects = [
        'moon-project',
        'mars-project',
        'astro-project',
        'jupiter-project'
].map(id => document.getElementById(id)).filter(Boolean);


    // variables slider
    let beginIndex = 0;
    let autoSlide;
    let isPaused = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let isSliderActive = false;

    // stock les projects
    let positions = [];

    // calcule des positions de chaque slider et stocké
    function calculatePositions() {
        positions = [];
        projects.forEach(function (project) {
            // récupère la position du slide left
            positions.push(project.offsetLeft);
        });
    }

    // positions visibles du slider
    function updatePosition() {
        if (positions.length === 0) calculatePositions();

        // defile la position du project jusqu'à celle active
        slides.scrollLeft = positions[beginIndex];

        // MaJ de l'indicateur visuel
        const indicators = document.querySelectorAll('.indicator');
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === beginIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
    }

    // function qui passe au prochain slide
    function nextSlide() {
        // ajout classe animation fluidité
        projects[beginIndex].classList.add('animate-left');

        // attends que l’animation finisse et changer de slide
        setTimeout(() => {
            projects[beginIndex].classList.remove('animate-left');
            beginIndex = (beginIndex + 1) % projects.length;
            updatePosition();
        }, 600);
    }

    // function qui fait revenir au slide précédent
    function prevSlide() {
        beginIndex = (beginIndex - 1 + projects.length) % projects.length;
        updatePosition();
    }

    // function qui va démarrer le slide auto
    function startAuto() {
        clearInterval(autoSlide); // clear pour éviter des doubles
        const isMobile = window.innerWidth <= 768; // contrôle si sur mobile
        if (!isPaused && isSliderActive && !isMobile) { // si pas en pause, et pas mobile
            autoSlide = setInterval(nextSlide, 5000) // démarre à 5.5s
        }
    }

    // function qui toggle entre play et pause
    function togglePause() {
        isPaused = !isPaused;

        // changement de l'img et alt selon l'action user
        if (isPaused) {
            pausePlay.src = "vault/assets/main/slider/play/play.svg";
            pausePlay.alt = "Click to play..!";
            clearInterval(autoSlide);
        } else {
            pausePlay.src = "vault/assets/main/slider/pause/pause.svg";
            pausePlay.alt = "Click to pause..!";
            startAuto();
        }
    }

    // active le slider avec observation
    function activeSlider() {
        if (!isSliderActive) {
            isSliderActive = true;
            updatePosition();
            startAuto();
        }
    }

    // désactive le slider
    function deactivateSlider() {
        if (isSliderActive) {
            isSliderActive = false;
            clearInterval(autoSlide);
        }
    }

    // pause le slider sur hover
    function tempPauseSlider() {
        clearInterval(autoSlide);
    }

    function resumeSlider() {
        if (isSliderActive && !isPaused) {
            startAuto();
        }
    }

    // intersection observer pour détecter quand le conteneur est visible pour s'activer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // conteneur visible
                activeSlider();
            } else {
                // conteneur plus visible, désactivé
                deactivateSlider();
            }
        });
    }, {threshold: 0.2});  // déclenche la function à 20% visible du container

    // conteneur visible
    if (containerWork) {
        observer.observe(containerWork);

        // initialisation du slider
        calculatePositions();
        updatePosition();

        // ajout de la navigation par click user avec les points
        document.querySelectorAll('.indicator').forEach((indicator) => {
            indicator.addEventListener('click', function () {
                // reprends l'index a partir de la data-index
                beginIndex = parseInt(this.getAttribute('data-index'));
                updatePosition();
                startAuto();
            });
        });

        // calcule des positions si le screen est redimensionnée
        window.addEventListener('resize', function () {
            calculatePositions();
            updatePosition();
        });

        // click previous slide
        document.getElementById('arrow-left-container').addEventListener('click', function () {
            prevSlide();
            startAuto();
        });

        // click next slide
        document.getElementById('arrow-right-container').addEventListener('click', function () {
            nextSlide();
            startAuto();
        });

        // click pause/play slide
        document.getElementById('play-pause-container').addEventListener('click', function () {
            togglePause();
        });

        // applique les événements de curseur enter/stop hover
        planetProjects.forEach((orbitTarget) => {
            if (orbitTarget) {
                orbitTarget.addEventListener('mouseenter', function () {
                    tempPauseSlider();
                });

                orbitTarget.addEventListener('mouseleave', function () {
                    resumeSlider();
                });
            }
        });

        // swipe tactiles
        slides.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX; // la position X ici est l'initiation du touch
        });

        // capture la position finale
        slides.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX; // la position X ici est la finale du touch
            handleSwipe(); // active le swipe
        });

        // function qui gère les swipes horizontales
        function handleSwipe() {
            const swipeThreshold = 50; // swipe a valeur minimal à 50px

            // swipe de right to left
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
                startAuto();

                // swipe de left to right
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
                startAuto();
            }
        }
    }
});
