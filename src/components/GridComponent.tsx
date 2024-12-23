'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DailyInfoCard } from './DailyInfoCard';

const GridComponent = () => {
    // Sample data
    const items = [
        {
            id: 1,
            image: 'https://picsum.photos/id/10/800/600',
            title: 'Mountain lake',
            description: 'Description 1'
        },
        {
            id: 2,
            image: 'https://picsum.photos/id/12/800/600',
            title: 'Forest path',
            description: 'Description 2'
        },
        {
            id: 3,
            image: 'https://picsum.photos/id/15/800/600',
            title: 'Title 3',
            description: 'Description 3'
        },
        {
            id: 4,
            image: 'https://picsum.photos/id/17/800/600',
            title: 'Title 4',
            description: 'Description 4'
        },
        {
            id: 5,
            image: 'https://picsum.photos/id/29/800/600',
            title: 'Title 5',
            description: 'Description 5'
        },
        {
            id: 6,
            image: 'https://picsum.photos/id/82/800/600',
            title: 'Title 6',
            description:
                "Beyond the iconic pyramids of Egypt, a fascinating world of ancient pyramidal structures awaits discovery. In Sudan, the Nubian pyramids stand as testaments to the Kushite Kingdom, their reddish-brown bricks contrasting with the desert sands. Smaller and steeper than their Egyptian counterparts, these pyramids served as tombs for powerful pharaohs and queens.Journeying across the Atlantic, we encounter the majestic pyramids of Mesoamerica. The Maya civilization, renowned for its astronomical prowess, erected towering step pyramids like those at Tikal and Chichen Itza. These structures served as temples and ceremonial centers, their summits offering glimpses into the heavens. In heart of Mexico, the Aztec civilization constructed the magnificent Templo Mayor, a double pyramid dedicated to the gods Huitzilopochtli and Tlaloc. This awe-inspiring complex, adorned with intricate carvings and vibrant murals, stood as a symbol of Aztec power and religious devotion. These diverse pyramidal structures, each a product of unique cultures and beliefs, offer a glimpse into the ingenuity and ambition of ancient civilizations. They stand as enduring testaments to the human spirit's capacity for monumental creation and its enduring fascination with the cosmos."
        },
        {
            id: 7,
            image: 'https://picsum.photos/id/133/800/600',
            title: 'Title 7',
            description: 'Description 7'
        },
        {
            id: 8,
            image: 'https://picsum.photos/id/164/800/600',
            title: 'Title 8',
            description: 'Description 8'
        },
        {
            id: 9,
            image: 'https://picsum.photos/id/23/800/600',
            title: 'Title 9',
            description: 'Description 9'
        },
        {
            id: 10,
            image: 'https://picsum.photos/id/44/800/600',
            title: 'Title 10',
            description: 'Description 10'
        }
        // Add more items as needed to fill the 5x2 grid
    ];

    const [viewedItems, setViewedItems] = useState(new Set());
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCellClick = (item) => {
        setSelectedItem(item);
    };

    const handleDialogClose = () => {
        setViewedItems((prev) => new Set([...prev, selectedItem.id]));
        setSelectedItem(null);
    };

    return (
        <div className='h-screen p-4'>
            {selectedItem ? (
                <DailyInfoCard
                    imageSrc={selectedItem.image}
                    title={selectedItem.title}
                    description={selectedItem.description}
                    onClose={() => setSelectedItem(null)}
                />
            ) : (
                <div className='grid grid-rows-5 grid-cols-2 gap-4 h-full'>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleCellClick(item)}
                            className={`
                  cursor-pointer rounded-lg overflow-hidden
                  transition-all duration-200 ease-in-out
                  ${viewedItems.has(item.id) ? 'bg-gray-300' : 'hover:shadow-lg'}
                `}
                        >
                            {!viewedItems.has(item.id) && (
                                <div className='h-full relative'>
                                    <div className='absolute inset-0'>
                                        <img src={item.image} alt={item.title} className='object-cover w-full h-full' />
                                        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-90' />
                                    </div>
                                    <div className='relative h-full flex flex-col justify-between p-4'>
                                        <div className='flex-grow' />
                                        <div>
                                            <h3 className='text-lg font-semibold text-white mb-2'>{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* <Dialog open={selectedItem !== null} onOpenChange={() => handleDialogClose()}>
                {selectedItem && (
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle>{selectedItem.title}</DialogTitle>
                        </DialogHeader>
                        {/* <div className='mt-4'>
                            <div className='aspect-video relative mb-4'>
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    className='object-cover w-full h-full rounded'
                                />
                            </div>
                            <p className='text-gray-600'>{selectedItem.description}</p>
                        </div>
                    </DialogContent>
                )}
            </Dialog> */}
        </div>
    );
};

export default GridComponent;
