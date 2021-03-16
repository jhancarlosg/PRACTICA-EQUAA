import React from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { setAlert } from '../redux/actions';

export default function GlobalAlert ({msg, ...props}) {
    // const [show, setShow] = React.useState(true);
    const dispatch = useDispatch();
    props.className = "fixed-top w-100"+(props.className?' '+props.className:'')
    return <Alert onClose={() => dispatch(setAlert({}))} dismissible {...props} style={{...props.style, zIndex: 100000}}>
        {msg}
    </Alert>
}