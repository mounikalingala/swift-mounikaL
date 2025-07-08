import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ user }) {

    console.log(user)
    const navigate = useNavigate();
    const nameArr = user.name.split(" ")
    console.log(nameArr)
    const firstLetter = nameArr[0][0]
    const lastLetter = nameArr[1][0]
    console.log(firstLetter)
    console.log(lastLetter)
    return (
        <div className="flex items-center justify-between bg-slate-800 text-white px-16 py-6">
            <h1 className="text-4xl font-bold flex items-center">
                <span
                    className="text-white px-4 py-1"
                    style={{
                        backgroundColor: "#4CAF50",
                        clipPath: "polygon(0 0, 70% 0, 100% 100%, 0% 100%)",
                    }}
                >
                    S
                </span>
                <span className="text-white">WIFT</span>
            </h1>
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-slate-800 text-xl font-bold">{firstLetter + lastLetter}</div>
                <button onClick={() => navigate('/profile')} className="text-white">{user.name}</button>

            </div>
        </div>
    );
}


export default Header;
