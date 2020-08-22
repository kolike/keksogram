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
  "Серьёзно? Это называется фотография?",
  "Горизонт завален",
  "Васильченко и то лучше фотограф",
  "Так он сказал, так он сказааал...",
  "Очень хорошее фото!",
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
  "Лучший мой кадр",
];

var picturesDescriptions = [];
var bigPicture = document.querySelector(".big-picture");
var uploadFileField = document.querySelector(".img-upload__form");
var imageUploadOverlay = document.querySelector(".img-upload__overlay");
var buttonCloseUploadFile = document.querySelector(".img-upload__cancel");
var buttonCloseBigPicture = document.querySelector(".big-picture__cancel");
var socialCommentsElement = document.querySelector(".social__comments");

uploadFileField.addEventListener("change", function (event) {
  event.preventDefault();
  imageUploadOverlay.classList.remove("hidden");
});

buttonCloseUploadFile.addEventListener("click", function () {
  imageUploadOverlay.classList.add("hidden");
});

buttonCloseBigPicture.addEventListener("click", function () {
  bigPicture.classList.add("hidden");
  while (socialCommentsElement.firstChild) {
    socialCommentsElement.removeChild(socialCommentsElement.firstChild);
  }
});

for (var i = MIN_PICTURES_INDEX; i < MAX_PICTRUES_INDEX; i++) {
  var pictureDescription = createPictureDescription(i);
  picturesDescriptions.push(pictureDescription);
}

for (var i = 0; i < picturesDescriptions.length; i++) {
  renderPicture(picturesDescriptions[i]);
}

hideComments();
hideCommentsLoader();

function createPictureDescription(index) {
  var pictureDescription = {
    url: `photos/${index}.jpg`,
    likes: getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: [
      {
        commentText: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
        avatarUrl: `img/avatar-${getRandomNumber(
          MIN_AVATAR_INDEX,
          MAX_AVATAR_INDEX
        )}.svg`,
      },
      {
        commentText: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
        avatarUrl: `img/avatar-${getRandomNumber(
          MIN_AVATAR_INDEX,
          MAX_AVATAR_INDEX
        )}.svg`,
      },
    ],
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

renderComment = function (pictureDescription) {
  for (var i = 0; i < pictureDescription.comments.length; i++) {
    var socialCommentElement = document.createElement("li");
    socialCommentElement.classList.add("social__comment");

    var avatarPicture = document.createElement("img");
    avatarPicture.classList.add("social__picture");
    avatarPicture.alt = "Аватар комментатора фотографии";
    avatarPicture.width = "35";
    avatarPicture.height = "35";
    avatarPicture.src = pictureDescription.comments[i].avatarUrl;

    var commentText = document.createElement("p");
    commentText.classList.add("social__text");
    commentText.textContent = pictureDescription.comments[i].commentText;

    socialCommentElement.appendChild(avatarPicture);
    socialCommentElement.appendChild(commentText);
    socialCommentsElement.appendChild(socialCommentElement);
  }
};

function renderBigPicture(pictureDescription) {
  bigPicture.classList.remove("hidden");
  bigPicture.querySelector(".big-picture__img").querySelector("img").src =
    pictureDescription.url;
  document.querySelector(".likes-count").textContent = pictureDescription.likes;
  document.querySelector(".comments-count").textContent =
    pictureDescription.comments.length;
  document.querySelector(".social__caption").textContent =
    pictureDescription.description;
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

function hideCommentsLoader() {
  document
    .querySelector(".social__comments-loader")
    .classList.add("visually-hidden");
}

var pictures = document.querySelectorAll(".picture");

var addPictureClickHandler = function (picture, index) {
  picture.addEventListener("click", function () {
    renderBigPicture(picturesDescriptions[index]);
    renderComment(picturesDescriptions[index]);
  });
};

for (var i = 0; i < pictures.length; i++) {
  addPictureClickHandler(pictures[i], i);
}
