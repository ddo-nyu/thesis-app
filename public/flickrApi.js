// Replace 'YOUR_FLICKR_API_KEY' with your actual Flickr API key
const apiKey = '50c68da9ee6d1b67a306e8f45061b676';

// Set the number of photos you want to fetch (optional)
const photoCount = 50;

// Function to make API request and fetch photos
async function fetchPhotos() {
    try {
        const params = {
            method: 'flickr.photos.search',
            api_key: apiKey,
            user_id: '145541986@N03',
            format: 'json',
            nojsoncallback: 1,
            per_page: photoCount,
            min_upload_date: 1690862400,
        };
        let urlStr = '';
        Object.keys(params).forEach(key => {
            urlStr += `${key}=${params[key]}&`
        });
        const url = `https://api.flickr.com/services/rest/?${urlStr}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.stat === 'ok') {
            const photos = data.photos.photo;
            return photos;
        } else {
            console.log('Error fetching photos:', data.message);
        }
    } catch (error) {
        console.log('Error fetching photos:', error);
    }
}
