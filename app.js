(function () {
  var hobbies = window.INTEREST_HOBBIES || [];

  function createCard(item) {
    var article = document.createElement("article");
    article.className = "interest-card";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", item.title + "の写真を見る");

    var img = document.createElement("img");
    img.src = item.images[0];
    img.alt = item.title;
    img.loading = "lazy";
    article.appendChild(img);

    if (item.images.length > 1) {
      var badge = document.createElement("span");
      badge.className = "interest-card-count";
      badge.textContent = "+" + (item.images.length - 1);
      article.appendChild(badge);
    }

    var body = document.createElement("div");
    body.className = "interest-card-body";

    var h3 = document.createElement("h3");
    h3.textContent = item.title;
    body.appendChild(h3);

    var p = document.createElement("p");
    p.textContent = item.comment;
    body.appendChild(p);

    article.appendChild(body);

    article.addEventListener("click", function () {
      openLightbox(item);
    });
    article.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });

    return article;
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

  // ライトボックス ---------------------------------------------------
  var lightbox = document.querySelector(".image-lightbox");
  var lightboxImage = lightbox.querySelector(".image-lightbox-image");
  var lightboxCaption = lightbox.querySelector(".image-lightbox-caption");
  var lightboxThumbs = lightbox.querySelector(".image-lightbox-thumbs");
  var lightboxClose = lightbox.querySelector(".image-lightbox-close");

  var currentItem = null;
  var currentIndex = 0;

  function showImage(index) {
    currentIndex = index;
    lightboxImage.src = currentItem.images[index];
    lightboxImage.alt = currentItem.title;
    Array.prototype.forEach.call(
      lightboxThumbs.querySelectorAll("img"),
      function (thumb, i) {
        thumb.classList.toggle("is-active", i === index);
      }
    );
  }

  function openLightbox(item) {
    currentItem = item;
    lightboxCaption.textContent = item.title + " — " + item.comment;
    lightboxThumbs.innerHTML = "";

    if (item.images.length > 1) {
      item.images.forEach(function (src, i) {
        var thumb = document.createElement("img");
        thumb.src = src;
        thumb.alt = item.title + " " + (i + 1);
        thumb.addEventListener("click", function (e) {
          e.stopPropagation();
          showImage(i);
        });
        lightboxThumbs.appendChild(thumb);
      });
      lightboxThumbs.hidden = false;
    } else {
      lightboxThumbs.hidden = true;
    }

    showImage(0);
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    currentItem = null;
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

  window.__openInterestLightbox = openLightbox;
})();
