// Hello World API

exports.handler = async (event, context) => {
    console.log({ event }, { context });

    const name = (event.queryStringParameters || {}).name || "World";

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello ${name}!`,
        }),
    };
};
