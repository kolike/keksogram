(function () {
  var bigPicture = document.querySelector(".big-picture");
  var buttonCloseBigPicture = document.querySelector(".big-picture__cancel");
  var socialCommentsElement = document.querySelector(".social__comments");
  var textCommentBigPicture = document.querySelector(".social__footer-text");
  var isTextCommentBigPictureFocused = false;

  textCommentBigPicture.addEventListener("focus", function () {
    isTextCommentBigPictureFocused = true;
  });

  textCommentBigPicture.addEventListener("blur", function () {
    isTextCommentBigPictureFocused = false;
  });

  buttonCloseBigPicture.addEventListener("click", function () {
    bigPicture.classList.add("hidden");
    while (socialCommentsElement.firstChild) {
      socialCommentsElement.removeChild(socialCommentsElement.firstChild);
    }
  });

  window.addEventListener("keydown", function (evt) {
    if (
      window.keyboardUtils.isEscKeyDown(evt) &&
      !isTextCommentBigPictureFocused
    ) {
      bigPicture.classList.add("hidden");

      while (socialCommentsElement.firstChild) {
        socialCommentsElement.removeChild(socialCommentsElement.firstChild);
      }
    }
  });

  var pictures = document.querySelectorAll(".picture");

  for (var i = 0; i < pictures.length; i++) {
    addPictureClickHandler(pictures[i], i);
  }

  hideComments();
  hideCommentsLoader();

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
    document.querySelector(".likes-count").textContent =
      pictureDescription.likes;
    document.querySelector(".comments-count").textContent =
      pictureDescription.comments.length;
    document.querySelector(".social__caption").textContent =
      pictureDescription.description;
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
      renderBigPicture(window.picturesDescriptions[index]);
      renderComments(window.picturesDescriptions[index]);
    });
  }
})();
