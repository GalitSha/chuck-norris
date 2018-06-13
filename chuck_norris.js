let timeoutID;

function typeForJokes() {
  document.getElementById("textbox").addEventListener('input', function () {
    let query = document.getElementById("textbox").value;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(getAllEvents, 200, query);

  });

  // First call when page load
  //let query = document.getElementById("textbox").value;
  //getAllEvents(query);

}



function getAllEvents(query) {
  let xhr = new XMLHttpRequest();
  let getUrl = "https://api.chucknorris.io/jokes/search?query=" + query;
  xhr.open('GET', getUrl, true);
  xhr.send();

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let jokesArr = (JSON.parse(xhr.responseText)).result;

      //if (document.querySelector('.jokeclass')) {
        for (let i = 0; i < 3; i++) {
          let parent = document.getElementsByClassName("grid")[i];
          parent.innerHTML = '';
        }
      //}

      showAllJokes(jokesArr);
    }
  });
}

function showAllJokes(jokesArr) {
  for (let i = 0; i < 12; i++) {
    let joke = jokesArr[i].value;
    //newJokeDiv(joke);
    setTimeout(newJokeDiv, 100 * i, joke, i);
  }
}


function newJokeDiv(joke, i) {
  let para = document.createElement("p");
  let node = document.createTextNode(joke);
  para.appendChild(node);
  para.classList.add("jokeclass");
  para.classList.add("animated");
  para.classList.add("bounce");


  let element = document.getElementsByClassName("grid")[i % 3];
  element.appendChild(para);
}

document.addEventListener('DOMContentLoaded', typeForJokes);
