import React from 'react';

export default function Thumb(props) {
  const {
    selected, img, index, onClick,
  } = props;

  return (
    <div
      className={'relative h-[120px] w-[256px] bg-white overflow-hidden '.concat(
        selected ? ' outline outline-2 outline-stroke-light-blue' : ' opacity-50',
      )}
    >
      <button
        onClick={onClick}
        className="h-full w-full"
        type="button"
      >
        {img}
      </button>
    </div>
  );
}
