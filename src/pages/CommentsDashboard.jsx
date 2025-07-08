import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

const STORAGE_KEY = 'dashboard_state';

function CommentsDashboard() {
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({ field: null, order: null });

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(data => setComments(data));

        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved) {
            setSearch(saved.search);
            setPage(saved.page);
            setPageSize(saved.pageSize);
            setSort(saved.sort);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ search, page, pageSize, sort }));
    }, [search, page, pageSize, sort]);

    const filtered = comments.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.body.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        if (!sort.field) return 0;
        const aVal = a[sort.field].toLowerCase?.() || a[sort.field];
        const bVal = b[sort.field].toLowerCase?.() || b[sort.field];
        if (aVal < bVal) return sort.order === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.order === 'asc' ? 1 : -1;
        return 0;
    });

    const startIndex = (page - 1) * pageSize;
    const pageData = sorted.slice(startIndex, startIndex + pageSize);

    const toggleSort = (field) => {
        setSort(prev => {
            if (prev.field !== field) return { field, order: 'asc' };
            if (prev.order === 'asc') return { field, order: 'desc' };
            if (prev.order === 'desc') return { field: null, order: null };
            return { field, order: 'asc' };
        });
    };

    return (
        <>
            <div className="px-16 py-8">
                <div className="flex justify-between mb-4">
                    {/* sort and search */}
                    <div className="flex space-x-4">
                        <div><button
                            onClick={() => toggleSort('postId')}
                            className="flex border-1 border-gray-300 px-3 py-1 rounded">
                            Sort Post ID <span><HiOutlineChevronUpDown className='mt-1 text-gray-400 hover:text-gray-500' /></span>
                        </button>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleSort('name')}
                                className="flex border-1 border-gray-300 px-3 py-1 rounded">
                                Sort Name <span><HiOutlineChevronUpDown className='mt-1 text-gray-400 hover:text-gray-500' /></span>
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={() => toggleSort('email')}
                                className="flex border-1 border-gray-300 px-3 py-1 rounded">
                                Sort Email <span><HiOutlineChevronUpDown className='mt-1 text-gray-400 hover:text-gray-500' /></span>
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center border-1 border-gray-300 px-3 py-3 rounded '>
                        <span><FiSearch className='text-gray-500' size={20} /></span>
                        <input
                            className="md:w-80 outline-0"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search name, email, comment"
                        />
                    </div>
                </div>
                {/* comments table */}
                <div className='border overflow-hidden rounded-lg w-full border-gray-100'>
                    <table className=" text-sm bg-white border-collapse">
                        <thead className="bg-gray-300 ">
                            <tr>
                                <th className="px-3 py-2 text-slate-800 border  border-gray-300">Post ID</th>
                                <th className="p-2  text-slate-800  border border-gray-300">Name</th>
                                <th className="p-2  text-slate-800  border border-gray-300">Email</th>
                                <th className="p-2  text-slate-800  border border-gray-300">Comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData.map(comment => (
                                <tr key={comment.id}>
                                    <td className="px-3 py-2 border-b-1  text-slate-800 font-semibold border-gray-300">{comment.postId}</td>
                                    <td className="p-2 border-b-1  text-slate-800  border-gray-300">{comment.name}</td>
                                    <td className="p-2 border-b-1  text-slate-800  border-gray-300">{comment.email}</td>
                                    <td className="p-2 border-b-1  text-slate-800  border-gray-300">{comment.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* pagination */}
                <Pagination
                    total={filtered.length}
                    pageSize={pageSize}
                    page={page}
                    setPage={setPage}
                    setPageSize={setPageSize}
                />
            </div>
        </>
    );
}

export default CommentsDashboard;
