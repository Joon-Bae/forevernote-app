import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SplashPage () {
    const history = useHistory();
    const user = useSelector((state) => state.session.user)
    if (user) {
        history.push('/home')
    }
    return (
        <div>
            <h1>splash page</h1>
        </div>
    )
}

export default SplashPage
