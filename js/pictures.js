(function () {
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

  window.picturesDescriptions = [];

  for (var i = MIN_PICTURES_INDEX; i < MAX_PICTRUES_INDEX; i++) {
    var pictureDescription = createPictureDescription(i);
    picturesDescriptions.push(pictureDescription);
  }

  for (var i = 0; i < picturesDescriptions.length; i++) {
    renderPicture(picturesDescriptions[i]);
  }

  function createPictureDescription(index) {
    var pictureDescription = {
      url: `photos/${index}.jpg`,
      likes: window.mathUtils.getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
      comments: [
        {
          commentText:
            COMMENTS[window.mathUtils.getRandomNumber(0, COMMENTS.length - 1)],
          avatarUrl: `img/avatar-${window.mathUtils.getRandomNumber(
            MIN_AVATAR_INDEX,
            MAX_AVATAR_INDEX
          )}.svg`,
        },
        {
          commentText:
            COMMENTS[window.mathUtils.getRandomNumber(0, COMMENTS.length - 1)],
          avatarUrl: `img/avatar-${window.mathUtils.getRandomNumber(
            MIN_AVATAR_INDEX,
            MAX_AVATAR_INDEX
          )}.svg`,
        },
      ],
      description:
        PHOTOS_DESCRIPTIONS[
          window.mathUtils.getRandomNumber(0, PHOTOS_DESCRIPTIONS.length - 1)
        ],
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
})();
