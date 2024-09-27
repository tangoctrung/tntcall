'use client'
import IconCamera from '@/assets/icon/IconCamera'
import IconCameraHide from '@/assets/icon/IconCameraHide'
import IconMic from '@/assets/icon/IconMic'
import IconMicHide from '@/assets/icon/IconMicHide'
import { dataUserJoinCall } from '@/constants/data'
import { convertNameToTwoChar, randomColor } from '@/utils/string'
import React, { useEffect, useState } from 'react'

function ListUserJoinCall() {
    const [listUserJoinCall, setListUserJoinCall] = useState<any[]>(dataUserJoinCall)
    const [textSearch, setTextSearch] = useState<string>("")

    useEffect(() => {
        const timeOut = setTimeout(() => {
            const dataUser = dataUserJoinCall?.filter((item: any) => item?.name?.toLowerCase()?.includes(textSearch?.toLowerCase()))
            setListUserJoinCall(dataUser)
        }, 500)
        return () => {
            clearTimeout(timeOut)
        }
    }, [textSearch])

    const handleSearchUser = (e: any) => {
        setTextSearch(e?.target?.value)
    }
    return (
        <div className='h-full'>
            <div className='h-8'>
                <input
                    type="text"
                    placeholder='Tìm kiếm ai đó...'
                    className='px-3 py-[6px] w-full text-sm bg-slate-600 text-white rounded-md outline-none border-1'
                    onChange={handleSearchUser}
                />
            </div>
            <div className='mt-4 h-[calc(100%-32px)] overflow-scroll scrollbar-none'>
                {listUserJoinCall && listUserJoinCall?.length > 0 && listUserJoinCall?.map((item: any, index: number) => (
                    <div key={index} className='flex items-center justify-between mb-4'>
                        <div className='flex items-center w-[calc(100%-30px)]'>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold`}
                                style={{ backgroundColor: `${randomColor()}` }}
                            >
                                {convertNameToTwoChar(item?.name)}
                            </div>
                            <div className='ml-2 text-sm font-semibold line-clamp-1 w-[calc(100%-45px)]'>{item?.name}</div>
                        </div>
                        <div className='flex items-center'>
                            {item?.isCamera ? <IconCamera className='w-4 h-4 mr-2' /> : <IconCameraHide className='w-4 h-4 mr-2' />}
                            {item?.isMic ? <IconMic className='w-4 h-4' /> : <IconMicHide className='w-4 h-4' />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ListUserJoinCall