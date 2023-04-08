const redis = require('redis');

exports.handler = async (event, context) => {
    // Get your Redis Labs connection details (hostname and port)
    const redisHost = process.env.REDIS_HOST;
    const redisPort = process.env.REDIS_PORT;
    const redisPassword = process.env.REDIS_PASSWORD;

    const client = redis.createClient({
        host: redisHost,
        port: redisPort,
        password: redisPassword,
        no_ready_check: true,
    });

    client.on('error', (err) => {
        console.error('Error connecting to Redis:', err);
    });

    // Example: Set and get a value from Redis
    const setValue = () => {
        return new Promise((resolve, reject) => {
            client.set('key', 'value', (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    };

    const getValue = () => {
        return new Promise((resolve, reject) => {
            client.get('key', (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    };

    try {
        await setValue();
        const value = await getValue();
        client.quit();

        return {
            statusCode: 200,
            body: JSON.stringify({ redisValue: value }),
        };
    } catch (err) {
        client.quit();

        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
