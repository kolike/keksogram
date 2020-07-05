var MIN_PICTURES_INDEX = 1;
var MAX_PICTRUES_INDEX = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_INDEX = 1;
var MAX_AVATAR_INDEX = 6;

var COMMENTS = [
  "Отлично!",
  "В целом не плохо. Но такое...",
  "Палец из кадра стоит убрать, не профессионально",
  "Моя бабуля лучше снимает",
  "Твоя бабуля лучше снимает",
  "Серьёзно? Это называется фотография?",
  "Горизонт завален",
  "Васильченко и то лучше фотограф",
  "Так он сказал, так он сказааал...",
];

var PHOTOS_DESCRIPTIONS = [
  "Вносим вклад в развитие художественной фотографии",
  "Затусили с лучшими друзьями на море",
  "Отличный обед",
  "Я на Байконуре :(",
  "Отдых",
  "Любимые моменты жизни",
  "Это портал!",
  "Скажем так, если пойдет дождь...",
  "СНОВА БАЙКОНУР",
];

for (var i = MIN_PICTURES_INDEX; i < MAX_PICTRUES_INDEX; i++) {
  var pictureDescription = createPictureDescription(i);
  renderPicture(pictureDescription);
}

renderBigPicture(MIN_PICTURES_INDEX);
hideComments();
hideMoreCommentsLoader();

function createPictureDescription(index) {
  var pictureDescription = {
    url: `photos/${index}.jpg`,
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
    description:
      PHOTOS_DESCRIPTIONS[getRandomNumber(0, PHOTOS_DESCRIPTIONS.length - 1)],
  };
  return pictureDescription;
}

function renderPicture(pictureDescription) {
  var pictureGallery = document.querySelector(".pictures");
  var pictureTemplate = document
    .querySelector("#picture")
    .content.querySelector(".picture");

  var similarPictureElement = pictureTemplate.cloneNode(true);
  similarPictureElement.querySelector(".picture__img").src =
    pictureDescription.url;
  similarPictureElement.querySelector(".picture__likes").textContent =
    pictureDescription.likes;
  similarPictureElement.querySelector(".picture__comments").textContent =
    pictureDescription.comments.length;
  pictureGallery.appendChild(similarPictureElement);
}

function renderBigPicture(index) {
  console.log(i);
  var bigPicture = document.querySelector(".big-picture");
  bigPicture.classList.remove("hidden");
  bigPicture
    .querySelector(".big-picture__img")
    .querySelector("img").src = `photos/${index}.jpg`;
  document.querySelector(".likes-count").textContent = createPictureDescription(
    i
  ).likes;
  document.querySelector(
    ".comments-count"
  ).textContent = createPictureDescription(i).comments.length;

  document.querySelector(
    ".social__caption"
  ).textContent = createPictureDescription(i).description;

  var socialComments = document
    .querySelector(".social__comments")
    .querySelectorAll(".social__comment");

  for (var i = 0; i < socialComments.length; i++) {
    socialComments[i].querySelector("img").src = `img/avatar-${getRandomNumber(
      MIN_AVATAR_INDEX,
      MAX_AVATAR_INDEX
    )}.svg`;
    socialComments[i].querySelector(
      "p"
    ).textContent = createPictureDescription().comments;
  }
}

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
}

function hideComments() {
  document
    .querySelector(".social__comment-count")
    .classList.add("visually-hidden");
}

function hideMoreCommentsLoader() {
  document.querySelector(".social__loadmore").classList.add("visually-hidden");
}
