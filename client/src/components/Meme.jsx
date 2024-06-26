import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from "prop-types";

const MemeCard = ({ id, path_img }) => {
  return (
    <Card className="MemeCard" style={{ width: '25rem' }}>
      <Card.Img variant="top" src={path_img} alt={`Meme ${id}`} className="MemeImage" />
    </Card>
  );
};

MemeCard.propTypes = {
    id: PropTypes.number,
    path_img: PropTypes.string
};

export default MemeCard;