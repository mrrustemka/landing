import "./styles.scss";

const timerDiv = document.querySelector<HTMLButtonElement>(".tariff__timer");
const button = document.querySelector<HTMLButtonElement>(
  ".tariff__button-credit"
);

function initializeTimer() {
  const now = new Date();
  const remainingTime = getTimeUntilMidnight(now);
  updateTimer(remainingTime);
  startCountdown(remainingTime);
}

function getTimeUntilMidnight(currentTime: Date): number {
  const midnight = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate() + 1,
    0,
    0,
    0
  );
  return Math.floor((midnight.getTime() - currentTime.getTime()) / 1000);
}

function updateTimer(remainingTime: number) {
  if (!timerDiv) return;

  const hours = Math.floor(remainingTime / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((remainingTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (remainingTime % 60).toString().padStart(2, "0");
  timerDiv.textContent = `${hours}:${minutes}:${seconds}`;
}

function startCountdown(remainingTime: number) {
  const interval = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      clearInterval(interval);
      updateTimer(0);
      disableButton();
      return;
    }

    updateTimer(remainingTime);
  }, 1000);
}

function disableButton() {
  if (button) {
    button.disabled = true;
  }
}

initializeTimer();

const buttons = document.querySelectorAll<HTMLButtonElement>(".tariff__button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const parentArticle = button.closest<HTMLElement>("article");
    const title =
      parentArticle?.querySelector<HTMLHeadingElement>("h3.tariff__title");

    if (title) {
      console.log(title.textContent);
    }
  });
});
