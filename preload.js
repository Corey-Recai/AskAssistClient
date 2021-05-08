function rafAsync() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}

async function checkElement(selector) {
  console.log(selector);
  let querySelector = null;
  while (querySelector === null) {
    await rafAsync();
    querySelector = document.querySelector(selector);
  }
  return querySelector;
}

window.addEventListener("DOMContentLoaded", async () => {
  checkElement("a[href='https://trilobot.slack.com/']").then((element) => {
    console.info(element);
    // element.setAttribute("target", "_self");
    element.click();
    //window.open("https://trilobot.slack.com/", "_self");
  });
});
