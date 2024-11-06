import React, { ChangeEvent } from 'react'
import './style.css';

interface Props {
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value : string;
    message : string;
    messageError : boolean;
    buttonName? : string;
// return 값이 없으면 void로 작성한다
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onButtonClick?: () => void;
}

export default function MainInputBox({
    label, 
    type, 
    placeholder,
    value, 
    message,
    messageError,
    onChange
}: Props) {
    return (
        <div className='login-id-password-box'>
            <div className='login-id-box'>
                <div className='login-in-id-text'>{label}</div>
                <div className='login-in-id-box'>
                    <input value={value} type={type} placeholder={placeholder} onChange={onChange} />
                </div>
                <div className={`message ${messageError ? 'error' : 'primary'}`}>{message}</div>
            </div>
        </div> 
    )
}
