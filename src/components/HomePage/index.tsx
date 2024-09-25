'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Logo from "@/assets/images/logo.png";

function HomePage() {

    const router = useRouter();
    const [error, setError] = useState<string>("");

    const handleJoinCall = (e: any) => {
        e.preventDefault();
        setError("Mã cuộc gọi không tồn tại");
        // router.push(`/${e?.target[0].value}`)
    }

    const handleChangeInput = (e: any) => {
        setError("");
    }

    const handleCreateCall = () => {
        router.push("/123456789")
    }
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-[350px] h-[300px] rounded-lg shadow-sm flex justify-center items-center flex-col'>
                <Image
                    src={Logo}
                    height={100}
                    width={100}
                    alt=""
                />
                <button
                    className='mt-10 px-4 py-2 rounded bg-slate-500 cursor-pointer text-white font-semibold hover:opacity-80 transition-all duration-700 ease-linear'
                    onClick={handleCreateCall}
                >Tạo cuộc gọi mới</button>

                <div className='flex items-center justify-center mt-4'>
                    <p className='w-[100px] h-[1px] bg-slate-800 mr-2'></p>
                    hoặc
                    <p className='w-[100px] h-[1px] bg-slate-800 ml-2'></p>
                </div>

                <form onSubmit={handleJoinCall} className='mt-4'>
                    <input
                        className={`outline-none border-2 ${error ? "border-red-600" : "border-slate-500"} px-2 py-2 rounded min-w-[300px]`}
                        type="text" placeholder='Nhập mã cuộc gọi và ấn enter...'
                        onChange={handleChangeInput}
                    />
                    <p className='text-sm font-normal text-red-600'>{error}</p>
                </form>
            </div>
        </div>
    )
}

export default HomePage