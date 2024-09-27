import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode;
    isOpen?: boolean;
    setIsOpen?: any;
}

function Modal({
    children,
    isOpen,
    setIsOpen,
}: Props) {

    function handleCloseModal() {
        setIsOpen(false);
    }

    if (!isOpen) return <></>
    return (
        <div className="w-[100svw] h-[100svh] top-0 left-0 flex justify-center items-center fixed z-50">
            <div
                className="absolute top-0 left-0 w-full h-full z-[-1] cursor-pointer bg-slate-600/70 backdrop-blur"
                onClick={handleCloseModal}
                title='Click để đóng modal'
            />
            <div className="p-5 rounded-xl bg-slate-800">
                {children}
            </div>
        </div>
    )
}

export default Modal