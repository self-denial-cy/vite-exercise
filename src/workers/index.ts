const start = () => {
  let count = 0;
  const timer = setInterval(() => {
    postMessage(++count);
    if (count === 10) {
      clearInterval(timer);
    }
  }, 2000);
};

start();
