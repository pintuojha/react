import { React } from 'react';

const popup = (content) => {
  return (
    <div className="popup">
      <div className="overlay"></div>
      <div className="content">
        {content}
      </div>
    </div>
  );
};

export default popup;
