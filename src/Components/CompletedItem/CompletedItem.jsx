import { useState } from 'react';

const CompletedItem = ({ index, handleCompletedListItem }) => {
  const handleCompleted = () => {
    handleCompletedListItem(index);
  };

  return (
    <div>
      <button onClick={handleCompleted}>Completed</button>
    </div>
  );
};

export default CompletedItem;
