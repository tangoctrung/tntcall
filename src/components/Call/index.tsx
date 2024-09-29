'use client'
import React, { useEffect, useRef, useState } from 'react'
import CardVideo from './CardVideo'
import IconCamera from '@/assets/icon/IconCamera'
import IconCameraHide from '@/assets/icon/IconCameraHide'
import IconMic from '@/assets/icon/IconMic'
import IconMicHide from '@/assets/icon/IconMicHide'
import IconChat from '@/assets/icon/IconChat'
import IconTV from '@/assets/icon/IconTV'
import ListUserJoinCall from './ListUserJoinCall'
import ChatMessage from './ChatMessage'

function CallContainer() {

    const [isMic, setIsMic] = useState<boolean>(false);
    const [isCamera, setIsCamera] = useState<boolean>(false);
    const [isShowChat, setIsShowChat] = useState<boolean>(false);
    const [listUser, setListUser] = useState<any[]>([]);
    const classAnimation = "transition-all duration-300 ease-linear";
    const myVideo = useRef<any>(null);
    const mediaStreamRef = useRef<any>({ videoStream: null, audioStream: null });
    const [stream, setStream] = useState<any>();

    useEffect(() => {
        var listContainerUsers = document.getElementById("listContainerUser");
        if (!listContainerUsers) return;
        function scrollListUser(e: any) {
            if (listContainerUsers) {
                if (e.deltaY > 0) listContainerUsers.scrollLeft += 100;
                else listContainerUsers.scrollLeft -= 100;
            }
        }
        listContainerUsers.addEventListener("wheel", scrollListUser);

        return () => {
            listContainerUsers?.removeEventListener("wheel", scrollListUser);
        }
    }, [])

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            mediaStreamRef.current.videoStream = stream;
            if (myVideo.current) myVideo.current.srcObject = new MediaStream(stream.getVideoTracks());
            setIsCamera(true);
        } catch (err) {
            console.error('Error accessing camera.', err);
        }
    };

    const stopCamera = () => {
        if (mediaStreamRef.current.videoStream) {
            mediaStreamRef.current.videoStream.getVideoTracks().forEach((track: any) => track.stop());
            mediaStreamRef.current.videoStream = null;
            setIsCamera(false);
        }
    };

    const startMic = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current.audioStream = stream;
            if (myVideo.current) myVideo.current.srcObject.addTrack(stream.getAudioTracks()[0]);
            setIsMic(true);
        } catch (err) {
            console.error('Error accessing microphone.', err);
        }
    };

    const stopMic = () => {
        if (mediaStreamRef.current.audioStream) {
            mediaStreamRef.current.audioStream.getAudioTracks().forEach((track: any) => track.stop());
            mediaStreamRef.current.audioStream = null;
            setIsMic(false);
        }
    };

    const handleDisplayCamera = () => {
        if (isCamera) {
            stopCamera()
        } else {
            startCamera()
        }
    }
    const handleDisplayMic = () => {
        if (isMic) {
            stopMic()
        } else {
            startMic()
        }
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
                    <div className='w-full h-[200px] xs:h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[650px] 2xl:h-[700px] flex justify-center items-center bg-slate-900 rounded-2xl'>
                        <video
                            className='max-w-full max-h-full h-full scale-x-[-1]'
                            playsInline muted={isMic} ref={myVideo} autoPlay
                        />
                    </div>
                </div>
                <div className={`my-4 lg:ml-4 ${listUser?.length > 0 ? "w-full h-[200px] lg:h-full lg:w-[30%] xl:w-[25%]" : "w-0 h-0"} ${classAnimation} overflow-hidden flex justify-center items-center`}>
                    <div
                        className={`flex lg:flex-col lg:justify-normal w-fit h-full lg:h-fit max-h-full lg:w-full overflow-scroll scrollbar-none`}
                        id='listContainerUser'
                    >
                        {listUser?.map((item: any, index: number) => (
                            <div key={index} className='mx-2 lg:mx-0 lg:my-2 lg:w-full lg:h-[200px] w-[300px] h-full'>
                                <CardVideo />
                            </div>
                        ))}
                    </div>
                </div>
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
                ></div>
                <div className={`w-[90%] xs:w-[400px] h-[calc(100%-32px)] overflow-hidden fixed z-[11] top-4 rounded-2xl backdrop-blur-md bg-slate-800/60 ${classAnimation} ${isShowChat ? "right-4" : "right-[-400px]"}`}>
                    <div className='h-[40%] p-4 w-full overflow-hidden'>
                        <ListUserJoinCall />
                    </div>

                    <div className='h-2 w-full bg-slate-700'
                    // style={{ boxShadow: "rgba(0, 0, 0, 0.5) 0px 1px 2px 0px, rgba(0, 0, 0, 0.5) 0px 2px 6px 2px;" }}
                    ></div>

                    <div className='h-[calc(60%-8px)] w-full'>
                        <ChatMessage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallContainer