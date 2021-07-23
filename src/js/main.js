window.addEventListener("DOMContentLoaded", () => {
  // Tab
  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent");
  tabParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  const deadline = "2021-08-01";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()), // получим кол-во млсек, которые будут в нашем конечном времни
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // считаем кол-во млсек и делим на кол-во млсек в одном дне
      hours = Math.floor((t / (1000 * 60 * 60)) % 24), // используем % остаток часов, которые не переходят в сутки
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    //функция будет подставлять 0, года день или часы однозначное число
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock(); //что-бы убрать мигание таймера при обновлении страницы

    function updateClock() {
      // обновление часов
      const t = getTimeRemaining(endtime); // расчет того времени, кторое осталось на текущий момент

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval); // если вышло время, таймен не обновляем
      }
    }
  }
  setClock(".timer", deadline);

  // const testBtn = document.querySelector(".r_btn");
  // testBtn.addEventListener("click", () => {
  //   const testStr = document.querySelector(".test_time"),
  //     timer = document.querySelector(".timer"),
  //     days = timer.querySelector("#days"),
  //     hours = timer.querySelector("#hours"),
  //     minutes = timer.querySelector("#minutes"),
  //     seconds = timer.querySelector("#seconds");

  //   testStr.innerHTML = `Сейчас на таймере ${
  //     days.textContent || days.innerText
  //   } дня ${hours.textContent || hours.innerText} часов ${
  //     minutes.textContent || minutes.innerText
  //   } минут ${seconds.textContent || seconds.innerText} sec`;
  // });

  // Modal

  const modalButton = document.querySelectorAll("[data-modal]"),
    modalWindow = document.querySelector(".modal");

  function openModal() {
    console.log("modal is open");
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden"; // фиксируем скролл
    clearInterval(modalTimerId); // чтобы не повторялось каждые 5 сек
  }

  modalButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

  function closeModalWindow() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalWindow.addEventListener("click", (e) => {
    // делаеи закрытие по подложке
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModalWindow();
    }
  });

  document.addEventListener("keydown", (e) => {
    //  закрытие модального окна через  esc
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      // contains - проверяет наличие класса
      closeModalWindow();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);

  function showModalByScroll() {
    // всплытие модального окна в конце страницы
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // class for crate Card menu

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeTOUAH();
    }

    changeTOUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    // getResource, когда  мы получаем данные с сервера
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидуем ошибку
    }

    return await res.json();
  };

  getResource("http://localhost:3333/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render(); // ".menu .container" прописываем родителя куда добавляем
    });
  });

  // getResource("http://localhost:3333/menu").then((data) => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement("div");
  //     element.classList.add("menu__item");
  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg} />
  //           <h3 class="menu__item-subtitle">${title}</h3>
  //           <div class="menu__item-descr">
  //             ${descr}
  //           </div>
  //           <div class="menu__item-divider"></div>
  //           <div class="menu__item-price">
  //             <div class="menu__item-cost">Цена:</div>
  //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //           </div>
  //     `;
  //     document.querySelector(".menu .container").append(element);
  //   });
  // }

  //Forms

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы скоро с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    // postData постинг данных, когда мы отправляем их на сервер
    const res = await fetch(url, {
      method: "POST", // куда
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }, // каким образом
      body: data, // что именно
    });

    return await res.json();
  };

  function bindPostData(form) {
    // ф-ция отвечает за привязку постинга
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
      diasplay: block;
      margin: 0 auto;
      `;
      //form.appendChild(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3333/requests", json)
        .then((data) => {
          console.log("data is - ", data);
          showThanksModal(message.success);
          statusMessage.remove(); //  удаляем сообщения
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset(); //очищаем форму  поля
        });
    });
  }

  function showThanksModal(message) {
    //message сообщение об отправке , которое будет показываться пользователю
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide"); // показать блок
    prevModalDialog.classList.remove("show");
    openModal();

    const thanksModal = document.createElement("div"); // создать блок
    thanksModal.classList.add("modal__dialog");
    // наполнить блок контентом
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove(); // делаем этот шаг что-бы не накапливались блоки
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModalWindow();
    }, 4000);
  }

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
      console.log("--->", slideTo);
      slideIndex = slideTo;
      offSet = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offSet}px)`;

      activeSlideNumber();
      activeDot();
    });
  });

  // Calc

  const result = document.querySelector(".calculating__result span");
  let sex = "femaile",
    height,
    weight,
    age,
    ratio = 1.375;

  function calcTotal() {
    // делаем проверку на ввод всех input
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "______";
      return; //прерываем фунцию чтобы скрипт не пошел дальше
    }

    if (sex === "famale") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
      console.log(result);
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
      console.log(result);
    }
  }

  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
        } else {
          sex = e.target.getAttribute("id");
        }

        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    console.log(input, selector);

    input.addEventListener("input", () => {
      switch (input.getAttribute("id")) {
        case "heigth":
          height = +input.value;
          console.log(height);
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  getDynamicInformation("#heigth");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
});
