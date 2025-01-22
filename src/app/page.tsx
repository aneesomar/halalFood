import Tile from '../components/Tile';
import '../app/globals.css';


export default function Home() {
    const restaurants = [
        {
            name: 'Haiku Restaurant',
            description: 'The best Asian restaurant with sushi, dim sum...',
            distance: 0.6,
            reviews: 584,
            image: '/images/sushi.jpg',
            rating: 4.5,
        },
        {
            name: 'Hacienda Coastal Mexican',
            description: 'An extraordinary dining experience...',
            distance: 0.4,
            reviews: 107,
            image: '/images/paneer-tikka.jpg',
            rating: 4.1,
        },
        {
            name: 'Mantra Cafe',
            description: 'Delicious mussels and tuna ceviche...',
            distance: 5.3,
            reviews: 950,
            image: '/images/the-magic-of-mantra.jpg',
            rating: 4.8,
        },
        {
            name: 'Haiku Restaurant',
            description: 'The best Asian restaurant with sushi, dim sum...',
            distance: 0.45,
            reviews: 584,
            image: '/images/sushi.jpg',
            rating: 5,
        },
        {
            name: 'Hacienda Coastal Mexican',
            description: 'An extraordinary dining experience...',
            distance: 0.4,
            reviews: 107,
            image: '/images/paneer-tikka.jpg',
            rating: 4.1,
        },
        {
            name: 'Mantra Cafe',
            description: 'Delicious mussels and tuna ceviche...',
            distance: 5.3,
            reviews: 950,
            image: '/images/the-magic-of-mantra.jpg',
            rating: 4.8,
        },
    ];
    //sort resturants by distance
    const sortedRestaurants = restaurants.sort((a, b) => (b.rating / b.distance) - (a.rating / a.distance));

    return (
        <div className="p-8 space-y-4">
            <h1 className='title'>Rest Halaal</h1>

            {restaurants.map((restaurant, index) => (
                <Tile
                    key={index}
                    name={restaurant.name}
                    description={restaurant.description}
                    distance={restaurant.distance}
                    reviews={restaurant.reviews}
                    image={restaurant.image}
                    rating={restaurant.rating}
                />
            ))}
        </div>
    );
}
