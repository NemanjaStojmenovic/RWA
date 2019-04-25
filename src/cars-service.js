import * as Rxjs from 'rxjs';
import { interval } from 'rxjs/observable/interval';
import { DatabaseService } from './database-service';
import { Observable, from, zip } from "rxjs";
import { take, filter, map, pairwise, scan } from "rxjs/operators";
export class CarsService {

    proba() {
        const $timer = interval(500);
        zip($niz, $timer).pipe
            (
                pairwise(),
                scan((acc, value) => acc + 1)
            )
            .subscribe(x => console.log(x))

    }
    adverts() {
        const advert = document.getElementsByClassName("msg-to-user")[0];
        const msgToShow = document.createElement("label");
        msgToShow.classList.add("advert-text");
        msgToShow.innerHTML = "";
        const arrayOfAdverts = [];
        arrayOfAdverts.push("DRIVE SAFELY.");
        arrayOfAdverts.push("DO NOT DRINK AND DRIVE!");
        arrayOfAdverts.push("DRIVE RESTED.");
        arrayOfAdverts.push("HAVE A NICE TRIP.");
        advert.appendChild(msgToShow);


        Observable.create(
            generator => {
                setInterval(() => {

                    generator.next(parseInt(Math.random() * 10))
                }, 1200)
            })
            .pipe(filter(x => x < 4))
            .subscribe(x => msgToShow.innerHTML = arrayOfAdverts[x]);
        // setInterval(() => msgToShow.innerHTML=arrayOfAdverts[parseInt(Math.random()*10) % 3], 1500)       
    }

    drawCarsList(cars) {
        const carsDiv = document.getElementsByClassName("div-cars")[0];
        while (carsDiv.children.length > 0)
            carsDiv.removeChild(carsDiv.children[0]);

        cars.forEach(car => {
            const divCar = document.createElement("div");
            divCar.className = "div-car";
            const labelModel = document.createElement("label");
            labelModel.textContent = car.model;
            labelModel.classList.add('car-model');
            divCar.appendChild(labelModel);
            const carDesc = document.createElement("p");
            carDesc.textContent = car.opis;
            carDesc.classList.add('car-desc');
            divCar.appendChild(carDesc);
            const slika = document.createElement("img");
            slika.className = "car-image";
            slika.setAttribute("src", car.slika);

            const infoDiv = document.createElement("div");
            infoDiv.className = "info-div";


            divCar.appendChild(slika);
            carsDiv.appendChild(divCar);

            divCar.appendChild(infoDiv);


            const rentButton = document.createElement("button");
            rentButton.innerHTML = "Rent a car";
            rentButton.className = "rent-button";
            rentButton.classList.add("btn-style");
            divCar.appendChild(rentButton);
            const index = cars.findIndex(x => x.id == car.id);
            Rxjs.fromEvent(rentButton, "click")
                .subscribe(() => {
                    const inputData = this.showRentACarForm(infoDiv);
                    this.rentACar(car, index, inputData);
                });

            const moreInfoButton = document.createElement("button");
            moreInfoButton.innerHTML = "Show more info";
            moreInfoButton.className = "more-info-button";
            moreInfoButton.classList.add("btn-style");
            divCar.appendChild(moreInfoButton);
            Rxjs.fromEvent(moreInfoButton, "click")
                .subscribe(() => {
                    infoDiv.classList.add("visible");
                    moreInfoButton.disabled = true;
                    this.MoreInformation(car, infoDiv, index);
                });


        });

    }
    MoreInformation(car, parentDiv, index) {
        const divOpis = document.createElement("div");
        divOpis.className = "car-desc-details";


        const lblModel = document.createElement("label");
        lblModel.innerHTML = "Model: " + car.model;
        divOpis.appendChild(lblModel);

        const lblBrojSedista = document.createElement("label");
        lblBrojSedista.innerHTML = "Broj sedista: " + car.brojSedista;
        divOpis.appendChild(lblBrojSedista);

        const lblBrojVrata = document.createElement("label");
        lblBrojVrata.innerHTML = "Broj vrata: " + car.brojVrata;
        divOpis.appendChild(lblBrojVrata);

        const lblKlima = document.createElement("label");
        lblKlima.innerHTML = "Klima: " + car.Klima;
        divOpis.appendChild(lblKlima);

        const lblGodinaProizvodnje = document.createElement("label");
        lblGodinaProizvodnje.innerHTML = "Godina proivodnje: " + car.godinaProizvodnje;
        divOpis.appendChild(lblGodinaProizvodnje);

        const lblBoja = document.createElement("label");
        lblBoja.innerHTML = "Boja: " + car.boja;
        divOpis.appendChild(lblBoja);

        const lblMaksimalnaBrzina = document.createElement("label");
        lblMaksimalnaBrzina.innerHTML = "Maksimalna brzina: " + car.maksimalnaBrzina + "km/h";
        divOpis.appendChild(lblMaksimalnaBrzina);

        const lblSudar = document.createElement("label");
        lblSudar.innerHTML = "Sistem upozoravanja na sudar: " + car.sitemUpozoravanjaNaSudar;
        divOpis.appendChild(lblSudar);


        const lblGorivo = document.createElement("label");
        lblGorivo.innerHTML = "Vrsta goriva: " + car.vrstaGoriva;
        divOpis.appendChild(lblGorivo);

        const lblMenjac = document.createElement("label");
        lblMenjac.innerHTML = "Vrsta menjaca: " + car.vrstaMenjaca;
        divOpis.appendChild(lblMenjac);


        const lblCena = document.createElement("label");
        lblModel.innerHTML = "Cena: " + car.cenaUEvrimaPoDanu + "$/24h";
        divOpis.appendChild(lblCena);

        const showLessInfo = document.createElement("button");
        showLessInfo.className = "show-less-info";
        showLessInfo.innerHTML = "Show less";
        showLessInfo.classList.add("btn-search-car");

        Rxjs.fromEvent(showLessInfo, "click")
            .subscribe(() => {

                divOpis.style.display = "none";
                const moreBtn = document.getElementsByClassName('div-cars')[0].children[index].getElementsByClassName('more-info-button')[0];
                moreBtn.disabled = false;
            });


        divOpis.appendChild(showLessInfo);
        parentDiv.appendChild(divOpis);

    }

