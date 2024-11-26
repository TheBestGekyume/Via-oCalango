import React from 'react';
import './modalError.scss';

export function ModalError({ msg, closeModalError, code }) {
    return (
        <div className='container-modal-error'>
            <p>{msg}</p>
            <p onClick={closeModalError} style={{cursor:'pointer'}}>X</p>
        </div>
    )
}
