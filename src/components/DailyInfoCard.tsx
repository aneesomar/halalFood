import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';

type DailyInfoCardProps = {
    imageSrc: string;
    title: string;
    description: string;
    onClose: () => void;
};

export function DailyInfoCard({ imageSrc, title, description, onClose }: DailyInfoCardProps) {
    return (
        <div className='container mx-auto p-4'>
            <div className='relative aspect-[9/16] w-full overflow-hidden rounded-lg'>
                <Image src={imageSrc} alt={title} fill className='object-cover' />
                <div className='absolute bottom-0 left-0 right-0 bg-black/50 p-4'>
                    <h2 className='text-2xl font-bold text-white'>{title}</h2>
                    <p className='mt-2 text-lg text-white'>{description}</p>
                </div>
            </div>
            <Button className={cn('mt-4')} onClick={() => onClose()}>
                Close
            </Button>
        </div>
    );
}
