(function () {
  var hobbies = window.INTEREST_HOBBIES || [];
  var params = new URLSearchParams(location.search);
  var id = params.get("hobby");
  var item = hobbies.find(function (h) {
    return h.id === id;
  });

  var titleEl = document.querySelector("[data-title]");
  var crumbEl = document.querySelector("[data-crumb-title]");
  var backLinkEl = document.querySelector("[data-back-link]");
  var tilesEl = document.querySelector("[data-tiles]");

  if (!item) {
    titleEl.textContent = "見つかりませんでした";
    document.title = "見つかりませんでした | 趣味と関心 | Yuma Toyooka";
    return;
  }

  document.title = item.title + " | 趣味と関心 | Yuma Toyooka";
  titleEl.textContent = item.title;
  crumbEl.textContent = item.title;
  backLinkEl.href = item.group === "challenge" ? "/#challenges" : "/#hobbies";
  backLinkEl.textContent = item.group === "challenge" ? "これから挑戦" : "趣味一覧";

  item.images.forEach(function (image) {
    var tile = document.createElement("button");
    tile.type = "button";
    tile.className = "interest-card tile-card";

    var img = document.createElement("img");
    img.src = image.src;
    img.alt = item.title;
    img.loading = "lazy";
    tile.appendChild(img);

    var body = document.createElement("div");
    body.className = "interest-card-body";

    var p = document.createElement("p");
    p.className = "tile-caption";
    p.textContent = image.caption;
    body.appendChild(p);

    tile.appendChild(body);

    tile.addEventListener("click", function () {
      openLightbox(image);
    });

    tilesEl.appendChild(tile);
  });

  // ライトボックス（拡大表示のみ） -------------------------------------
  var lightbox = document.querySelector(".image-lightbox");
  var lightboxTitle = lightbox.querySelector(".image-lightbox-title");
  var lightboxImage = lightbox.querySelector(".image-lightbox-image");
  var lightboxCaption = lightbox.querySelector(".image-lightbox-caption");
  var lightboxClose = lightbox.querySelector(".image-lightbox-close");

  function openLightbox(image) {
    lightboxTitle.textContent = item.title;
    lightboxImage.src = image.src;
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = image.caption;
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
