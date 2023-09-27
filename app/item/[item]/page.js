'use client';

import React from 'react';

export default function page({ params }) {
  return (
    <div>
      <h1>{ params.item }</h1>
    </div>
  );
}
