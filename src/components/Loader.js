import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Toast, ToastHeader } from 'reactstrap';

const Loaders = () => {
    const highlights = useSelector(state => state.highlights);
    console.log('highlights',highlights);



    return (
        <Fragment>
            <div style={{ position: "fixed", top: "10px", left: "50%", transform: "translateX(-50%)", zIndex: "1111111" }}>
                <Toast isOpen={highlights.loading}>
                    <ToastHeader icon={<Spinner size="sm" color="#0d6efd">Loading...</Spinner>}>
                        Loading...
                    </ToastHeader>
                </Toast>
            </div>
        </Fragment>
    )
}

export default Loaders;