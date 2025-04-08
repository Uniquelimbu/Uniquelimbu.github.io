export const fadeIn = (duration = 0.5) => {
    return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration } },
    };
};

export const slideIn = (direction = 'left', duration = 0.5) => {
    return {
        hidden: { x: direction === 'left' ? -100 : 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration } },
    };
};

export const scaleUp = (duration = 0.5) => {
    return {
        hidden: { scale: 0 },
        visible: { scale: 1, transition: { duration } },
    };
};

export const bounce = (duration = 0.5) => {
    return {
        hidden: { y: -20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { 
                duration, 
                bounce: 0.3 
            } 
        },
    };
};