export default function Tile({ name, description, distance, reviews, image }) {
    return (
        <div className="flex p-4 border rounded-lg shadow-md">
            {/* Image Section */}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* Text Section */}
            <div className="ml-4 flex flex-col justify-between">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>{distance} km</span>
                    <span>{reviews} reviews</span>
                </div>
            </div>
        </div>
    );
}
