import Header from '../components/Header';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Profile(user) {

    const nameArr = user.user.name.split(" ")

    const firstLetter = nameArr[0][0]
    const lastLetter = nameArr[1][0]

    if (!user.user) return <div className="p-6">Loading...</div>;
    console.log(user)
    return (
        <>
            <div className="px-16 py-8">
                <div className='flex items-center text-slate-800 '>
                    <Link to="/"><FaArrowLeftLong size={20} className='mr-2 mb-3' /></Link>
                    <h2 className="text-xl mb-4 font-semibold">Welcome, {user.user.name}</h2></div>
                <div className="bg-white p-6 rounded shadow space-y-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-slate-800 text-2xl font-bold">{firstLetter + lastLetter}</div>
                        <div>
                            <p className="font-semibold text-slate-800 text-xl">{user.user.name}</p>
                            <p className="text-gray-600 text-[14px]">{user.user.email}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className=''>
                            <label className="font-semibold text-gray-500 ">User ID</label>
                            <div className="bg-gray-100 font-semibold mt-4 rounded  px-6 py-2 text-slate-800">{user.user.id}</div>
                        </div>
                        <div>
                            <label className="font-semibold  text-gray-500">Phone</label>
                            <div className="bg-gray-100 font-semibold mt-4 rounded  px-6 py-2 text-slate-800">{user.user.phone}</div>
                        </div>
                        <div>
                            <label className="font-semibold  text-gray-500">Email</label>
                            <div className="bg-gray-100 font-semibold mt-4 rounded   px-6 py-2 text-slate-800">{user.user.email}</div>
                        </div>
                        <div>
                            <label className="font-semibold  text-gray-500">Address</label>
                            <div className="bg-gray-100 font-semibold mt-4 rounded  px-6 py-2 text-slate-800">{user.user.address.street}, {user.user.address.city}</div>
                        </div>
                        <div>
                            <label className="font-semibold  text-gray-500">Phone</label>
                            <div className="bg-gray-100 font-semibold mt-4 rounded px-6 py-2 text-slate-800">{user.user.phone}, {user.user.address.city}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
