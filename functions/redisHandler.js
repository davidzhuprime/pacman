const redis = require('redis');
const client = redis.createClient(); // create a Redis client

// handle the click event on your web page
document.addEventListener('click', () => {
    // increment the click count in Redis
    client.incr('clicks', (err, reply) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Number of clicks: ${reply}`);
        }
    });
});
