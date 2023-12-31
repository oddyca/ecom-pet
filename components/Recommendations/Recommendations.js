import React from 'react';

import Items from '../Items/Items';

export default function Recommendations({ itemsForRecom }) {
  return (
    <Items fetchedProducts={itemsForRecom} />
  );
}
