function modal() {
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
}

module.exports = modal;