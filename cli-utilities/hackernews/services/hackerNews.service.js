/**
 * User: abhijit.baldawa
 */

const
    https = require('https'),
    {POST_URL, TOP_STORIES_URL} = require('../hackerNewsRestApis');

/**
 * @method PRIVATE
 *
 * This method fetches the JSON data from the provided input URL
 *
 * Note: We are using node.js built-in 'https' module because our use-case is to just GET response from the endpoint. This way we do not
 *       have to install any third-party REST client. For more complex usage we can also use "node-fetch" (or any-other) module which
 *       returns promise by default and can be directly used with async/await without having to wrap it inside promise constructor.
 *
 * @param {String} URL :REQUIRED: The REST endpoint to fetch JSON data from
 * @return {Promise<Object>}
 */
function fetchDataFromUrl( URL ) {
    return new Promise((resolve, reject) => {
        if( !URL || typeof URL !== "string" ) {
            return reject( "Missing URL" );
        }

        https.get(URL, (response) => {
            let
                rawData = '';

            response.setEncoding('utf8');

            response
                .on('data', (chunk) => {
                    rawData += chunk;
                })
                .on('end', () => {
                    try {
                        resolve(JSON.parse(rawData));
                    } catch (e) {
                        reject(e);
                    }
                });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * @method PUBLIC
 *
 * This method fetches top posts ID's from hacker news server
 *
 * @returns {Promise<String[]>} If successful resolves to array of top stories ID's else rejects with error
 */
function getTopPosts() {
    return fetchDataFromUrl( TOP_STORIES_URL );
}

/**
 * @method PUBLIC
 *
 * This method fetches post metada by 'postId' from hacker news server
 *
 * @param {String} postId :REQUIRED: postId whose metadata to fetch from the hacker news server
 * @returns {Promise<Object>}
 */
function getPostById( postId ) {
    if( !postId ) {
        return Promise.reject(`Missing 'postId'`);
    }

    const
        postUrl = POST_URL.replace("$itemId", postId);

    return fetchDataFromUrl( postUrl );
}

module.exports = {
    getTopPosts,
    getPostById
};
