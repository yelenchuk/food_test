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
  // testBtn.addEventListener("click", function () {
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
});
