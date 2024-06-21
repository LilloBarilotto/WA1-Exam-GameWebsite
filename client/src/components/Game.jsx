import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";

function GameLayout(props){

  useEffect(() => {
    if()
  }, []);

  


}

GameLayout.propTypes = {
  count: PropTypes.number,
  setCount: PropTypes.func,
  rounds: PropTypes.array,
  setRounds: PropTypes.func,
  anonymousGame: PropTypes.bool,
  setAnonymousGame: PropTypes.func
}

function RoundLayout(props) {
  return (
      <div className="container">
          <Row>
              <Col>
                  <h2>Round {props.count+1}</h2>
              </Col>
          </Row>
          <Row>
              {/*<Meme></Meme>*/}
              <CaptionList></CaptionList>          
          </Row>
      </div>
  );
}

export { Timer}