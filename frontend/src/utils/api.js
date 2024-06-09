import { useDeferredValue } from "react";

const getResponse = async (url, message, isCustomDoubt, history) => {
  // https://assignment-i3ww.vercel.app/
  if (isCustomDoubt) {
    return fetch("https://assignment-i3ww.vercel.app/api/custom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, history: history, doubt: message }),
    })
      .then((response) => response.json())
      .then((data) => data.message);
  } else {
    return fetch("https://assignment-i3ww.vercel.app/api/preprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url, history: history, doubt: message }),
    })
      .then((response) => response.json())
      .then((data) => data.message);
  }
};

const continueChat = async (message, history) => {
  return fetch("https://assignment-i3ww.vercel.app/api/continue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message, history: history }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.message;
    });
};

export default getResponse;
export { continueChat };
