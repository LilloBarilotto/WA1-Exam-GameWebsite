// Caption.js

import React from 'react';
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';

const CaptionCard = ({ id, description }) => {
  return (
    <Card className="CaptionCard" id={id}>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

CaptionCard.propTypes = {
    id: PropTypes.number,
    description: PropTypes.string
};

export default CaptionCard;