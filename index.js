const maxWaitTime = 500;
const skipNavEl = document.querySelector(".skip-nav-link");
let isFocused = false;
let waitTime = 0;
let inTransition = false;
const delay = ms => new Promise(res => setTimeout(res, ms));
const transitionOut = async () => {
    inTransition = true;
    while (waitTime > 0 && !isFocused) {
        await delay(10);
        waitTime -= 10;
    }
    if (!isFocused) {
        skipNavEl.style.left = "-240px";
        skipNavEl.style.transition = "left 3s";
    }
    inTransition = false;
};

skipNavEl.addEventListener("focusout", () => {
    isFocused = false;
    skipNavEl.style.left = "-20px";
    if (!inTransition) {
        transitionOut();
    }
});

skipNavEl.addEventListener("focus", () => {
    isFocused = true;
    waitTime = maxWaitTime;
    skipNavEl.style.left = "-20px";
    skipNavEl.style.transition = "left 0.3s";
});
