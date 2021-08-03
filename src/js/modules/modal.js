function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add("hide");
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
}

function openModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden"; // фиксируем скролл

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId); // если пользователь сам открыл модалкуБ мы очищаем интервалб чтобы модалка не открывалась сама
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalButton = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);

  modalButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(modalSelector, modalTimerId); // обварачиваем самовызывающую ф-цию в стрелочную
    });
  });

  modalWindow.addEventListener("click", (e) => {
    // делаеи закрытие по подложке
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModalWindow(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    //  закрытие модального окна через  esc
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      // contains - проверяет наличие класса
      closeModalWindow(modalSelector);
    }
  });

  function showModalByScroll() {
    // всплытие модального окна в конце страницы
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { closeModalWindow };
export { openModal };
