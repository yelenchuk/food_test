function slider() {
  // Slider

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(".offer__slider");

  let slideIndex = 1;
  let offSet = 0; // отсутуп впрово или влево, чтобы  понять как управлять трансформом

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transitions = "0.5s all"; //  выравниваем слайды в одну линию по горизонтали
  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width; // чтобы все слайды,независимо от их ширины, поместились в slidesfield
  });

  slider.style.position = "relative";

  // add Dots for Slider
  const dotsWrapper = document.createElement("ol"),
    dots = [];
  dotsWrapper.classList.add("dot");
  dotsWrapper.style.cssText = `
   position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(dotsWrapper);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1); // создавем атрибут и указываем, что атрибут
    dot.style.cssText = `
   box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  `;
    if (i == 0) {
      dot.style.opacity = 1; // делаем активную точки
    }
    dotsWrapper.append(dot);
    dots.push(dot);
  }

  function activeDot() {
    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function activeSlideNumber() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  next.addEventListener("click", () => {
    //в условии преобразуем '500px' в 500px
    // == ширина 1 слайда + кол-во всех слайдов
    if (offSet == +width.replace(/\D/g, "") * (slides.length - 1)) {
      console.log(width, width.length, offSet);
      offSet = 0;
    } else {
      offSet += +width.replace(/\D/g, ""); // когда мы нажимаем на стрелочку, добавляеться ширина еще одного слайда
    }
    slidesField.style.transform = `translateX(-${offSet}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    activeSlideNumber();
    activeDot();
  });

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, "");
  }

  prev.addEventListener("click", () => {
    //в условии мы четко узнали, что сейчас четко 1й слайд
    if (offSet == 0) {
      offSet = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offSet -= deleteNotDigits(width); // отнимаем ширину слайда на которую смещаюсь
    }
    slidesField.style.transform = `translateX(-${offSet}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    activeSlideNumber();
    activeDot();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offSet = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offSet}px)`;

      activeSlideNumber();
      activeDot();
    });
  });
}

module.exports = slider;
