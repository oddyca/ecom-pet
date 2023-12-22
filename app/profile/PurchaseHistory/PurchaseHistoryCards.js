import React from 'react';

export default function PurchaseHistoryCards() {
  const imageThumbnailClass = 'w-[72px] h-[96px] py-4 px-2 bg-white rounded border border-stroke-blue';

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full p-3 flex flex-col gap-2 h-auto rounded hover:bg-white relative">
        <p className="absolute top-2 right-2 text-[#D1D1D1]">#1</p>
        <div className="flex gap-2">
          <p className="text-red text-sm">Cancelled</p>
          <p className="text-icon-blue text-sm">22 Dec, 2023</p>
        </div>
        <p>2 items, $71.98</p>
        <div className="flex gap-2 h-auto">
          <div
            className={imageThumbnailClass}
            style={{
              backgroundImage: "url('https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg')", backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            }}
          />
          <div
            className={imageThumbnailClass}
            style={{
              backgroundImage: "url('https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg')", backgroundSize: '75%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
}
