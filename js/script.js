/* =========================================================
   MEDIC TECHNOLOGIES
   MAIN JAVASCRIPT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* ================= HEADER SCROLL ================= */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            navbar.classList.toggle("active");

            const icon =
                menuToggle.querySelector("i");

            if (navbar.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });


        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");

                const icon =
                    menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= HERO SLIDER ================= */

    const slides =
        document.querySelectorAll(".hero-slide");

    const nextButton =
        document.getElementById("nextSlide");

    const prevButton =
        document.getElementById("prevSlide");

    const slideNumber =
        document.getElementById("slideNumber");


    if (slides.length > 0) {

        let currentSlide = 0;

        function showSlide(index) {

            slides.forEach(slide => {

                slide.classList.remove("active");

            });

            slides[index].classList.add("active");

            if (slideNumber) {

                let number =
                    String(index + 1).padStart(2, "0");

                slideNumber.textContent =
                    `${number} / ${String(slides.length).padStart(2, "0")}`;

            }

        }


        function nextSlide() {

            currentSlide++;

            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            showSlide(currentSlide);

        }


        function previousSlide() {

            currentSlide--;

            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }

            showSlide(currentSlide);

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextSlide
            );

        }


        if (prevButton) {

            prevButton.addEventListener(
                "click",
                previousSlide
            );

        }


        setInterval(nextSlide, 6000);

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* ================= COUNTERS ================= */

    const counters =
        document.querySelectorAll("[data-count]");


    let countersStarted = false;


    function animateCounters() {

        if (countersStarted) return;

        countersStarted = true;


        counters.forEach(counter => {

            const target =
                parseInt(counter.dataset.count);

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 60));


            const timer =
                setInterval(function () {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    counter.textContent =
                        current;

                }, 25);

        });

    }


    if (counters.length > 0) {

        const statsSection =
            document.querySelector(".stats-section");

        const counterObserver =
            new IntersectionObserver(

                function (entries) {

                    if (entries[0].isIntersecting) {

                        animateCounters();

                    }

                },

                {
                    threshold: 0.4
                }

            );


        counterObserver.observe(statsSection);

    }


    /* ================= CONTACT FORM ================= */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const formData =
                    new FormData(contactForm);


                const name =
                    formData.get("name");

                const company =
                    formData.get("company");

                const email =
                    formData.get("email");

                const phone =
                    formData.get("phone");

                const requirement =
                    formData.get("requirement");

                const message =
                    formData.get("message");


                const subject =
                    encodeURIComponent(
                        "Website Enquiry - Medic Technologies"
                    );


                const body =
                    encodeURIComponent(

                        `Name: ${name}

Company: ${company}

Email: ${email}

Phone: ${phone}

Requirement: ${requirement}

Message:
${message}`

                    );


                /*
                 * CHANGE THIS EMAIL
                 * to your real company email.
                 */

                const emailAddress =
                    "medicstechnologies@gmail.com";


                window.location.href =
                    `mailto:${emailAddress}?subject=${subject}&body=${body}`;

            }
        );

    }


    /* ================= SMOOTH ANCHOR ================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (targetId === "#") return;


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    const headerHeight =
                        document.querySelector(
                            ".header"
                        ).offsetHeight;


                    const position =
                        target.offsetTop -
                        headerHeight -
                        15;


                    window.scrollTo({

                        top: position,

                        behavior: "smooth"

                    });

                }

            }
        );

    });


});