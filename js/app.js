const daySteps = {
  mon: { steps: 0, date: [] },
  tue: { steps: 0, date: [] },
  wed: { steps: 0, date: [] },
  thu: { steps: 0, date: [] },
  fri: { steps: 0, date: [] }
};

getData();

(function addNavListeners() {
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
  document.getElementById("headerArrow").addEventListener("click", function() {
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
  });
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
        let formatedDate = date.toString().split(" "); // Wed Jan 12 2011 12:42:46 GMT-0800 (PST)
        let day = formatedDate[0].toLowerCase();
        daySteps[day].steps += element.steps;
        daySteps[day].date = formatedDate;
      });
      firstScreenData();
    })
    .catch(err => console.log(err));
}

function firstScreenData() {
  screenOneAnimations();
  let temp = document.querySelector("#main div.activityAvg");
  temp.style.opacity = "1";
  temp.style.width = "100%";
  let totalSteps = 0;
  Object.values(daySteps).forEach(item => (totalSteps += item.steps));
  let averageActivity = (totalSteps * 0.5) / 60;
  let calories = Math.round(totalSteps * 0.05);
  let distance = Math.round((totalSteps * 0.762) / 100);
  document.getElementById("screen1-activity").innerHTML = averageActivity;
  document.getElementById("screen1-steps").innerHTML = totalSteps;
  document.getElementById("screen1-calories").innerHTML = calories;
  document.getElementById("screen1-distance").innerHTML = distance;
  console.log(averageActivity);
}

function screenOneAnimations() {
  let animes = document.getElementsByClassName("s1-anime");
  for (let i = 0; i < animes.length; i++) {
    animes[i].style.opacity = "1";
    animes[i].style.width = "100%";
  }
}

function elementDetails(id) {
  document.querySelector("#header").classList.add("detailsHeader");
  document.getElementById("header").style.display = "grid";
  document.getElementById("headerBtn").style.display = "block";

  let stepsForDay = daySteps[id].steps;
  let fullDate = daySteps[id].date;
  let dayName = getDayFullName(id);
  let monthName = getMonthFullName(fullDate[1].toLowerCase());
  document.querySelector("#headerText h1").innerHTML = dayName;
  document.querySelector("#headerText h3").innerHTML = `${monthName} ${
    fullDate[2]
  }, ${fullDate[3]}`;
}

function createElement(
  elemTag,
  parentElem,
  innerHtml,
  elemClass,
  elemId,
  clickEventFun,
  functionParams
) {
  const elem = document.createElement(elemTag);
  if (innerHtml) elem.innerHTML = innerHtml;
  if (elemClass) elem.setAttribute("class", elemClass);
  if (elemId) elem.setAttribute("id", elemId);
  if (clickEventFun) elem.onclick = clickEventFun(functionParams);
  parentElem.appendChild(elem);
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
