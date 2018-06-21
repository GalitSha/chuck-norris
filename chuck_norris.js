let timeoutID;

function typeForJokes() {
  document.getElementById("textbox").addEventListener('input', function () {
    let query = document.getElementById("textbox").value;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(getAllEvents, 200, query);

  });
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

  let selectButton = document.createElement("img");
  selectButton.src = "http://www.emoji.co.uk/files/google-emojis/symbols-android/7964-yellow-heart.png";
  para.appendChild(selectButton);
  selectButton.classList.add("select-button");


  let element = document.getElementsByClassName("grid")[i % 3];
  element.appendChild(para);

  clickOnSelectButton(selectButton, para);

}


function clickOnSelectButton(selectButton, para) {
  selectButton.addEventListener('click', () => {
    selectButton.classList.toggle("styleSelectButton");
    console.log(para.innerText);

    saveJoke(para.innerText, para)

  });
}

function saveJoke(joke, para) {
  let selectedJokesArr = JSON.parse(localStorage.getItem('jokes'));
  let doubleJoke = 0;

  if (Array.isArray(selectedJokesArr)) {

    selectedJokesArr.forEach(function (joke) {
      if (joke === para.innerText) {
        doubleJoke += 1;
      }
    });
    if (doubleJoke === 0) {
      selectedJokesArr.push(joke);
      localStorage.setItem('jokes', JSON.stringify(selectedJokesArr));
    }
  } else {
    localStorage.setItem('jokes', '[]');
    selectedJokesArr.push(joke);
    localStorage.setItem('jokes', JSON.stringify(selectedJokesArr));
  }
}

function addJokeToFavoritesNav(i) {
  let jokeInTheList = document.createElement("li");
  let jokeText = document.createTextNode(JSON.parse(localStorage.getItem('jokes'))[i]);
  jokeInTheList.appendChild(jokeText);

  let hrElement = document.createElement("hr");

  let favoritesNav = document.getElementsByClassName("favoritesNav")[0];
  favoritesNav.appendChild(jokeInTheList);
  favoritesNav.appendChild(hrElement);
}


document.addEventListener('DOMContentLoaded', function () {
  typeForJokes();

  document.getElementById("favorites").addEventListener('click', () => {
    document.querySelector(".favoritesNav").innerHTML="";

    let LengthOfFavorites = JSON.parse(localStorage.getItem('jokes')).length;
    for (let i=0; i<LengthOfFavorites; i++) {
      addJokeToFavoritesNav(i)
    }
    document.querySelector(".favorites-container").classList.remove("hidden-favorites");

    console.log(localStorage.getItem('jokes'));
  });

  document.querySelector(".modal-background").addEventListener('click', () => {
    document.querySelector(".favorites-container").classList.add("hidden-favorites");
  });


  });
