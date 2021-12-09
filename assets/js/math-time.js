
const PERSON_TEMPLATE = '<tr class="person" id="person-{id}"> \
                            <td>Person {id}</td> \
                            <td><input class="name" value="Person {id}"></input></td> \
                            <td><input class="hours"></input></td> \
                            <td class="payout"></td> \
                        </tr>';

const ID_RE = /{id}/gi;

function sum(listOfNumbers) {
    return listOfNumbers.reduce((a, b) => a + b);
}

function update(e) {
    window.mathTime.update();
}


class Person {
    constructor(id) {
        this.name = "Person " + id;
        this.htmlId = "person-" + id;
        this.hours = 0;
        this.payout = 0;
        this.personRowElement = document.querySelector("#" + this.htmlId);

        this.registerEvents();
    }

    registerEvents() {
        this.personRowElement.getElementsByClassName("hours")[0].addEventListener("change", update);
    }

    computeAndSetPayout(hourly) {
        this.hours = this.personRowElement.getElementsByClassName("hours")[0].value;

        const payout = this.hours * hourly;

        this.setPayout(payout);
    }

    setPayout(payout) {
        this.personRowElement.getElementsByClassName("payout")[0].innerHTML = Number(payout).toFixed(2);
    }
}

class MathTime {
    constructor() {
        this.totalTip = 0;
        this.hourlyTip = 0;

        const personOne = new Person(1);
        const personTwo = new Person(2);

        this.people = [personOne, personTwo];

        this.registerEvents();
    }

    registerEvents() {
        document.querySelector("#total-tip").addEventListener("change", update);
        document.getElementById("add-person").addEventListener("click", this.addPerson.bind(this));
    }

    update() {
        // read total tip value
        this.totalTip = Number(document.querySelector("#total-tip").value);

        // compute total hours worked
        const hoursEls = document.querySelectorAll(".hours");
        const hoursElsArray = Array.from(hoursEls);
        const totalHoursWorked = hoursElsArray
            .map(el => Number(el.value))
            .reduce((a, b) => a + b, 0);

        // compute hourly
        const hourly = this.totalTip / totalHoursWorked;

        // set hourly
        document.querySelector("#hourly").innerHTML = Number(hourly).toFixed(2);

        // compute and set payout
        this.people.forEach((person) => person.computeAndSetPayout(hourly));

    }

    addPerson(e) {

        const newId = this.people.length + 1;

        const htmlStringToInsert = PERSON_TEMPLATE.replace(ID_RE, String(newId));

        document.querySelector(".math-time").insertAdjacentHTML('beforeend', htmlStringToInsert)

        this.people = [...this.people, new Person(newId)];

    }

}


function initialize(e) {
    console.log(e);

    const mathTime = new MathTime();

    window.mathTime = mathTime;
}

function onLoad() {
    if (window.attachEvent) {
        window.attachEvent('onload', initialize);
    } else {
        if (window.onload) {
            var curronload = window.onload;
            var newonload = function (evt) {
                curronload(evt);
                initialize(evt);
            };
            window.onload = newonload;
        } else {
            window.onload = initialize;
        }
    }
}

onLoad();
