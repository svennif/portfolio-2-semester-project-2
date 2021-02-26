fetch(
  "https://raw.githubusercontent.com/svennif/AnApiOfIceAndFire/master/data/characters.json"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    showObject(json);
    console.log(json);
  })
  .catch(function (error) {
    console.log(error);
  });

function showObject(characterObject) {
  cardData = characterObject;
  let cardContainer = document.querySelector(".card-container");

  for (let i = 0; i < cardData.length; i++) {
    cardContainer.innerHTML +=
      "<div class='card'>" +
      "<input class='stretched-link checkbox' type='checkbox'" +
      "id='" +
      cardData[i].Id +
      "' value='" +
      cardData[i].Id +
      "'>" +
      "<label class='card-body' for='" +
      cardData[i].Id +
      "'>" +
      "<img src='" +
      cardData[i].Image +
      "' class='card-img-top' alt='Logo of different houses'>" +
      "<h2 class='card-title'>" +
      cardData[i].Name +
      "</h2>" +
      "<p class='card-text'><b>Played by: </b>" +
      cardData[i].PlayedBy +
      "</p>" +
      "<p class='card-text'><b>Known aliases: </b>" +
      cardData[i].Aliases[0] +
      "</p>" +
      "</div>" +
      "</div>" +
      "</label>";
  }

  let characterCard = document.getElementsByClassName("card");
  let characterName = document.getElementsByClassName("card-title");
  let characterImg = document.getElementsByClassName("card-img-top");
  let characterImgValue;
  let characterValue;

  for (let i = 0; i < characterCard.length; i++) {
    characterCard[i].addEventListener("click", (e) => {
      characterValue = e.path[1].childNodes[1].childNodes[1].innerHTML;
      characterImgValue = e.path[1].childNodes[1].childNodes[0].src =
        cardData[i].Image;
      console.log(
        (characterImgValue = e.path[1].childNodes[1].childNodes[0].src)
      );
      if (
        !localStorage.getItem("playerOne") &&
        localStorage.getItem("playerTwo") !== characterValue
      ) {
        addPlayerOne(characterName[i].innerHTML);
      } else if (
        !localStorage.getItem("playerTwo") &&
        localStorage.getItem("playerOne") !== characterValue
      ) {
        addPlayerTwo(characterName[i].innerHTML);
      } else if (
        localStorage.getItem("playerOne") &&
        localStorage.getItem("playerOne") === characterValue
      ) {
        removePlayerOne(characterName[i].innerHTML);
      } else if (
        localStorage.getItem("playerTwo") &&
        localStorage.getItem("playerTwo") === characterValue
      ) {
        removePlayerTwo(characterName[i].innerHTML);
      }

      if (
        !localStorage.getItem("playerOneImg") &&
        localStorage.getItem("playerTwoImg") !== characterImgValue
      ) {
        addPlayerOneImg((characterImg[i].src = cardData[i].Image));
      } else if (
        !localStorage.getItem("playerTwoImg") &&
        localStorage.getItem("playerOneImg") !== characterImgValue
      ) {
        addPlayerTwoImg((characterImg[i].src = cardData[i].Image));
      } else if (
        localStorage.getItem("playerOneImg") &&
        localStorage.getItem("playerOneImg") === characterImgValue
      ) {
        removePlayerOneImg(characterImgValue);
      } else if (
        localStorage.getItem("playerTwoImg") &&
        localStorage.getItem("playerTwoImg") === characterImgValue
      ) {
        removePlayerTwoImg(characterImgValue);
      }
    });
  }

  $("input[type=checkbox]").change(function () {
    var max = 2;
    if ($("input[type=checkbox]:checked").length == max) {
      $("input[type=checkbox]").attr("disabled", "disabled");
      $("input[type=checkbox]:checked").removeAttr("disabled");
      $(".btn").css("visibility", "visible");
    } else {
      $("input[type=checkbox]").removeAttr("disabled");
      $(".btn").css("visibility", "hidden");
    }
  });
}

function addPlayerOne(playerOne) {
  localStorage.setItem("playerOne", playerOne);
}

function addPlayerTwo(playerTwo) {
  localStorage.setItem("playerTwo", playerTwo);
}

function removePlayerOne() {
  localStorage.removeItem("playerOne");
}

function removePlayerTwo() {
  localStorage.removeItem("playerTwo");
}

function addPlayerOneImg(playerOneImg) {
  localStorage.setItem("playerOneImg", playerOneImg);
}
function addPlayerTwoImg(playerTwoImg) {
  localStorage.setItem("playerTwoImg", playerTwoImg);
}

function removePlayerOneImg() {
  localStorage.removeItem("playerOneImg");
}
function removePlayerTwoImg() {
  localStorage.removeItem("playerTwoImg");
}

let homeButton = document.querySelector(".home-button");

homeButton.addEventListener("click", (e) => {
  localStorage.clear();
});

function btn() {
  window.location.replace("game.html");
}
