document.addEventListener("DOMContentLoaded", function () {
    const fejlecDiv = document.getElementById("fejlec_div");
    const images = [
        "img/elefant_header.jpg",
        "img/bohochal_header.jpg",
        "img/denever_header.jpg",
        "img/feher_tigris_header.jpg",
        "img/fekete_parduc_header.jpg",
        "img/gepard_header.jpg",
        "img/gorilla_header.jpg",
        "img/jegesmedve_header.jpg",
        "img/kameleon_header.jpg",
        "img/kek_papagaj_header.jpg",
        "img/krokodil_header.jpg",
        "img/levelibeka_header.jpg",
        "img/orangutan_header.jpg",
        "img/pingvin_header.jpg",
        "img/piros_papagaj_header.jpg",
        "img/piton_header.jpg",
        "img/polip_header.jpg",
        "img/raja_header.jpg",
        "img/tukan_header.jpg",
        "img/tuzhal_header.jpg",
        "img/voros_panda_header.jpg",
        "img/zsiraf_header.jpg",
    ];
    let index = 0;

    function changeBackground() {
        index = (index + 1) % images.length;
        fejlecDiv.style.transition = "background-image 1.5s ease-in-out";
        fejlecDiv.style.backgroundImage = `url(${images[index]})`;
    }

    setInterval(changeBackground, 5000);
});