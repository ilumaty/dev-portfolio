// page contact.html, DOMcL permet que la page HTML se load au max avant de pouvoir exécuter la function()
document.addEventListener("DOMContentLoaded", () => {

    // add les variables necessaire au formulaire
    const form = document.getElementById('background-form');
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submit');
    const formNotificationClass = 'form-notification';
    const errorClass = 'error-message';

    //regex
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{1,63}$/;

    // variable qui stock états de validation des champs
    let firstnameValidationState = false;
    let lastnameValidationState = false;
    let emailValidationState = false;
    let messageValidationState = false;

    // erreur d'input user
    function showError(input, message) {
        // évite que la class input success géne ma class error
        input.classList.remove('input-success');
        // récupère ma class stylisation error
        input.classList.add('input-error');

        // message erreur
        let errorMessage = input.parentElement.querySelector(`.${errorClass}`);

        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            input.parentElement.appendChild(errorMessage);
        }
        // add le txt d'erreur au HTML
        errorMessage.textContent = message;
    }

    // affiche succès user input
    function showSucces(input) {
        // évite que la class input error géne ma class success
        input.classList.remove('input-error');
        // récupère ma class stylisation success
        input.classList.add('input-success');
        // supprime msg erreur
        const errorMessage = input.parentElement.querySelector(`.${errorClass}`);
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // validation du firstname
    function validateFirstname() {
        const firstname = firstnameInput.value.trim();
        if (firstname === '') {
            showError(firstnameInput, 'Ici vous n\'avez pas saisi correctement votre prenom');
            firstnameValidationState = false;
            return false;
        } else if (!nameRegex.test(firstname)) {
            showError(firstnameInput, 'Format: Prenom (ex: Max), au minimum 2 lettres');
            firstnameValidationState = false;
            return false;
        } else {
            showSucces(firstnameInput);
            firstnameValidationState = true;
            return true;
        }
    }

    // validation du lastname
    function validateLastname() {
        const lastname = lastnameInput.value.trim();
        if (lastname === '') {
            showError(lastnameInput, 'Ici vous n\'avez pas saisi correctement votre nom');
            lastnameValidationState = false;
            return false;
        } else if (!nameRegex.test(lastname)) {
            showError(lastnameInput, 'Format: Nom (ex: Scott), au minimum 2 lettres');
            lastnameValidationState = false;
            return false;
        } else {
            showSucces(lastnameInput);
            lastnameValidationState = true;
            return true;
        }
    }

    // validation de l'email
    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, 'Merci d\'entrer un email valide');
            emailValidationState = false;
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'Votre saisie n\'est pas valide (ex: max7scott@outlook.com');
            emailValidationState = false;
            return false;
        } else {
            showSucces(emailInput);
            emailValidationState = true;
            return true;
        }
    }

    // validation du message
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, 'Merci d\'entrer votre message');
            messageValidationState = false;
            return false;
        } else if (message.length < 10) {
            showError(messageInput, 'Votre message doit contenir au moins 10 caractères');
            messageValidationState = false;
            return false;
        } else {
            showSucces(messageInput);
            messageValidationState = true;
            return true;
        }
    }

    // validation du formulaire en utilisant les états memorisés
    function validateForm() {
        // valide les champs unique qui ne sont pas valides
        if (!firstnameValidationState) {
            validateFirstname();
        }
        if (!lastnameValidationState) {
            validateLastname();
        }
        if (!emailValidationState) {
            validateEmail();
        }
        if (!messageValidationState) {
            validateMessage();
        }
        return firstnameValidationState && lastnameValidationState && emailValidationState && messageValidationState;
    }

    // sortie de champs formulaire
    firstnameInput.addEventListener('blur', validateFirstname);
    lastnameInput.addEventListener('blur', validateLastname);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // validation en submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // save les varaibles en constantes blur/form/ img & form
        const formContainer = document.getElementById('background-form');
        const imageContainer = document.getElementById('image-user');
        const originalForm = formContainer.innerHTML;
        const originalImageContent = imageContainer.innerHTML;
        const backgroundContact = document.getElementById('background-contact');

        if (!validateForm()) {
            // message d'error générale
            const formNotification = document.createElement('div');
            formNotification.className = formNotificationClass;
            formNotification.textContent = 'Veuillez corriger les erreurs dans le formulaire.';

            // add notification after submit 1 seule fois
            if (!form.querySelector(`.${formNotificationClass}`)) {
                submitButton.parentElement.appendChild(formNotification);
            }
            // disparaître la notification
            setTimeout(() => {
                formNotification.classList.add('fade-out');
                setTimeout(() => {
                    formNotification.classList.remove('fade-out');
                    formNotification.remove();
                }, 1000);
            }, 5000);
        } else {
            // format mobile remove img to movie validate form
            if (window.innerWidth <= 768) {

                backgroundContact.classList.add('blur');
                // display none img alien
                imageContainer.style.display = 'none';

                // remplace par la video de validation
                formContainer.innerHTML = `
            <div class="form-container fade-in">
                <video 
                autoplay muted playsinline
                id="movie-form">
                    <source 
                    src="vault/assets/movies/valid_form.mp4"
                    type="video/mp4">
                    Votre navigateur ne supporte malheureusement pas la video de validation de formulaire.
                </video>
                <p 
                    id="success-message">
                    Merci !<br> Formulaire envoye avec succes
                </p>
            </div>
            `;

                // reset le form mobile
                form.reset();

                // add constantes de la video pour gérer les modif mobile et desktop
                const video = formContainer.querySelector('video');
                video.onended = function () {
                    const successContainer = formContainer.querySelector('.form-container');
                    successContainer.classList.add('fade-out');

                    setTimeout(() => {
                        formContainer.innerHTML = originalForm;
                        backgroundContact.classList.remove('blur');
                        // img qui revient fin de movie
                        imageContainer.style.display = 'block';
                        reconnectFormEvents();
                    }, 1000);
                };
                // format desktop
            } else {
                imageContainer.innerHTML = `
                <div class="form-container fade-in">
                <video 
                autoplay muted playsinline
                id="movie-form">
                    <source 
                    src="vault/assets/movies/valid_form.mp4"
                    type="video/mp4">
                    Votre navigateur ne supporte malheureusement pas la video de validation de formulaire.
                </video>
                <p 
                    id="success-message">
                    Merci !<br> Formulaire envoye avec succes
                </p>
            </div>
            `;
                // reset le form
                form.reset();

                const video = imageContainer.querySelector('video');
                video.onended = function () {
                    imageContainer.innerHTML = originalImageContent;
                };
            }
        }
        // add function pour remettre en place le form
        function reconnectFormEvents() {
            const firstnameInput = document.getElementById('firstname');
            const lastnameInput = document.getElementById('lastname');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            firstnameInput.addEventListener('blur', validateFirstname);
            lastnameInput.addEventListener('blur', validateLastname);
            emailInput.addEventListener('blur', validateEmail);
            messageInput.addEventListener('blur', validateMessage);
        }
    });
});