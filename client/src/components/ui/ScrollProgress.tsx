import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const ScrollProgress: React.FC = () => {
    const [scrollPercent, setScrollPercent] = useState(0);
    const progress = useMotionValue(0);
    const smoothProgress = useSpring(progress, { stiffness: 120, damping: 20 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
            setScrollPercent(percent * 100);
            progress.set(percent);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [progress]);

    return (
        <div className="fixed inset-x-0 top-0 z-50 h-1 pointer-events-none">
            <motion.div
                className="h-full bg-gradient-to-r from-[#2FB8FF] to-[#0047AB]"
                style={{ scaleX: smoothProgress, transformOrigin: '0% 50%' }}
                aria-label="Scroll progress"
                role="presentation"
            />
            <span className="sr-only">Scrolled {scrollPercent.toFixed(0)}%</span>
        </div>
    );
};

export default ScrollProgress;
