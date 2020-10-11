(function () {
  window.mathUtils = {
    getRandomNumber: function (min, max) {
      var rand = min + Math.random() * (max - min + 1);
      return Math.floor(rand);
    }
  };
})();
