import { useEffect, useState } from "react";
import { convertToMinutesText } from "../utils";

function Timer({ timeInSec }) {
  const [timeLeft, setTimeLeft] = useState(timeInSec);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        return;
      }

      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  return (
    <h3 className="position-fixed top-0 end-0">
      <span className="badge text-bg-dark">{convertToMinutesText(timeLeft)}</span>
    </h3>
  );
}

export default Timer;
