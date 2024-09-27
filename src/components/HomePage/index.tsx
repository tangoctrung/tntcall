'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Logo from "@/assets/images/logo.png";
import Modal from '../Modal';

function HomePage() {

    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errorName, setErrorName] = useState<string>("");
    const [codeCall, setCodeCall] = useState<string>("");

    const handleTypeCodeCall = (e: any) => {
        e.preventDefault();
        setError("Mã cuộc gọi không tồn tại");
        setIsOpenModal(true);
    }

    const handleJoinCall = (e: any) => {
        e.preventDefault();
        if (e?.target[0]?.value === "") {
            setErrorName("Bạn chưa điền tên của mình....")
            return;
        }
        router.push(`/${codeCall || "12345677"}`)
    }

    const handleChangeInputCode = (e: any) => {
        setCodeCall(e?.target?.value)
        setError("");
    }

    const handleChangeInputName = (e: any) => {
        setErrorName("");
    }

    const handleCreateCall = () => {
        setIsOpenModal(true)
    }
    return (
        <div className='w-full h-full flex justify-center items-center bg-slate-700'>
            <div className='w-[350px] h-[300px] rounded-lg shadow-sm flex justify-center items-center flex-col'>
                <Image
                    src={Logo}
                    height={100}
                    width={100}
                    alt=""
                />
                <button
                    className='mt-10 px-4 py-2 rounded bg-slate-500 text-white cursor-pointer font-semibold hover:opacity-80 transition-all duration-700 ease-linear'
                    onClick={handleCreateCall}
                >Tạo cuộc gọi mới</button>

                <div className='flex items-center justify-center mt-4'>
                    <p className='w-[100px] h-[1px] bg-slate-800 mr-2'></p>
                    hoặc
                    <p className='w-[100px] h-[1px] bg-slate-800 ml-2'></p>
                </div>

                <form onSubmit={handleTypeCodeCall} className='mt-4'>
                    <input
                        className={`bg-white text-black dark:bg-slate-600 dark:text-white outline-none border-2 ${error ? "border-red-600" : "border-slate-500"} px-2 py-2 rounded min-w-[300px]`}
                        type="text" placeholder='Nhập mã cuộc gọi và ấn enter...'
                        value={codeCall}
                        onChange={handleChangeInputCode}
                    />
                    <p className='text-sm font-normal text-red-600'>{error}</p>
                </form>
            </div>

            <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
                <form onSubmit={handleJoinCall}>
                    <input
                        className={`bg-white text-black dark:bg-slate-600 dark:text-white outline-none border-2 ${errorName ? "border-red-600" : "border-slate-500"}  px-2 py-2 rounded min-w-[300px]`}
                        type="text" placeholder='Nhập tên của bạn và ấn enter...'
                        autoFocus
                        onChange={handleChangeInputName}
                    />
                    <p className='text-sm font-normal text-red-600'>{errorName}</p>
                </form>
            </Modal>
        </div>
    )
}

export default HomePage