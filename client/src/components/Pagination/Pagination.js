import React, { useState } from 'react';
import { Pagination as PaginationPage } from '@material-ui/lab';
function Pagination() {
  const [productsPerPage, setProductsPerPage] = useState(9);
  return <PaginationPage onChange={(e, page) => {}}></PaginationPage>;
}

export default Pagination;
