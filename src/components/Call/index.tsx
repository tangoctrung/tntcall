'use client'
import React from 'react'
import CardVideo from './CardVideo'
import IconCamera from '@/assets/icon/IconCamera'
import IconCameraHide from '@/assets/icon/IconCameraHide'
import IconMic from '@/assets/icon/IconMic'
import IconMicHide from '@/assets/icon/IconMicHide'
import IconChat from '@/assets/icon/IconChat'

function CallContainer() {

    const classAnimation = "hover:opacity-60 transition-opacity duration-300 ease-linear";
    return (
        <div className='w-full h-full scrollbar-none overflow-hidden relative'>
            <div className='w-full h-full overflow-scroll scrollbar-none grid gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((item: any, index: number) => (
                    <div key={index} className='col-span-1'>
                        <CardVideo />
                    </div>
                ))}
            </div>

            <div className='absolute left-4 right-4 bottom-6 h-[60px] flex justify-center'>
                <div className='flex justify-between items-center bg-slate-800/60 backdrop-blur-lg h-full w-fit rounded-2xl'>
                    <div className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 ${classAnimation}`}>
                        <IconCamera className='h-6 w-6' />
                    </div>
                    <div className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 ${classAnimation}`}>
                        <IconCameraHide className='h-6 w-6' />
                    </div>
                    <div className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 ${classAnimation}`}>
                        <IconMic className='h-6 w-6' />
                    </div>
                    <div className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 ${classAnimation}`}>
                        <IconMicHide className='h-6 w-6' />
                    </div>
                    <div className={`p-3 h-fit rounded-full cursor-pointer bg-slate-800 mx-4 ${classAnimation}`}>
                        <IconChat className='h-6 w-6' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallContainer