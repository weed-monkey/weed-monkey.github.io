// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const apiKey = 'AIzaSyCJkcHI77coPVGu_4v-uwnbuNelhWnmzzc';
const channelId = 'UCvulgQYQPPUMwCs7tKMXO0g'; // Replace with the actual channel ID
const fs = require("fs")
async function fetchVideos(apiKey, channelId, maxVideos = 100) {
    const videos = [];

    let nextPageToken = null;

    do {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;

        const response = await fetch(url);
        const data = await response.json();

        videos.push(...data.items.map(item => {
            return {
                title: item.snippet.title,
                link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                embedLink: `https://www.youtube.com/embed/${item.id.videoId}`
            };
        }));

        nextPageToken = data.nextPageToken;
    } while (nextPageToken && videos.length < maxVideos);

    return videos.slice(0, maxVideos);
}

// Usage
const maxVideos = 1000; // Set to a large number
fetchVideos(apiKey, channelId, maxVideos)
    .then(videos => console.log('Fetched Videos:', videos))
    .catch(error => console.error('Error fetching videos:', error));


fs.writeFileSync("videos.json", JSON.stringify(videos, null, 2));
