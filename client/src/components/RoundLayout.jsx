import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const handleDropCaption = (id) => {
    const caption = captions.find((c) => c.id === id);
    setSelectedCaption(caption);
};

