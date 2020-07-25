$(document).ready(function () {
  $("div#loading").fadeOut(500);

  let windowHash = window.location.hash;
  if (windowHash !== "") {
    $("html, body").animate(
      {
        scrollTop: $(windowHash).offset().top - 52,
      },
      200
    );
  }

  $("nav ul.navbar-nav a.nav-link").on("click", function (e) {
    $("div.navbar-collapse").removeClass("show");
    if (this.hash !== "") {
      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 66,
        },
        200
      );
    }
  });

  $("div#portfolio-nav a").on("click", function (e) {
    e.preventDefault();
    $("div#portfolio-nav a").removeClass("active");
    $(this).addClass("active");

    $(".portfolio-item")
      .removeClass("animate__zoomIn")
      .addClass("animate__zoomOut")
      .hide();

    let filterCat = $(this).data("filter");

    if (filterCat === "all") {
      $(".portfolio-item")
        .removeClass("animate__zoomOut")
        .show()
        .addClass("animate__zoomIn");
    } else {
      $(".portfolio-item")
        .filter(function () {
          return $(this).data("cat") === filterCat;
        })
        .removeClass("animate__zoomOut")
        .show()
        .addClass("animate__zoomIn");
    }
  });

  $(window).scroll(function (e) {
    if (
      $(this).scrollTop() >
      $("#info-client").offset().top - $(this).height() + 30
    ) {
      $("#info-client").removeClass("animate__fadeOutDown");
      $("#info-client").addClass("animate__fadeInUp");
    } else if (
      $(this).scrollTop() <
      $("#info-client").offset().top - $(this).height() + 30
    ) {
      $("#info-client").removeClass("animate__fadeInUp");
      $("#info-client").addClass("animate__fadeOutDown");
    }
  });

  const showModalDetail = (portfolio) => {
    const images = portfolio.images.map(
      (image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src=${image} class="img-fluid w-100" style="border-radius: 16px;"/>
        </div>
      `
    );

    // show or hide carousel control
    if (portfolio.images.length > 1) {
      $("#carousel-control").show();
    } else {
      $("#carousel-control").hide();
    }

    $("#modal-detail #modal-detail-name").text(portfolio.name);
    $("#modal-detail #modal-detail-description").text(portfolio.description);
    $("#modal-detail #modal-detail-tech-stack").text(portfolio.techstack);
    $("#modal-detail #modal-detail-image").html(images);

    if (portfolio.link) {
      $("#modal-detail #modal-detail-link").attr("href", portfolio.link);
      $("#modal-detail #modal-detail-link").parent().show();
    } else {
      $("#modal-detail #modal-detail-link").parent().hide();
      $("#modal-detail #modal-detail-link").attr("href", "#");
    }

    $("#modal-detail").modal();
  };

  fetch("https://my-json-server.typicode.com/justify-team/portfolio/portfolios")
    .then((res) => res.json())
    .then((data) => {
      let portfolioHTML = "";

      data.map((portfolio, index) => {
        portfolioHTML = `
          <div
            class="col-12 col-sm-6 col-lg-4 mt-4 portfolio-item animate__animated"
            data-cat="${portfolio.category}"
            id="${index}"
          >
            <div class="portfolio-image">
              <img
                src="${portfolio.images[0]}"
                alt=""
                class="img-fluid"
              />
            </div>
            <div class="overlay">
              <div class="overlay-content">
                <h6>${portfolio.name}</h6>
                <button type="button" class="btn btn-custom bg-j-gradient btn-detail">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        `;

        $("div#portfolio-items").append(portfolioHTML);
        $(`div#portfolio-items div#${index} button.btn-detail`).click(
          function () {
            showModalDetail(portfolio);
          }
        );
      });
    });

  $("button.btn-detail").click(function () {
    console.log(this);
  });
});
