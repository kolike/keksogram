var MIN_PICTURES_INDEX = 1;
var MAX_PICTRUES_INDEX = 25;
var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;
var MIN_AVATAR_INDEX = 1;
var MAX_AVATAR_INDEX = 6;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS_COUNT = 5;
var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
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

var imageUpload = document.querySelector(".img-upload");
var picturesDescriptions = [];
var bigPicture = document.querySelector(".big-picture");
var uploadFileForm = document.querySelector(".img-upload__input");
var imageUploadOverlay = document.querySelector(".img-upload__overlay");
var buttonCloseUploadFile = document.querySelector(".img-upload__cancel");
var buttonCloseBigPicture = document.querySelector(".big-picture__cancel");
var socialCommentsElement = document.querySelector(".social__comments");
var textHashtags = document.querySelector(".text__hashtags");
var imgUploadSubmit = document.querySelector(".img-upload__submit");
var scaleDownButton = document.querySelector(".scale__control--smaller");
var scaleUpButton = document.querySelector(".scale__control--bigger");
var scaleValue = document.querySelector(".scale__control--value");
var imageUploadPreview = document.querySelector(".img-upload__preview");
var effectList = document.querySelectorAll(".effects__radio");
var textComment = document.querySelector(".text__description");
var isTextCommentFocused = false;
var isTextHashtagsFocused = false;

imageUploadPreview.classList.add("effects__preview--none");

scaleDownButton.addEventListener("click", scaleDown);
scaleUpButton.addEventListener("click", scaleUp);

imgUploadSubmit.addEventListener("click", function () {
  var hashtagsValue = textHashtags.value;
  var errorMessage = checkValidation(hashtagsValue);
  if (errorMessage != null) {
    textHashtags.setCustomValidity(errorMessage);
  }
});

textComment.addEventListener("focus", function () {
  isTextCommentFocused = true;
});

textComment.addEventListener("blur", function () {
  isTextCommentFocused = false;
});

textHashtags.addEventListener("focus", function () {
  isTextHashtagsFocused = true;
});

textHashtags.addEventListener("blur", function () {
  isTextHashtagsFocused = false;
});

textHashtags.addEventListener("input", function () {
  textHashtags.setCustomValidity("");
});

uploadFileForm.addEventListener("change", function () {
  uploadFileForm.value = "";
  imageUploadOverlay.classList.remove("hidden");
});

window.addEventListener("keydown", function (evt) {
  if (isEscKeyDown(evt) && !isTextCommentFocused && !isTextHashtagsFocused) {
    imageUploadOverlay.classList.add("hidden");
  }
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

window.addEventListener("keydown", function (evt) {
  if (isEscKeyDown(evt) && !isTextCommentFocused && !isTextHashtagsFocused) {
    bigPicture.classList.add("hidden");
  }

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

var pictures = document.querySelectorAll(".picture");

for (var i = 0; i < pictures.length; i++) {
  addPictureClickHandler(pictures[i], i);
}

for (var i = 0; i < effectList.length; i++) {
  addEffectClickHandler(effectList[i], i);
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

function renderComments(pictureDescription) {
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
}

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

function addPictureClickHandler(picture, index) {
  picture.addEventListener("click", function () {
    renderBigPicture(picturesDescriptions[index]);
    renderComments(picturesDescriptions[index]);
  });
}

function checkValidation(hashtagValue) {
  if (hashtagValue === "") {
    return null;
  }

  var hashtags = hashtagValue.split(" ");

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return "Нельзя указать больше пяти хэш-тегов";
  }

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag === "#") {
      return "Хеш-тег не может состоять только из одной решётки";
    } else if (hashtag.charAt(0) !== "#") {
      return "Хэш-тег должен начинаться с символа # (решётка)";
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return "Максимальная длина одного хэш-тега 20 символов, включая решётку";
    }
  }

  if (!isHashtagsUnique(hashtags)) {
    return "Один и тот же хэш-тег не может быть использован дважды";
  }

  return null;
}

function isHashtagsUnique(hashtags) {
  for (var i = 0; i < hashtags.length - 1; i++) {
    var firstHashtag = hashtags[i].toLowerCase();

    for (var j = i + 1; j < hashtags.length; j++) {
      var secondHashtag = hashtags[j].toLowerCase();

      if (firstHashtag === secondHashtag) {
        return false;
      }
    }
  }

  return true;
}

function scaleDown() {
  var oldScale = scaleValue.value;
  var newScale = oldScale.substring(0, oldScale.length - 1) - SCALE_STEP;

  if (newScale < SCALE_MIN) {
    return;
  }

  scaleValue.value = newScale + "%";
  imageUploadPreview.style.transform = `scale(${newScale / 100})`;
}

function scaleUp() {
  var odlScale = scaleValue.value;
  var newScale = +odlScale.substring(0, odlScale.length - 1) + SCALE_STEP;

  if (newScale > SCALE_MAX) {
    return;
  }

  scaleValue.value = newScale + "%";
  imageUploadPreview.style.transform = `scale(${newScale / 100})`;
}

function addEffectClickHandler(effect, index) {
  effect.addEventListener("click", function () {
    applyEffect(index);
  });
}

function applyEffect(i) {
  for (var j = 0; j < effectList.length; j++) {
    imageUploadPreview.classList.remove(
      `effects__preview--${effectList[j].value}`
    );
  }

  imageUploadPreview.classList.add(`effects__preview--${effectList[i].value}`);
}

function isEscKeyDown(evt) {
  return evt.keyCode === 27;
}
