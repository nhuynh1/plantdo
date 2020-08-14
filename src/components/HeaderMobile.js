import React from 'react';
import { Logout as LogoutButton, Today as TodayButton } from './Buttons';

import '../styles/HeaderMobile.css';

const HeaderMobile = () => {
    return (
        <div className="HeaderMobile">
            <TodayButton />
            <LogoutButton />
        </div>
    )
}

export default HeaderMobile;