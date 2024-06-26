// Caption.js

import React from 'react';
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';

const CaptionCard = (props) => {
  return (
    <Card className="CaptionCard" id={props.id} onClick={props.onClick}>
      <Card.Body>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>  
    </Card>
  );
};

CaptionCard.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string,
    onClick: PropTypes.func
};

export default CaptionCard;