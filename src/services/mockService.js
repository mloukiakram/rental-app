/**
 * Mock Service for Rental App
 * Generates realistic listing data and provides search/filtering capabilities.
 */

const LOCATIONS = [
    'Madrid, Spain',
    'Barcelona, Spain',
    'Seville, Spain',
    'Valencia, Spain',
    'Malaga, Spain',
    'Paris, France',
    'Rome, Italy',
    'Lisbon, Portugal'
];

const TYPES = ['Apartment', 'Villa', 'Loft', 'House', 'Cottage'];
const AMENITIES_LIST = ['Wifi', 'Kitchen', 'Pool', 'Air conditioning', 'Heating', 'Washer', 'Dryer', 'Parking', 'Gym', 'Hot tub'];

const IMAGES = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80'
];

function generateListings(count = 50) {
    const listings = [];
    for (let i = 1; i <= count; i++) {
        const type = TYPES[Math.floor(Math.random() * TYPES.length)];
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        const numAmenities = Math.floor(Math.random() * 5) + 3;
        const amenities = Array.from({ length: numAmenities }, () => AMENITIES_LIST[Math.floor(Math.random() * AMENITIES_LIST.length)]);

        listings.push({
            id: i,
            title: `${type} with ${Math.random() > 0.5 ? 'Panoramic Views' : 'Great Amenities'}`,
            location: location,
            type: type,
            price: Math.floor(Math.random() * 500) + 50,
            rating: (Math.random() * 1.5 + 3.5).toFixed(2), // 3.5 to 5.0
            reviews: Math.floor(Math.random() * 300) + 10,
            image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
            images: IMAGES.sort(() => 0.5 - Math.random()).slice(0, 5), // Random 5 images
            guests: Math.floor(Math.random() * 8) + 2,
            bedrooms: Math.floor(Math.random() * 4) + 1,
            beds: Math.floor(Math.random() * 6) + 1,
            baths: Math.floor(Math.random() * 3) + 1,
            host: ['Maria', 'John', 'David', 'Sarah', 'Elena'][Math.floor(Math.random() * 5)],
            description: `Enjoy a stylish experience at this centrally-located ${type.toLowerCase()}. Perfect for families or groups looking to explore ${location.split(',')[0]}.`,
            amenities: [...new Set(amenities)], // Unique
            coordinates: {
                // Approximate variations to spread pins on a map
                lat: 40.4168 + (Math.random() - 0.5) * 0.1,
                lng: -3.7038 + (Math.random() - 0.5) * 0.1
            }
        });
    }
    return listings;
}

// Generate data once
const ALL_LISTINGS = generateListings(60);

export const mockService = {
    /**
     * Search listings with filters
     * @param {Object} params - { location, checkIn, checkOut, guests, priceMin, priceMax, type }
     */
    searchListings(params = {}) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                let results = ALL_LISTINGS;

                if (params.location) {
                    const term = params.location.toLowerCase();
                    results = results.filter(l => l.location.toLowerCase().includes(term));
                }

                if (params.guests) {
                    results = results.filter(l => l.guests >= Number(params.guests));
                }

                if (params.priceMax) {
                    results = results.filter(l => l.price <= Number(params.priceMax));
                }

                if (params.priceMin) {
                    results = results.filter(l => l.price >= Number(params.priceMin));
                }

                if (params.type && params.type !== 'Any') {
                    results = results.filter(l => l.type === params.type);
                }

                if (params.amenities && params.amenities.length > 0) {
                    // Filter listings that have ALL selected amenities
                    const requiredAmenities = Array.isArray(params.amenities) ? params.amenities : [params.amenities];
                    results = results.filter(l =>
                        requiredAmenities.every(req => l.amenities.includes(req))
                    );
                }

                resolve(results);
            }, 300); // 300ms delay
        });
    },

    getListingById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const listing = ALL_LISTINGS.find(l => l.id === Number(id));
                if (listing) resolve(listing);
                else reject(new Error('Listing not found'));
            }, 200);
        });
    },

    getReviews(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, user: 'Alice', date: 'October 2023', text: 'Absolutely stunning place! The views were incredible and the host was super responsive.' },
                    { id: 2, user: 'Michael', date: 'September 2023', text: 'Great location, very clean. Would definitely stay again.' },
                    { id: 3, user: 'Sofia', date: 'August 2023', text: 'Perfect for our family vacation. The pool was a hit with the kids!' },
                    { id: 4, user: 'David', date: 'July 2023', text: 'A bit smaller than expected, but very cozy and well-equipped.' }
                ]);
            }, 300);
        });
    }
};
