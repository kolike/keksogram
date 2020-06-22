var URL_MIN = 1;
var URL_MAX = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var FIRST_INDEX_MASSIVE = 0;
var FIRST_NUMBER_AVATAR = 1;
var LAST_NUMBER_AVATAR = 6;
var commentsMassive = [
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
var descriptionsPhoto = [
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

function getRandomNumber(min, max) {
  var rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
}

function createDescriptionPicture(index) {
  var picture = {
    url: `photos/${index}.jpg`,
    likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
    comments:
      commentsMassive[
        getRandomNumber(FIRST_INDEX_MASSIVE, commentsMassive.length - 1)
      ],
    description:
      descriptionsPhoto[
        getRandomNumber(FIRST_INDEX_MASSIVE, descriptionsPhoto.length - 1)
      ],
  };
  return picture;
}
function createPicture(picture) {
  var pictureGallery = document.querySelector(".pictures");
  var pictureTemplate = document
    .querySelector("#picture")
    .content.querySelector(".picture");

  var similarPictureElement = pictureTemplate.cloneNode(true);
  similarPictureElement.querySelector(".picture__img").src = picture.url;
  similarPictureElement.querySelector(".picture__likes").textContent =
    picture.likes;
  similarPictureElement.querySelector(".picture__comments").textContent =
    picture.comments.length;
  pictureGallery.appendChild(similarPictureElement);
}

for (var i = 1; i < URL_MAX; i++) {
  var randomPicture = createDescriptionPicture(i);
  createPicture(randomPicture);
  if (i == 1) {
    renderBigPictureItem();
  }
}
function renderBigPictureItem() {
  var bigPicture = document.querySelector(".big-picture");
  bigPicture.classList.remove("hidden");
  bigPicture
    .querySelector(".big-picture__img")
    .querySelector("img").src = `photos/1.jpg`;
  document.querySelector(".likes-count")
  .textContent = createDescriptionPicture(i).likes;
  document.querySelector(
    ".comments-count"
  ).textContent = createDescriptionPicture(i).comments.length;

  document.querySelector(
    ".social__caption"
  ).textContent = createDescriptionPicture(i).description;
  var socialComments = document
    .querySelector(".social__comments")
    .querySelectorAll(".social__comment");
  for (var i = 0; i < socialComments.length; i++) {
    socialComments[i].querySelector("img").src = `img/avatar-${getRandomNumber(
      FIRST_NUMBER_AVATAR,
      LAST_NUMBER_AVATAR
    )}.svg`;
    socialComments[i].querySelector(
      "p"
    ).textContent = createDescriptionPicture().comments;
  }
}
document
  .querySelector(".social__comment-count")
  .classList.add("visually-hidden");
document.querySelector(".social__loadmore").classList.add("visually-hidden");
