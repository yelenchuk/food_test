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
  const deadline = "2021-06-18";

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
    modalWindow = document.querySelector(".modal"),
    closeModal = document.querySelector("[data-close]");

  function openModal() {
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

  closeModal.addEventListener("click", closeModalWindow);

  modalWindow.addEventListener("click", (e) => {
    // делаеи закрытие по подложке
    if (e.target === modalWindow) {
      console.log(e);
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

  //const modalTimerId = setTimeout(openModal, 10000);

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

  // class for Card
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeTOUAH();
    }

    changeTOUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
      <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    25,
    ".menu .container"
  ).render();
});
