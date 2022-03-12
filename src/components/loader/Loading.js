import React from 'react';
import './Loading.scss'

const Loading = () => {
    return (
        <div className="loader">
            <div className="lds-hourglass"></div>
        </div>
    );
};

export default Loading;