const Redis = require('ioredis');

exports.handler = async (event, context) => {
    const redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    });

    try {
        // Perform your desired Redis operations here, e.g., setting and getting a key-value pair
        await redis.set('myKey', 'Hello, Redis!');
        const value = await redis.get('myKey');

        // Close the connection
        redis.disconnect();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: `Redis value: ${value}` }),
        };
    } catch (error) {
        console.error(error);

        // Close the connection
        redis.disconnect();

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error connecting to Redis' }),
        };
    }
};
