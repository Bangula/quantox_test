function createTemplateOne(text1, text2, value, iconName) {
  let parent = document.getElementById("main");
  let child = document.createElement("div");
  child.setAttribute("class", "activityAvg");
  child.innerHTML = `<div class="iconContainer">
                            <div class="iconWrap">
                            <i class="material-icons">
                                ${iconName}
                            </i>
                            </div>
                        </div>
                        <div class="activityContent">
                            <h3>${text1}</h3>
                            <p>${text2}</p>
                            <h2 id="screen1-activity">${value}</h2>
                        </div>`;
  parent.appendChild(child);
}

function createTemplateTwo(text1, text2, value, iconName) {
  let parent = document.getElementById("main");
  let child = document.createElement("div");
  child.setAttribute("class", "activityData");
  child.innerHTML = `<div class="iconContainer">
                        <div class="iconWrap">
                            <i class="material-icons">
                            ${iconName}
                            </i>
                        </div>
                        </div>
                        <div class="activityContent1">
                            <h3>${text1}</h3>
                            <p>${text2}</p>
                        </div>
                        <div class="activityContent2">
                            <h2 id="screen1-steps">${value}</h2>
                         </div>`;
  parent.appendChild(child);
}

function daysNavTemplate(itemId, itemClass, month, day) {
  let parent = document.getElementById("daysNav");
  let child = document.createElement("p");
  child.setAttribute("id", itemId);
  child.setAttribute("class", itemClass);
  child.innerHTML = `${month}<br />${day}`;
  parent.appendChild(child);
}

function screenTwoSectionOne(stepsNum, messgeText1, messageText2) {
  let parent = document.getElementById("main");
  let child = document.createElement("div");
  child.setAttribute("class", "screen2-s1");
  child.innerHTML = `<div class="circle">
                      <div class="iconWrap">
                        <i class="material-icons">
                          directions_run
                        </i>
                      </div>
                      <p>Steps</p>
                      <h2 id="stepsNum">${stepsNum}</h2>
                    </div>
                    <div class="message">
                      <p>${messgeText1}</p>
                      <h2>${messageText2}</h2>
                    </div>`;
  parent.appendChild(child);
}

function screenTwoSectionTwo(km, call, minHours) {
  let parent = document.getElementById("main");
  let child = document.createElement("div");
  child.setAttribute("class", "screen2-s2");
  child.innerHTML = `<div>
                      <p>km</p>
                      <h2>${km}</h2>
                    </div>
                    <div>
                      <p>call</p>
                      <h2>${call}</h2>
                    </div>
                    <div>
                      <p>${minHours.rhours == 0 ? "min" : "hours"}</p>
                      <h2>${
                        minHours.rhours == 0
                          ? minHours.rminutes
                          : `${minHours.rhours}.${minHours.rminutes}`
                      }</h2>
                    </div>`;
  parent.appendChild(child);
}
