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
    const programokDiv = document.getElementById('programok_div');
    const nyitvatartasDiv = document.getElementById('nyitvatartas_div');
    const jegyarakDiv = document.getElementById('jegyarak_div');

    webshopLink.addEventListener('click', function (e) {
        e.preventDefault();
        mindenDivElrejt();
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
                programokDiv.style.display = 'block';
                nyitvatartasDiv.style.display = 'block';
                jegyarakDiv.style.display = 'block';
                kapcsolatDiv.style.display = 'block';
                webshopDiv.style.display = 'none';
                allatokDiv.style.display = 'none';
                terkepDiv.style.display = 'none';
                

                const celId = this.getAttribute('href');
                const celElem = document.querySelector(celId);
                if (celElem) {
                    celElem.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });


    //Információ gombok
    const informacioSavok = document.querySelectorAll('.informacio_sav');
    const allatokDiv = document.getElementById('allatok_div');
    const terkepDiv = document.getElementById('terkep_div');
    const galeriaDiv = document.getElementById('galeria_div');
    const kapcsolatDiv = document.getElementById('kapcsolat_div');
    const felfeleDiv = document.getElementById('felfele_div');
   

    function mindenDivElrejt() {
        felfeleDiv.style.display = 'none';
        bemutatkozasDiv.style.display = 'none';
        programokDiv.style.display = 'none';
        nyitvatartasDiv.style.display = 'none';
        jegyarakDiv.style.display = 'none';
        webshopDiv.style.display = 'none';
        allatokDiv.style.display = 'none';
        terkepDiv.style.display = 'none';
        galeriaDiv.style.display = 'none';
        kapcsolatDiv.style.display = 'block';
        kosarPanel.classList.remove('megnyitva');
    }

    informacioSavok[0].addEventListener('click', function () {
        mindenDivElrejt();
        allatokDiv.style.display = 'block';
        allatokDiv.scrollIntoView({ behavior: 'smooth' });
    });

    informacioSavok[1].addEventListener('click', function () {
        mindenDivElrejt();
        terkepDiv.style.display = 'block';
        terkepDiv.scrollIntoView({ behavior: 'smooth' });
    });

    informacioSavok[2].addEventListener('click', function () {
        mindenDivElrejt();
        galeriaDiv.style.display = 'block';
        galeriaDiv.scrollIntoView({ behavior: 'smooth' });
    });

    //Jegyek kosárba rakása
    const jegyKosarbaGombok = document.querySelectorAll('.kosarba_gomb_jegy');

    jegyKosarbaGombok.forEach(gomb => {
        gomb.addEventListener('click', function () {
            const kartya = gomb.parentElement;
            const nev = kartya.querySelector('h4').innerText.trim();
            const ar = kartya.querySelector('.ar_p').innerText.trim().replace(' Ft', '').replace('.', '');
            termekHozzaadas(nev, ar);
        });
    });


    const vasarlasGomb = document.getElementById('vasarlas_gomb');
    const vasarlasOldal = document.getElementById('vasarlas_oldal');
    const vasarlasKosarTartalom = document.getElementById('vasarlas_kosar_tartalom');
    const vegosszegSzoveg = document.getElementById('vegosszeg_szoveg');
    const vasarloForm = document.getElementById('vasarlo_form');

    vasarlasGomb.addEventListener('click', function () {
        kosarPanel.classList.remove('megnyitva');
        mindenDivElrejt();
        fejlecDiv.style.display = 'none';
        vasarlasOldal.style.display = 'block';
        megjelenitVasarlasKosarat();
    });

    function megjelenitVasarlasKosarat() {
        const kosarTetelek = kosarLista.querySelectorAll('li');
        vasarlasKosarTartalom.innerHTML = '';
        let osszeg = 0;

        kosarTetelek.forEach(elem => {
            const szoveg = elem.textContent.replace('Törlés', '').trim();
            const darabolt = szoveg.split(' - ');
            const ar = parseInt(darabolt[1].replace('Ft', '').trim());
            osszeg += ar;

            const p = document.createElement('p');
            p.textContent = szoveg;
            vasarlasKosarTartalom.appendChild(p);
        });

        vegosszegSzoveg.textContent = `Végösszeg: ${osszeg} Ft`;
    }
    const fizetesModUtanszav = document.getElementById('fizetes_mod_utanvet');
    const fizetesModOnline = document.getElementById('fizetes_mod_online');
    const bankkartyaDiv = document.getElementById('bankkartya_div');

    
    fizetesModUtanszav.addEventListener('change', function () {
        bankkartyaDiv.style.display = 'none';
    });

    fizetesModOnline.addEventListener('change', function () {
        bankkartyaDiv.style.display = 'block';
    });


    vasarloForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nev = document.getElementById('vasarlo_nev').value;
        const email = document.getElementById('vasarlo_email').value;
        const cim = document.getElementById('vasarlo_cim').value;
        const fizetesMod = document.querySelector('input[name="fizetes_mod"]:checked').value;

        if (fizetesMod === 'online') {
            const bankkartyaSzam = document.getElementById('bankkartya_szam').value;
            const honap = document.getElementById('bankkartya_honap').value;
            const ev = document.getElementById('bankkartya_ev').value;
            const cvc = document.getElementById('bankkartya_cvc').value;

            if (!bankkartyaSzam || !honap || !ev || !cvc) {
                alert('Minden bankkártya adatot meg kell adni!');
                return;
            }
        }

        alert('Köszönjük a vásárlást! 😊');
    });

    //Kép slider
    const swiper = new Swiper('.sample-slider', {
        loop: true,                         
        slidesPerView: 2,                   
        centeredSlides : true,              
        spaceBetween: 20,                   
        autoplay: {                         
            delay: 5000,  
        },   
        pagination: {                       
            el: '.swiper-pagination',
        },
        navigation: {                       
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    })
});