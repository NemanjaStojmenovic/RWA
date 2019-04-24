import * as Rxjs from 'rxjs';
import { Observable, fromEvent } from 'rxjs';
import { CarsService } from './cars-service';
import { DatabaseService } from './database-service';
import { interval } from 'rxjs/observable/interval';
import { filter } from 'rxjs/add/operator/filter';

const carsService = new CarsService();
const choosenCity = document.getElementById("from-place");
const carTypes = document.getElementsByClassName("type-of-car");
const searchButton = document.getElementById("dugme");
DatabaseService.getReservation()
    .then(response => {
        console.log(response)
        const result = response.json()
            .then(rezervacije => carsService.updateNumOfCars(rezervacije))
    });

carsService.adverts();
Rxjs.fromEvent(searchButton, 'click')
    .subscribe(() => {
        const chosenTypes = [...carTypes].filter(x => x.checked).map(x => x.value);
        DatabaseService.getModelCars(choosenCity.value, chosenTypes)
            .then(response => {
                carsService.drawCarsList(response);
            })
    });