    showRentACarForm(infoDiv) {
        this.removeAllRentACarForms();
        const inputData = document.createElement("div");
        inputData.setAttribute("id", "users-data");
        inputData.className = "users-data";

        const firstName = document.createElement("label");
        firstName.innerHTML = "First Name:";
        const inpFirstName = document.createElement("input");
        inpFirstName.setAttribute("id", "inpFirstName");
        inpFirstName.className = "inpFirstName";

        const lastName = document.createElement("label");
        lastName.innerHTML = "Last Name:"
        const inpLastName = document.createElement("input");
        inpLastName.setAttribute("class", "inpLastName");


        const emailAdress = document.createElement("label");
        emailAdress.innerHTML = "Email addres:"
        const inpEmailAddres = document.createElement("input");
        emailAdress.setAttribute("class", "inpEmail");

        const phoneNumber = document.createElement("label");
        phoneNumber.innerHTML = "Phone Number:"
        const inpPhoneNumber = document.createElement("input");
        inpPhoneNumber.setAttribute("class", "inpPhoneNumber");

        const pickUpDate = document.createElement("label");
        pickUpDate.innerHTML = "Pick-up date:";
        const inpPickUpDate = document.createElement("input");
        inpPickUpDate.setAttribute("type", "date");
        inpPickUpDate.setAttribute("class", "date-start");

        const dropOffDate = document.createElement("label");
        dropOffDate.innerHTML = "Drop-off date:";
        const inpDropOffDate = document.createElement("input");
        inpDropOffDate.setAttribute("type", "date");
        inpDropOffDate.setAttribute("class", "date-ends");

        const lblAdult = document.createElement("label");
        lblAdult.innerHTML = "Are you over 18+?"
        const checkAdult = document.createElement("input");
        checkAdult.setAttribute("type", "checkbox");
        checkAdult.setAttribute("class", "cbx-adult");
        checkAdult.checked = false;

        checkAdult.onclick = () => checkAdult.checked = true;

        const lblLicense = document.createElement("label");
        lblLicense.innerHTML = "Do you have Driver's License?";
        const checkDriversLicense = document.createElement("input");
        checkDriversLicense.setAttribute("type", "checkbox");
        checkDriversLicense.setAttribute("class", "cbx-license");
        checkDriversLicense.checked = false;
        checkDriversLicense.onclick = () => checkDriversLicense.checked = true;



        const reserveButton = document.createElement("button");
        reserveButton.className = "reserve";
        reserveButton.innerHTML = "RENT";
        reserveButton.focus();
        reserveButton.classList.add("btn-search-car");


        inputData.appendChild(firstName);
        inputData.appendChild(inpFirstName);
        inputData.appendChild(lastName);
        inputData.appendChild(inpLastName);
        inputData.appendChild(emailAdress);
        inputData.appendChild(inpEmailAddres);
        inputData.appendChild(phoneNumber);
        inputData.appendChild(inpPhoneNumber);
        inputData.appendChild(pickUpDate);
        inputData.appendChild(inpPickUpDate);
        inputData.appendChild(dropOffDate);
        inputData.appendChild(inpDropOffDate);
        inputData.append(lblAdult);
        inputData.appendChild(checkAdult);
        inputData.appendChild(lblLicense);
        inputData.appendChild(checkDriversLicense);
        inputData.appendChild(reserveButton);
        infoDiv.appendChild(inputData);

        return inputData;
    }

