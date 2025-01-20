import Tile from '../components/Tile';

export default function Home() {
    const restaurants = [
        {
            name: 'Haiku Restaurant',
            description: 'The best Asian restaurant with sushi, dim sum...',
            distance: 0.6,
            reviews: 584,
            image: '/images/sushi.jpg',
        },
        {
            name: 'Hacienda Coastal Mexican',
            description: 'An extraordinary dining experience...',
            distance: 0.4,
            reviews: 107,
            image: '/images/paneer-tikka.jpg',
        },
        {
            name: 'Mantra Cafe',
            description: 'Delicious mussels and tuna ceviche...',
            distance: 5.3,
            reviews: 950,
            image: '/images/the-magic-of-mantra.jpg',
        },
    ];

    return (
        <div className="p-8 space-y-4">
            {restaurants.map((restaurant, index) => (
                <Tile
                    key={index}
                    name={restaurant.name}
                    description={restaurant.description}
                    distance={restaurant.distance}
                    reviews={restaurant.reviews}
                    image={restaurant.image}
                />
            ))}
        </div>
    );
}
