document.addEventListener("DOMContentLoaded", function () {

    //BG valtakozas
    const fejlecDiv = document.getElementById("fejlec_div");
    const images = [
        "img/elefant_header.jpg",
        "img/bohochal_header.jpg",
        "img/denever_header.jpg",
        "img/feher_tigris_header.jpg",
        "img/fekete_parduc_header.jpg",
        "img/gorilla_header.jpg",
        "img/jegesmedve_header.jpg",
        "img/kameleon_header.jpg",
        "img/krokodil_header.jpg",
        "img/levelibeka_header.jpg",
        "img/orangutan_header.jpg",
        "img/pingvin_header.jpg",
        "img/piros_papagaj_header.jpg",
        "img/piton_header.jpg",
        "img/polip_header.jpg",
        "img/raja_header.jpg",
        "img/tukan_header.jpg",
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

    //Kosar szekcio
    const kosarImg = document.getElementById("kosar_img");
    const kosarPanel = document.getElementById("kosar_panel");
    const kosarBezar = document.getElementById("kosar_bezar");
    const kosarLista = document.getElementById("kosar_lista");
    const uresKosarSzoveg = document.getElementById("ures_kosar_szoveg");

    kosarImg.addEventListener("click", function () {
        kosarPanel.classList.add("megnyitva");
    });

    kosarBezar.addEventListener("click", function () {
        kosarPanel.classList.remove("megnyitva");
    });

    function termekHozzaadas(termekNev, termekAr) {
        const ujTermek = document.createElement("li");

        ujTermek.innerHTML = `${termekNev} - ${termekAr} Ft <button class="torles_gomb">Törlés</button>`;


        ujTermek.querySelector(".torles_gomb").addEventListener("click", function () {
            kosarLista.removeChild(ujTermek);
            ellenorizKosarat();
        });

        kosarLista.appendChild(ujTermek);
        ellenorizKosarat();
    }

    function ellenorizKosarat() {
        if (kosarLista.children.length === 0) {
            uresKosarSzoveg.style.display = "block";
        } else {
            uresKosarSzoveg.style.display = "none";
        }
    }
    ellenorizKosarat();

    //Webshop szekcio
    const webshopLink = document.getElementById('webshop_link');
    const webshopDiv = document.getElementById('webshop_div');
    const termekekDiv = document.getElementById('termekek_div');

    const bemutatkozasDiv = document.getElementById('bemutatkozas_div');
    const nyitvatartasDiv = document.getElementById('nyitvatartas_div');
    const jegyarakDiv = document.getElementById('jegyarak_div');

    webshopLink.addEventListener('click', function (e) {
        e.preventDefault();
        bemutatkozasDiv.style.display = 'none';
        nyitvatartasDiv.style.display = 'none';
        jegyarakDiv.style.display = 'none';
        webshopDiv.style.display = 'block';
        kosarPanel.classList.remove('megnyitva');
        betoltCSV();
        webshopDiv.scrollIntoView({ behavior: 'smooth' });

    });

    function betoltCSV() {
        fetch('products.csv')
            .then(response => response.text())
            .then(text => {
                const sorok = text.trim().split('\n');
                termekekDiv.innerHTML = '';
                sorok.forEach(sor => {
                    const [nev, ar, kep] = sor.split(',');
                    const kartya = document.createElement('div');
                    kartya.classList.add('termek_kartya');
                    kartya.innerHTML = `
                     <img src="${kep.trim()}" alt="${nev.trim()}" class="termek_kep">
                     <h3>${nev.trim()}</h3>
                     <p>${ar.trim()} Ft</p>
                     <button class="kosarba_gomb">Kosárba</button>`;

                    kartya.querySelector('.kosarba_gomb').addEventListener('click', function () {
                        termekHozzaadas(nev.trim(), ar.trim());
                    });

                    termekekDiv.appendChild(kartya);
                });
            })
            .catch(error => console.error('Hiba a CSV betöltésekor:', error));
    }

    const menuLinkek = document.querySelectorAll('#menu a');

    menuLinkek.forEach(link => {
        if (link !== webshopLink) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                fejlecDiv.style.display = 'block';
                bemutatkozasDiv.style.display = 'block';
                nyitvatartasDiv.style.display = 'block';
                jegyarakDiv.style.display = 'block';
                webshopDiv.style.display = 'none';

                const celId = this.getAttribute('href');
                const celElem = document.querySelector(celId);
                if (celElem) {
                    celElem.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
});