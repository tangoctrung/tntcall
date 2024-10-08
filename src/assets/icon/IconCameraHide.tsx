import React, { SVGProps } from 'react'

function IconCameraHide(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            className="feather feather-camera-off"
            fill="none" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            viewBox="0 0 24 24"
            {...props}
        >
            <line x1="1" x2="23" y1="1" y2="23" />
            <path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56" />
        </svg>
    )
}

export default IconCameraHide