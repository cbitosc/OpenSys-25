import React from 'react';

const Logos: React.FC = () => {
    return (
        <div className='flex gap-3 items-center'>
           <img src="LogoCOSC.svg" alt="COSC" className="h-8 sm:h-12" />
           <p className="text-lg sm:text-xl">|</p>
           <img src="logo4x.png" alt="OpenSys" className="h-8 sm:h-12" />
        </div>
    );
};

export default Logos;
