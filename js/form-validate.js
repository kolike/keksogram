(function () {
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_COUNT = 5;
  var textHashtags = document.querySelector(".text__hashtags");
  var imgUploadSubmit = document.querySelector(".img-upload__submit");
  window.isTextHashtagsFocused = false;

  imgUploadSubmit.addEventListener("click", function () {
    var hashtagsValue = textHashtags.value;
    var errorMessage = checkValidation(hashtagsValue);
    if (errorMessage != null) {
      textHashtags.setCustomValidity(errorMessage);
    }
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

  function checkValidation(hashtagValue) {
    if (hashtagValue === "") {
      return null;
    }

    var hashtags = hashtagValue.split(" ");

    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      return "Нельзя указать больше пяти хэш-тегов";
    }

    if (!isHashtagsUnique(hashtags)) {
      return "Один и тот же хэш-тег не может быть использован дважды";
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
})();
