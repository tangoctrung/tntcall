'use client'
import { dataMessage } from '@/constants/data'
import { convertNameToTwoChar, randomColor } from '@/utils/string'
import { convertTimeToSince } from '@/utils/time'
import { list } from 'postcss'
import React, { useEffect, useRef, useState } from 'react'

function ChatMessage() {

    const [listMessage, setListMessage] = useState<any[]>(dataMessage)
    const [textMessage, setTextMessage] = useState<string>("")
    const __itemMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        __itemMessageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [listMessage?.length]);

    const handleTypeText = (e: any) => {
        setTextMessage(e?.target?.value)
    }

    const handleSendMessage = (e: any) => {
        e?.preventDefault();
        const dataMessage = {
            name: "Ta Ngoc Trung",
            content: textMessage,
            type: "text",
            createdAt: new Date().getTime(),
        }
        let messages = [...listMessage]
        messages.push(dataMessage)
        setListMessage(messages)
        setTextMessage("")
    }
    return (
        <div
            className='h-full p-4'
        >

            <div className='mt-4 h-[calc(100%-48px)] overflow-scroll scrollbar-none'>
                {listMessage && listMessage?.length > 0 && listMessage?.map((item: any, index: number) => (
                    <div key={index} className='flex items-start justify-start py-2' ref={__itemMessageRef}>
                        <div
                            className={`w-7 h-7 rounded-full bg-slate-500 flex items-center justify-center text-xs font-semibold`}
                        // style={{ backgroundColor: `${randomColor()}` }}
                        >
                            {convertNameToTwoChar(item?.name)}
                        </div>
                        <div className='w-[calc(100%-28px)]'>
                            <div className='ml-2 text-xs font-extrabold'>
                                {item?.name}
                                <span className='ml-2 text-[11px] text-gray-500 font-normal'>{convertTimeToSince(item?.createdAt)}</span>
                            </div>
                            <div className='text-sm ml-2 font-normal text-gray-400'>
                                {item?.content}
                            </div>
                        </div>


                    </div>
                ))}
            </div>

            <div className='h-8'>
                <form onSubmit={handleSendMessage}>
                    <input
                        className='px-3 py-[6px] w-full text-sm bg-slate-600 text-white rounded-md outline-none border-1'
                        type="text"
                        placeholder='Nhập tin nhắn...'
                        value={textMessage}
                        onChange={handleTypeText}
                    />
                </form>
            </div>
        </div>
    )
}

export default ChatMessage