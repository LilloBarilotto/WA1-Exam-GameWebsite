import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

const Timer = (props) => {
    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(props.seconds);
    const {center, radius, stroke1, stroke2 } = {center : 75, radius: 70, stroke1: 9, stroke2: 3} 

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
      <Container className="countdown">
        <Row><h3>Timer Left:</h3></Row>
        <Row className=''>
          <svg height="150" width="150">
            <circle 
              stroke="#1df9ba"
              fill="white"
              strokeWidth= {stroke1}
              r={radius}
              cx={center}
              cy={center}
            />
            <circle 
              stroke="#058862"
              fill="white"
              strokeDashoffset={-((timeLeft / 30) * radius * 2 * Math.PI) + radius * 2 * Math.PI}
              strokeDasharray={radius * 2 * Math.PI}
              strokeWidth={stroke2}
              r={radius}
              cx={center}
              cy={center}
            />
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black" // Adjust the color as needed
              fontSize="40px" // Adjust the font size as needed
            >
              {timeLeft}
            </text>
            <text
              x={center}
              y={center + 25} // Adjust this value to position "seconds" below timeLeft
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black" // Adjust the color as needed
              fontSize="15px" // Adjust the font size as needed
            >
              seconds
          </text>
          </svg>
        </Row>
      </Container>
    );
};

Timer.propTypes = {
    handleEndTimer: PropTypes.func,
    seconds: PropTypes.number,
}

export default Timer;