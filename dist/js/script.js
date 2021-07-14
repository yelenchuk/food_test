/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener("DOMContentLoaded", () => {
  // Tab
  let tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent");
  tabParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
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
  }); // Timer

  const deadline = "2021-08-01";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          // получим кол-во млсек, которые будут в нашем конечном времни
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
          // считаем кол-во млсек и делим на кол-во млсек в одном дне
    hours = Math.floor(t / (1000 * 60 * 60) % 24),
          // используем % остаток часов, которые не переходят в сутки
    minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
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

  setClock(".timer", deadline); // const testBtn = document.querySelector(".r_btn");
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

  modalButton.forEach(btn => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

  function closeModalWindow() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalWindow.addEventListener("click", e => {
    // делаеи закрытие по подложке
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModalWindow();
    }
  });
  document.addEventListener("keydown", e => {
    //  закрытие модального окна через  esc
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      // contains - проверяет наличие класса
      closeModalWindow();
    }
  });
  const modalTimerId = setTimeout(openModal, 300000);

  function showModalByScroll() {
    // всплытие модального окна в конце страницы
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll); // class for crate Card menu

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
        this.classes.forEach(className => element.classList.add(className));
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

  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu .container").render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню "Премиум"', "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!", 14, ".menu .container").render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.", 25, ".menu .container").render(); //Forms

  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Мы скоро с вами свяжемся",
    failure: "Что-то пошло не так..."
  };
  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
      diasplay: block;
      margin: 0 auto;
      `; //form.appendChild(statusMessage);

      form.insertAdjacentElement("afterend", statusMessage); // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // //request.setRequestHeader("Content-type", "multipart/form-data");
      // request.setRequestHeader(
      //   "Content-type",
      //   "aplication/json; charset=utf-8"
      // ); // json

      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      fetch("server.php", {
        method: "POST",
        // куда
        headers: {
          "Content-type": "aplication/json; charset=utf-8"
        },
        // каким образом
        body: JSON.stringify(object) // что именно

      }) // .then((data) => data.text));
      .then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove(); //  удаляем сообщения
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset(); //очищаем форму  поля
      }); // request.send(json);
    });
  }

  function showThanksModal(message) {
    //message сообщение об отправке , которое будет показываться пользователю
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide"); // показать блок

    prevModalDialog.classList.remove("show");
    openModal();
    const thanksModal = document.createElement("div"); // создать блок

    thanksModal.classList.add("modal__dialog"); // наполнить блок контентом

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

  console.log("------>");
  fetch("http://localhost:3/menu").then(data => data.json()).then(res => console.log(res));
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map