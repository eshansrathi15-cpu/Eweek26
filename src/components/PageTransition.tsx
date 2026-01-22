import { motion } from "framer-motion";
import { ReactNode } from "react";

const variants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.61, 1, 0.88, 1] as any,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: [0.61, 1, 0.88, 1] as any,
        },
    },
};

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
