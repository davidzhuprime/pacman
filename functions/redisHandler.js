const redis = require('redis');

const client = redis.createClient({
    host: 'redis-10365.c282.east-us-mz.azure.cloud.redislabs.com',
    port: 10365,
    password: 'Vlx8vpnfkhlTcgmpwPGqeD12sxwWw45M'
});
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    button.addEventListener('click', () => {
        console.log('Button clicked');
        client.incr('clicks', (err, reply) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Number of clicks: ${reply}`);
            }
        });
    });
});
