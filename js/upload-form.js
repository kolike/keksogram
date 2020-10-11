(function () {
  var EFFECT_LEVEL_LINE_LENGTH_MAX = 450;
  var EFFECT_LEVEL_LINE_LENGTH_MIN = 0;
  var EFFECT_LEVEL_VALUE_MAX = 100;
  var EFFECT_LEVEL_VALUE_MIN = 0;
  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  var uploadFileForm = document.querySelector(".img-upload__input");
  var imageUploadOverlay = document.querySelector(".img-upload__overlay");
  var scaleDownButton = document.querySelector(".scale__control--smaller");
  var scaleUpButton = document.querySelector(".scale__control--bigger");
  var scaleValue = document.querySelector(".scale__control--value");
  var imageUploadPreview = document.querySelector(".img-upload__preview");
  var effectList = document.querySelectorAll(".effects__radio");
  var buttonCloseUploadFile = document.querySelector(".img-upload__cancel");
  var effectLevelPin = document.querySelector(".effect-level__pin");
  var effectLevelValue = document.querySelector(".effect-level__value");
  var effectLevelDepth = document.querySelector(".effect-level__depth");
  var textComment = document.querySelector(".text__description");
  var isTextCommentFocused = false;

  imageUploadPreview.classList.add("effects__preview--none");

  scaleDownButton.addEventListener("click", scaleDown);
  scaleUpButton.addEventListener("click", scaleUp);

  uploadFileForm.addEventListener("change", function () {
    uploadFileForm.value = "";
    imageUploadOverlay.classList.remove("hidden");
  });

  textComment.addEventListener("focus", function () {
    isTextCommentFocused = true;
  });

  textComment.addEventListener("blur", function () {
    isTextCommentFocused = false;
  });
  window.addEventListener("keydown", function (evt) {
    if (
      window.keyboardUtils.isEscKeyDown(evt) &&
      !window.isTextHashtagsFocused &&
      !isTextCommentFocused
    ) {
      imageUploadOverlay.classList.add("hidden");
    }
  });

  buttonCloseUploadFile.addEventListener("click", function () {
    imageUploadOverlay.classList.add("hidden");
  });

  effectLevelPin.addEventListener("mousedown", function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      effectLevelPin.style.left = effectLevelPin.offsetLeft - shift.x + "px";

      effectLevelValue.value =
        (EFFECT_LEVEL_VALUE_MAX * effectLevelPin.offsetLeft) /
        EFFECT_LEVEL_LINE_LENGTH_MAX;
      effectLevelDepth.style.width = effectLevelValue.value + "%";

      applyLevelEffect(checkEffect());

      if (Math.floor(effectLevelValue.value) >= EFFECT_LEVEL_VALUE_MAX) {
        effectLevelPin.style.left = EFFECT_LEVEL_LINE_LENGTH_MAX + "px";
        effectLevelDepth.style.width = EFFECT_LEVEL_VALUE_MAX + "%";
      } else if (Math.ceil(effectLevelValue.value) <= EFFECT_LEVEL_VALUE_MIN) {
        effectLevelPin.style.left = EFFECT_LEVEL_LINE_LENGTH_MIN + "px";
        effectLevelDepth.style.width = EFFECT_LEVEL_VALUE_MIN + "%";
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      onMouseMove(upEvt);

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  for (var i = 0; i < effectList.length; i++) {
    addEffectClickHandler(effectList[i], i);
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

    imageUploadPreview.classList.add(
      `effects__preview--${effectList[i].value}`
    );
    applyLevelEffect(`${effectList[i].value}`);
  }

  function applyLevelEffect(effect) {
    switch (effect) {
      case "none":
        imageUploadPreview.style.filter = "none";
        break;
      case "chrome":
        imageUploadPreview.style.filter = `grayscale(${
          effectLevelValue.value / 100
        }`;
        break;
      case "sepia":
        imageUploadPreview.style.filter = `sepia(${
          effectLevelValue.value / 100
        })`;
        break;
      case "marvin":
        imageUploadPreview.style.filter = `invert(${
          effectLevelValue.value + "%"
        })`;
        break;
      case "phobos":
        imageUploadPreview.style.filter = `blur(${
          effectLevelValue.value * 0.05 + "px"
        }`;
        break;
      case "heat":
        imageUploadPreview.style.filter = `brightness(${
          effectLevelValue.value * 0.03
        }`;
        break;
    }
  }

  function checkEffect() {
    if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--none"
    ) {
      return "none";
    } else if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--chrome"
    ) {
      return "chrome";
    } else if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--sepia"
    ) {
      return "sepia";
    } else if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--marvin"
    ) {
      return "marvin";
    } else if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--phobos"
    ) {
      return "phobos";
    } else if (
      imageUploadPreview.classList.value ==
      "img-upload__preview effects__preview--heat"
    ) {
      return "heat";
    }
  }
})();
