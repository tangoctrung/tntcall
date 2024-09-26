'use client'
import React, { useState } from 'react'
import CardVideo from './CardVideo'
import IconCamera from '@/assets/icon/IconCamera'
import IconCameraHide from '@/assets/icon/IconCameraHide'
import IconMic from '@/assets/icon/IconMic'
import IconMicHide from '@/assets/icon/IconMicHide'
import IconChat from '@/assets/icon/IconChat'
import IconTV from '@/assets/icon/IconTV'

function CallContainer() {

    const [isMic, setIsMic] = useState<boolean>(false);
    const [isCamera, setIsCamera] = useState<boolean>(false);
    const [isShowChat, setIsShowChat] = useState<boolean>(false);
    const [listUser, setListUser] = useState<any[]>([]);
    const classAnimation = "transition-all duration-300 ease-linear";

    const handleDisplayCamera = () => {
        setIsCamera(i => !i)
    }
    const handleDisplayMic = () => {
        setIsMic(i => !i)
    }
    const handleShareScreen = () => {
        if (listUser?.length > 0) {
            setListUser([])
            return;
        }
        setListUser([1, 2, 3, 4, 5, 6, 7, 8])
    }
    const handleDisplayChat = () => {
        setIsShowChat(i => !i)
    }
    const handleClickOutSideChat = () => {
        setIsShowChat(false)
    }

    return (
        <div className='w-full h-full scrollbar-none overflow-hidden relative'>
            <div className='w-full h-full p-5 overflow-hidden flex flex-col lg:flex-row items-center'>
                <div className={`${listUser?.length > 0 ? "w-full lg:w-[70%] xl:w-[75%]" : "w-full"} ${classAnimation} ${listUser?.length > 0 ? "h-fit" : "h-full"} lg:h-full flex items-center justify-center`}>
                    <div className='w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[550px] xl:h-[650px] bg-slate-900 rounded-2xl'>

                    </div>
                </div>
                <div className={`flex my-4 lg:flex-col justify-center lg:justify-normal ${listUser?.length > 0 ? "w-full lg:w-[30%] xl:w-[25%] h-[200px]" : "w-0 h-0"} lg:h-full max-h-full ${classAnimation} overflow-scroll scrollbar-none ml-4`}>
                    {listUser?.map((item: any, index: number) => (
                        <div key={index} className='mx-2 lg:mx-0 lg:my-2 lg:w-full lg:h-[200px] w-[300px] h-full'>
                            <CardVideo />
                        </div>
                    ))}
                </div>
                {/* {listUser && listUser?.length > 0 &&
                    } */}
            </div>

            <div className='absolute left-4 right-4 bottom-6 h-[60px] flex justify-center'>
                <div className='flex justify-between items-center bg-slate-800/60 backdrop-blur-lg h-full w-fit rounded-2xl'>
                    <div
                        className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 hover:opacity-60 ${classAnimation}`}
                        onClick={handleDisplayCamera}
                    >
                        {isCamera ?
                            <IconCamera className='h-6 w-6 text-white' /> :
                            <IconCameraHide className='h-6 w-6 text-white' />}
                    </div>
                    <div
                        className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 hover:opacity-60 ${classAnimation}`}
                        onClick={handleDisplayMic}
                    >
                        {isMic ?
                            <IconMic className='h-6 w-6 text-white' /> :
                            <IconMicHide className='h-6 w-6 text-white' />}
                    </div>
                    <div
                        className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 hover:opacity-60 ${classAnimation}`}
                        onClick={handleShareScreen}
                    >
                        <IconTV className='h-6 w-6 text-white' />
                    </div>
                    <div
                        className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 hover:opacity-60 ${classAnimation}`}
                        onClick={handleDisplayChat}
                    >
                        <IconChat className='h-6 w-6 text-white' />
                    </div>
                </div>
            </div>

            <div>
                <div
                    className={`w-full h-full fixed top-0 left-0 opacity-0 z-10 ${isShowChat ? "block" : "hidden"}`}
                    onClick={handleClickOutSideChat}
                >

                </div>
                <div className={`w-[90%] xs:w-[400px] h-[calc(100%-32px)] fixed z-[11] top-4 rounded-2xl backdrop-blur-md bg-slate-800/60 ${classAnimation} ${isShowChat ? "right-4" : "right-[-400px]"}`}>

                </div>
            </div>
        </div>
    )
}

export default CallContainer