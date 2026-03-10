'use client'
import HistoryFooter from '@/app/components/profil/sejarah/HistoryFooter';
import Founders from '@/app/components/profil/sejarah/Founder';
import LogoExplanation from '@/app/components/profil/sejarah/LogoExplanation';
import Timeline from '@/app/components/profil/sejarah/Timeline';
import React from 'react';

const HistoryPage: React.FC = () => {
    return (
        <div className="">
            <Timeline />
            <LogoExplanation />
            <Founders />
            <HistoryFooter />
        </div>
    )
};

export default HistoryPage;