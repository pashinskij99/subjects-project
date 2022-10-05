import React from 'react';
import { Team } from '../Team/Team';

const Slide8 = ({ appLoad, isMobile }) => {
    return (
        <div
            className="slide-8 slide-i section5"
            data_id={8}
        >
            <Team appLoad={appLoad} isMobile={isMobile} />
        </div>
    );
};

export default Slide8;
