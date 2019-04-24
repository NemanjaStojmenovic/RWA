import { forkJoin } from "rxjs";
import { take, filter, map, debounce, pairwise, scan } from "rxjs/operators";

const ReservationUrl = 'http://localhost:3000/rezervacije';
const CarsUrl = 'http://localhost:3000/cars';

export class DatabaseService {

    static addReservation(obj) {
        return fetch(ReservationUrl, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then(json => {
                console.log("parsed json: ", json);
                return true;
            })
    }

    static getReservation() {
        return fetch(ReservationUrl, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
    }
    static getReservationCars() {
        /*const $obs1=  fetch(ReservationUrl,{
          method:"get",
          headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
          }, });
          const $obs2=fetch(CarsUrl,{
            method:"get",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }, });
        const  $niz=[$obs1,$obs2];
         forkJoin($obs1,$obs2).subscribe(x=>console.log(x));*/

        const $obs1 = this.getCars();
        const $obs2 = this.getReservation();
        forkJoin($obs1, $obs2).subscribe(x => console.log(x))
    }

    static getCars() {
        return fetch(CarsUrl, {
            method: "get",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
    }

    static getModelCars(grad, tipovi) {
        const calls = [];
        tipovi.forEach(x => calls.push(
            fetch(`${CarsUrl}?grad=${grad}&karoserija=${x}`, {
                method: "get",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            }).then(x => x.json())
        ))


        return forkJoin(...calls).toPromise().then(x => x.flat());

    }

}