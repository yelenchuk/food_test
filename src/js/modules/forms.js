function forms() {
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
}

export default forms;
