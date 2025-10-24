import { startCountdown } from "../timer";
describe("Timer Utility", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("calls onTick with decreasing time and onComplete when done", () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const stop = startCountdown(3, onTick, onComplete);

    expect(onTick).toHaveBeenCalledWith(3);

    jest.advanceTimersByTime(1000);

    expect(onTick).toHaveBeenCalledWith(2);

    jest.advanceTimersByTime(2000);

    expect(onTick).toHaveBeenCalledWith(0);

    expect(onComplete).toHaveBeenCalled();

    stop();
  });

  test("stops timer when stop function is called", () => {
    const onTick = jest.fn();

    const onComplete = jest.fn();

    const stop = startCountdown(5, onTick, onComplete);

    stop();

    jest.advanceTimersByTime(10000);

    expect(onTick).toHaveBeenCalledTimes(1);

    expect(onComplete).not.toHaveBeenCalled();
  });
});
