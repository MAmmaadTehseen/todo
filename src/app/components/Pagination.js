import * as React from 'react';
import { Pagination } from '@mui/material';

export default function TablePagination() {




    const handleChange = async (e, newPage) => {

        await setPage(newPage);






    };




    return (
        <Pagination count={pagesCount} page={page} onChange={handleChange} variant="outlined" shape="rounded" color='primary' />
    );
}
