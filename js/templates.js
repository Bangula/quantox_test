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

function createDayNav(id) {}
