import React from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

function Pagination({ total, pageSize, page, setPage, setPageSize }) {
    const totalPages = Math.ceil(total / pageSize);
    return (
        <div className="gap-2 text-slate-800 flex items-center justify-end mt-4">

            <div className="flex items-center space-x-2">
                <p>1-{pageSize}  of 100 items </p>
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1  rounded"><MdKeyboardArrowLeft size={25} /></button>
                <span className='border-2 rounded px-3 py-1 mr-3'>{page}</span>
                <span>  {page + 1}</span>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-2 py-1 rounded"><MdKeyboardArrowRight size={25} /></button>
            </div>
            <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                <label className="mr-2"></label>
                <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="outline-0">
                    {[10, 50, 100].map(size => <option key={size}>{size}</option>)}
                </select>
            </div>
        </div>
    );
}

export default Pagination;
