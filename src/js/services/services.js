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

const getResource = async (url) => {
  // getResource, когда  мы получаем данные с сервера
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`); // выкидуем ошибку
  }

  return await res.json();
};

export { postData };
export { getResource };
