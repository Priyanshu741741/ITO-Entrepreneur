import { Variants } from 'framer-motion';

export interface FadeInProps extends Variants {
    hidden: {
        y?: number;
        x?: number;
        opacity?: number;
    };
    show: {
        y?: number;
        x?: number;
        opacity?: number;
        transition: {
            type: string;
            duration: number;
            delay: number;
        };
    };
}

export function fadeIn(direction: 'up' | 'down' | 'left' | 'right', delay: number): FadeInProps; 