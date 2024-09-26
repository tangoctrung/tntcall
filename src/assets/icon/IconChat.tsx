import React, { SVGProps } from 'react'

function IconChat(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            id="Icons"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            {...props}
        >
            <path className="cls-1" d="M20,0H4A4,4,0,0,0,0,4V16a4,4,0,0,0,4,4H6.758l3.121,3.121a3,3,0,0,0,4.242,0L17.242,20H20a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,16a2,2,0,0,1-2,2H16.828a1,1,0,0,0-.707.293l-3.414,3.414a1,1,0,0,1-1.414,0L7.879,18.293A1,1,0,0,0,7.172,18H4a2,2,0,0,1-2-2V4A2,2,0,0,1,4,2H20a2,2,0,0,1,2,2Z" />
            <path className="cls-1" d="M18,5H6A1,1,0,0,0,6,7H18a1,1,0,0,0,0-2Z" />
            <path className="cls-1" d="M18,9H6a1,1,0,0,0,0,2H18a1,1,0,0,0,0-2Z" />
            <path className="cls-1" d="M18,13H6a1,1,0,0,0,0,2H18a1,1,0,0,0,0-2Z" />
        </svg>

    )
}

export default IconChat