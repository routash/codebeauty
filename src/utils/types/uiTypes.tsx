import type { ElementType } from 'react';

export type HeadingProps = {
    title: string;
    description?: string | null;
    as?: ElementType;
    align?: 'left' | 'center' | 'right';
    className?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};