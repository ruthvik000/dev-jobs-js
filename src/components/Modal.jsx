import React from 'react'

export default function Modal({open, children, onClose}) {
    if (!open) return null
    return (
        <>
            <div className='overlay-popup'/>
            <div className='modal-styles'>
                {children}
                <div>
                    <button onClick={onClose} type='button'>Close</button>
                </div>
            </div>
        </>
    )
}