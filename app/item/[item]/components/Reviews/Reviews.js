'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllUsers, getReviews } from '../../../../../controller/serverController';

export default function Reviews() {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const usersData = await (await getAllUsers()).json();
      const loremResponse = await (await getReviews()).json();
      const loremReviews = loremResponse[0].split('.');

      setReviews(loremReviews);
      setUsers(usersData);
    };

    fetchReviews();
  }, []);

  const renderReviews = () => (
    <ul className="flex flex-col gap-2">
      {
        users.map((user, id) => (
          <li
            key={`${user.name.firstName}-${user.name.lastname}`}
            className="flex flex-col gap-2 p-4 border border-grey-stroke rounded bg-white"
          >
            <div className="flex gap-2 items-center">
              <div
                className="w-[40px] h-[40px] rounded-full bg-white border-2 border-stroke-blue grid place-content-center"
              >
                <Image
                  src="/profile-icon.svg"
                  width={14}
                  height={14}
                  alt="review profile icon"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h3 className="text-icon-blue font-bold capitalize">
                    {(user.name.firstname)}
                    {' '}
                    {user.name.lastname}
                  </h3>
                  <p className="text-sm text-neutral-300 capitalize">{user.address.city}</p>
                </div>
                <div className="w-[80px] h-[16px]">
                  <div
                    style={{
                      backgroundImage: "url('/rating-empty.svg')", backgroundSize: '16px', width: '100%', backgroundRepeat: 'repeat-x', height: '16px',
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: "url('/rating-full.svg')", backgroundSize: '16px', width: `${(id / 5) * 100}%`, backgroundRepeat: 'repeat-x', height: '16px',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8">
              <p className="px-4">{reviews[id]}</p>
            </div>
          </li>
        ))
      }
    </ul>
  );

  return (
    <div className="w-1/2 flex flex-col gap-3">
      {users.length === 0 && <p className="self-center">Loading...</p> }
      {reviews.length > 0 && renderReviews()}
    </div>
  );
}
