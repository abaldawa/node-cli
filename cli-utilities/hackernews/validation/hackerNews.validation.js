/**
 * User: abhijit.baldawa
 */

/**
 * @method PUBLIC
 *
 * This method ensures that the user input 'noOfPosts' is a positive integer <= 100.
 * If yes then returns true if the input is not valid then returns false
 *
 * @param {Number} noOfPosts :REQUIRED: number of posts to fetch
 * @returns {Boolean}
 */
function isUserInputValid( noOfPosts ) {
    noOfPosts = parseInt(noOfPosts);

    if( !Number.isInteger(noOfPosts) || noOfPosts <= 0 || noOfPosts > 100 ) {
        return false;
    }

    return true;
}

/**
 * @method PUBLIC
 *
 * This method checks below:
 * 1] 'title' and 'by' keys of 'postObject' are non empty strings not longer than 256 characters
 * 2] 'score' key is a positive integer
 * 3] 'kids' key is non empty array
 * 4] 'url' key must be present
 * 
 * If all of the above is true then the method returns true else returns false
 *
 * @param {Object} postObject :REQUIRED:
 * @returns {Boolean}
 */
function isPostObjectValid( postObject ) {
    if( !postObject ) {
        return false;
    }

    if( !postObject.title || !postObject.by || postObject.title.length > 256 || postObject.by.length > 256 ) {
        return false;
    }

    if( !postObject.url ) {
        return false
    }

    if( !postObject.score || !postObject.kids || !postObject.kids.length ) {
        return false;
    }

    if( !Number.isInteger(postObject.score) || postObject.score <= 0 ) {
        return false;
    }

    return true;
}

module.exports = {
    isUserInputValid,
    isPostObjectValid
};