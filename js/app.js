const daySteps = {
  mon: { steps: 0, date: [] },
  tue: { steps: 0, date: [] },
  wed: { steps: 0, date: [] },
  thu: { steps: 0, date: [] },
  fri: { steps: 0, date: [] }
};

getData();

(function initEventListeners() {
  let navitems = document.getElementsByClassName("navitem");
  for (let i = 0; i < navitems.length; i++) {
    navitems[i].addEventListener("click", e => {
      if (document.querySelector("#daysNav p.active") !== null) {
        document.querySelector("#daysNav p.active").classList.remove("active");
      }
      e.target.classList.add("active");
      elementDetails(e.target.id);
    });
  }
  document
    .getElementById("headerArrow")
    .addEventListener("click", () => returnToScreen1());
})();

function getData() {
  document.getElementById("headerBtn").style.display = "none";
  document.getElementById("header").style.display = "block";

  fetch("https://api.myjson.com/bins/1gwnal")
    .then(res => res.json())
    .then(data => {
      data.forEach((element, index) => {
        let time = element.timestamp;
        let date = new Date(time);
        let formatedDate = date.toString().split(" ");
        let day = formatedDate[0].toLowerCase();
        daySteps[day].steps += element.steps;
        daySteps[day].date = formatedDate;
      });
      firstScreenData();
      console.log(daySteps);
    })
    .catch(err => console.log(err));
}

function firstScreenData() {
  document.getElementById("main").innerHTML = "";
  if (document.querySelector("#main.screen-2") !== null) {
    document
      .querySelector("#main")
      .classList.remove("screen-2")
      .classList.add("screen-1");
  }

  let totalSteps = 0;
  Object.values(daySteps).forEach(item => (totalSteps += item.steps));

  let avgActivityMinutes = ((totalSteps / 5) * 0.5) / 60;
  let avgActivity = minutesFormat(avgActivityMinutes);
  let calories = Math.round(totalSteps * 0.05);
  let distance = ((totalSteps / 5) * 0.762) / 1000;
  let distanceFormated = Math.round(distance * 100) / 100;

  const data = [
    {
      text1: "Steps",
      text2: "Total",
      value: totalSteps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: "directions_run"
    },
    {
      text1: "Calories",
      text2: "Total burnde",
      value: calories.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      icon: "whatshot"
    },
    {
      text1: "Distance",
      text2: "Average",
      value: `${distanceFormated}km`,
      icon: "my_location"
    }
  ];

  // Creating templates from templates.js
  createTemplateOne("Activity", "Average", avgActivity, "timer");
  data.forEach(item =>
    createTemplateTwo(item.text1, item.text2, item.value, item.icon)
  );
}

function elementDetails(id) {
  document.querySelector("#header").classList.add("detailsHeader");
  document.getElementById("header").style.display = "grid";
  document.getElementById("headerBtn").style.display = "block";

  document.getElementById("main").innerHTML = "";
  if (document.querySelector("#main.screen-1") !== null) {
    document.querySelector("#main").classList.remove("screen-1");
  }
  document.querySelector("#main").classList.add("screen-2");

  let stepsForDay = daySteps[id].steps;
  let fullDate = daySteps[id].date;
  let dayName = getDayFullName(id);
  let monthName = getMonthFullName(fullDate[1].toLowerCase());
  document.querySelector("#headerText h1").innerHTML = dayName;
  document.querySelector("#headerText h3").innerHTML = `${monthName} ${
    fullDate[2]
  }, ${fullDate[3]}`;
}

function returnToScreen1() {
  document.querySelector("#daysNav p.active").classList.remove("active");
  document.getElementById("headerBtn").style.display = "none";
  document.getElementById("header").style.display = "block";
  document.querySelector("#headerText h1").innerHTML = "Welcome!";
  document.querySelector("#headerText h3").innerHTML =
    "Overview of your activity";
  if (document.querySelector("#header.detailsHeader") !== null) {
    document
      .querySelector("#header.detailsHeader")
      .classList.remove("detailsHeader");
  }
  document.getElementById("main").innerHTML = "";
  if (document.querySelector("#main.screen-2") !== null) {
    document.querySelector("#main").classList.remove("screen-2");
  }
  document.querySelector("#main").classList.add("screen-1");
  firstScreenData();
}

function getDayFullName(day) {
  switch (day) {
    case "mon":
      return "Monday";
    case "tue":
      return "Tuesday";
    case "wed":
      return "Wednesday";
    case "thu":
      return "Thursday";
    case "fri":
      return "Friday";
    default:
      return null;
  }
}

// For now only june is necessary
function getMonthFullName(month) {
  switch (month) {
    case "jun":
      return "June";

    default:
      return null;
  }
}

function minutesFormat(num) {
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}min`;
}
