(function () {
  var hobbies = window.INTEREST_HOBBIES || [];

  function createCard(item) {
    var a = document.createElement("a");
    a.className = "interest-card";
    a.href = "detail.html?hobby=" + encodeURIComponent(item.id);

    var img = document.createElement("img");
    img.src = item.images[0].src;
    img.alt = item.title;
    img.loading = "lazy";
    a.appendChild(img);

    if (item.images.length > 1) {
      var badge = document.createElement("span");
      badge.className = "interest-card-count";
      badge.textContent = "+" + (item.images.length - 1);
      a.appendChild(badge);
    }

    var body = document.createElement("div");
    body.className = "interest-card-body";

    var h3 = document.createElement("h3");
    h3.textContent = item.title;
    body.appendChild(h3);

    a.appendChild(body);

    return a;
  }

  function renderGrid(selector, group) {
    var container = document.querySelector(selector);
    if (!container) return;
    hobbies
      .filter(function (item) {
        return item.group === group;
      })
      .forEach(function (item) {
        container.appendChild(createCard(item));
      });
  }

  renderGrid("[data-hobbies]", "hobby");
  renderGrid("[data-challenges]", "challenge");
})();
