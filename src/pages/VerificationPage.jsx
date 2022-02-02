import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { API_URL } from '../helper';
import { verifyAction } from '../redux/actions';

const VerificationPage = (props) => {

    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch()
    const verify = async () => {
        try {
            let res = await dispatch(verifyAction())
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <Button type='button' onClick={verify}>Verifikasi Akun</Button>
        </div>
    )
}

export default VerificationPage;