    rentACar(car, index, ) {
        const rentModal = document.getElementById('users-data');

        const reserveButton = document.getElementsByClassName('reserve');

        Rxjs.fromEvent(reserveButton, "click")
            .subscribe(() => {
                const response = this.checkAndAddToDatabase(car, index);
                if (response)
                    this.removeAllRentACarForms();
            });


    }
    checkAndAddToDatabase(car, index) {
        const startDate = document.getElementsByClassName("date-start")[0];
        const endDate = document.getElementsByClassName("date-ends")[0];
        const firstName = document.getElementsByClassName("inpFirstName")[0];
        const lastName = document.getElementsByClassName("inpLastName")[0];
        const email = document.getElementsByClassName("inpEmail")[0];
        const phone = document.getElementsByClassName("inpPhoneNumber")[0];
        const adult = document.getElementsByClassName("cbx-adult")[0];
        const license = document.getElementsByClassName("cbx-license")[0];
        var toReturn = false;
        if (firstName.value == "" || lastName.value == "" || phone.value == "" || email.value == "" || endDate.value == "" || startDate.value == "" || adult.checked == false || license.checked == false) {
            window.alert("Please fill up all fields!");
        }
        else {
            toReturn = true;
            const reservation = {
                "carId": car.id,
                "firstName": firstName.value,
                "lastName": lastName.value,
                "emailAddress": email.value,
                "contactNumber": phone.value,
                "from": startDate.value,
                "to": endDate.value
            };
            DatabaseService.addReservation(reservation);

            const infoDiv = document.getElementsByClassName('div-cars')[0].children[index].getElementsByClassName('info-div')[0];
            const reservationInfo = document.createElement("div");
            reservationInfo.className = "reserved";
            reservationInfo.innerHTML = "You have just reserved  " + car.model + ". Have a nice trip!";
            infoDiv.appendChild(reservationInfo);
            setTimeout(() => {
                reservationInfo.remove();
            }, 5000);


        }
        return toReturn;
    }
    updateNumOfCars(rezervacije) {

        rezervacije.forEach(rez => {

        })

    }

    removeAllRentACarForms() {
        const form = document.getElementsByClassName("users-data");
        for (var x of form)
            x.remove();
    }

}