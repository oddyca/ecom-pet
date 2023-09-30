import React from 'react';

export default function Thumb(props) {
  const {
    selected, img, index, onClick,
  } = props;

  return (
    <div
      className={'h-[120px] w-[256px]'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <div className="h-[120px] w-[256px] ">
          {img}
        </div>
      </button>
    </div>
  );
}
