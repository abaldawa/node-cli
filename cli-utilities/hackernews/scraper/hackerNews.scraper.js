/**
 * User: abhijit.baldawa
 */

const 
    {formatPromiseResult, ObjParse} = require('../../../common/utils/utils.common'),
    logger = require('../../../common/logger/logger.common'),
    {isUserInputValid, isPostObjectValid} = require('../validation/hackerNews.validation'),
    hackerNewsService = require('../services/hackerNews.service');

/**
 * @method PUBLIC
 *
 * This method fetches number of posts = 'limit' (user input) from hacker news server and logs the valid post object
 * on the terminal. In order to not keep user waiting for long time this methods prints each valid post immediately
 * as soon as they are fetched from the server
 *
 * @param {Number} limit :REQUIRED: Number of top posts to fetch from hacker news server and log
 * @returns {Promise<undefined>}
 */
async function fetchAndLogPosts( limit ) {
    let
        err,
        topPostsIdArr,
        postObj,
        totalRecordsFetched = 0;

    // -------------------------- 1. Validate input --------------------------------------------------------------------
    limit = parseInt(limit);

    if( !isUserInputValid(limit) ) {
        return logger.error(`--posts must be a positive integer <= 100`);
    }
    // -------------------------------- 1. END -------------------------------------------------------------------------


    // ---------------------- 2. Get top-posts ID's fro hacker news server ---------------------------------------------
    logger.progress(`Fetching top ${limit} posts from hacker news... Progress = 0%`);

    [err, topPostsIdArr] = await formatPromiseResult(
                                    hackerNewsService.getTopPosts()
                                 );

    if( err ) {
        return logger.error(`Error while fetching top posts Id's from hacker news server. Error: ${err.stack || err}`);
    }

    if( !topPostsIdArr || !Array.isArray(topPostsIdArr) || !topPostsIdArr.length ) {
        return logger.error(`No top posts Id's returned by hacker news server`);
    }
    // ----------------------------------- 2. END ----------------------------------------------------------------------


    // --------------- 3. foreach postId, fetch postId's metadata,  validate it and log it along with total progress ----------------
    for( let postId of topPostsIdArr ) {
        if( totalRecordsFetched >= limit ) {
            break;
        }

        [err, postObj] = await formatPromiseResult(
                                  hackerNewsService.getPostById( postId )
                               );

        if( err ) {
            return logger.error(`Error while fetching postId: ${postId} metadata from hacer news server. Error: ${err.stack || err}`);
        }

        if( isPostObjectValid(postObj) ) {
            totalRecordsFetched++;

            logger.success(JSON.stringify({
                title: postObj.title,
                uri: postObj.url,
                author: postObj.by,
                points: postObj.score,
                comments: postObj.kids.length,
                rank: totalRecordsFetched
            }, null, 2));

            logger.progress(`Fetching top ${limit} posts from hacker news... Progress = ${ ((totalRecordsFetched/limit)*100).toFixed(0) }%`);
        }
    }
    // --------------------------------------------- 3. END ----------------------------------------------------------------------

    logger.clearLine();
}

module.exports = {
    fetchAndLogPosts
};
    