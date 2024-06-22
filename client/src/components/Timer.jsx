import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const Timer = (props) => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(props.seconds);
  
    useEffect(() => {
      if (!timeLeft){
        props.handleEndTimer();
        return;
      }

      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    return (
      <div>
        <h2>{timeLeft}</h2>
      </div>
    );
};

Timer.propTypes = {
    handleEndTimer: PropTypes.func,
    seconds: PropTypes.number,
}

export default Timer;