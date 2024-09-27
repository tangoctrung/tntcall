import { dataUserJoinCall } from '@/constants/data'
import React, { useState } from 'react'

function ChatMessage() {

    const [listMessage, setListMessage] = useState<any[]>(dataUserJoinCall)
    const [textSearch, setTextSearch] = useState<string>("")

    const handleTypeText = (e: any) => {
        setTextSearch(e?.target?.value)
    }
    return (
        <div
            className='h-full bg-slate-800/60 p-4'
            style={{ boxShadow: "rgba(30, 41, 59, 0.95) 0px 30px 60px -12px inset, rgba(30, 41, 59, 0.95) 0px 18px 36px -18px inset" }}
        >

            <div className='mt-4 h-[calc(100%-48px)] overflow-scroll scrollbar-none'>

            </div>

            <div className='h-8'>
                <input
                    type="text"
                    placeholder='Nhập tin nhắn...'
                    className='px-3 py-[6px] w-full text-sm bg-slate-600 text-white rounded-md outline-none border-1'
                    onChange={handleTypeText}
                />
            </div>
        </div>
    )
}

export default ChatMessage