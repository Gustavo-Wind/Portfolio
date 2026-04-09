document.addEventListener("DOMContentLoaded", function () {

    // ── Menu mobile ───────────────────────────────────────────
    var mobileMenuIcon = document.querySelector(".mobile-menu-icon");
    var mobileMenu = document.querySelector(".menu");

    if (mobileMenuIcon && mobileMenu) {
        mobileMenuIcon.addEventListener("click", function () {
            mobileMenu.classList.toggle("mobile-menu-open");
        });
    }

    // ── Slider de depoimentos ─────────────────────────────────
    var prevButton = document.querySelector(".prev-testimonial");
    var nextButton = document.querySelector(".next-testimonial");
    var cards = document.querySelectorAll(".container-testimonials > div");
    var currentIndex = 0;

    function getVisibleCardCount() {
        return window.innerWidth <= 1200 ? 1 : 3;
    }

    function showCards() {
        cards.forEach(function (card, index) {
            card.style.display =
                index >= currentIndex && index < currentIndex + getVisibleCardCount()
                    ? "block"
                    : "none";
        });

        prevButton.classList.toggle("disable", currentIndex === 0);
        nextButton.classList.toggle(
            "disable",
            currentIndex + getVisibleCardCount() >= cards.length
        );
    }

    if (prevButton && nextButton && cards.length > 0) {
        prevButton.addEventListener("click", function () {
            if (currentIndex > 0) currentIndex -= 1;
            showCards();
        });

        nextButton.addEventListener("click", function () {
            if (currentIndex + getVisibleCardCount() < cards.length) currentIndex += 1;
            showCards();
        });

        showCards();
        window.addEventListener("resize", showCards);
    }

    // ── Formulário de contato ─────────────────────────────────
    var form = document.querySelector("form");
    var loadingMsg = document.getElementById("loading-message");
    var successMsg = document.getElementById("success-message");
    var errorMsg = document.getElementById("error-message");

    // Verifica se todos os elementos existem antes de continuar
    if (!form || !loadingMsg || !successMsg || !errorMsg) {
        console.warn("Formulário ou elementos de feedback não encontrados no HTML.");
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var nome = document.getElementById("nome").value.trim();
        var email = document.getElementById("email").value.trim();
        var assunto = document.getElementById("assunto").value.trim();
        var mensagem = document.getElementById("mensagem").value.trim();

        // Reset de mensagens anteriores
        errorMsg.style.display = "none";
        successMsg.style.display = "none";

        // Validação de campos obrigatórios
        if (!nome || !email || !assunto || !mensagem) {
            errorMsg.textContent = "Por favor, preencha todos os campos.";
            errorMsg.style.display = "block";
            return;
        }

        

        // Exibe loading e esconde form
        form.style.display = "none";
        loadingMsg.style.display = "block";

        var payload = {
            to: "gustavowinddeveloper@gmail.com",
            subject: "Contato do site: " + assunto,
            html:
                "<p><strong>Nome:</strong> " + nome + "</p>" +
                "<p><strong>E-mail:</strong> " + email + "</p>" +
                "<p><strong>Assunto:</strong> " + assunto + "</p>" +
                "<p><strong>Mensagem:</strong> " + mensagem + "</p>"
        };

        fetch("https://email-api-09u4.onrender.com/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (result) {
                loadingMsg.style.display = "none";

                if (result.success) {
                    successMsg.style.display = "block";
                    form.reset();
                } else {
                    form.style.display = "block";
                    errorMsg.textContent = "Erro ao enviar. Tente novamente.";
                    errorMsg.style.display = "block";
                }
            })
            .catch(function (error) {
                loadingMsg.style.display = "none";
                form.style.display = "block";
                errorMsg.textContent = "Erro ao enviar mensagem. Envie um e-mail para gustavowinddeveloper@gmail.com";
                errorMsg.style.display = "block";
                console.error("Erro ao enviar:", error);
            });
    });

});