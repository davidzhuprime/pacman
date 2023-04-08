const client = redis.createClient();

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
