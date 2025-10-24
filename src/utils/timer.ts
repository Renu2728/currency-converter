export type StopFn = () => void;

export const startCountdown = (
  duration: number,
  onTick: (timeLeft: number) => void,
  onComplete: () => void
): StopFn => {
  let timeLeft = duration;
  onTick(timeLeft);

  const id = setInterval(() => {
    timeLeft -= 1;
    onTick(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(id);
      onComplete();
    }
  }, 1000);
  return () => clearInterval(id);
};