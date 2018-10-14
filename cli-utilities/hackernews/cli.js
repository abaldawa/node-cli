#!/usr/bin/env node

/**
 * User: abhijit.baldawa
 */

const
    program = require('commander'),
    {fetchAndLogPosts} = require('./scraper/hackerNews.scraper');

/**
 * Immediately invoking async method which does all the standard startup routine.
 * In this case there are no async startup routines (such as database connection etc.) so IIFE was not needed but still keeping
 * it because in general if series of async utilities needs to be initialized before executing anything then async IIFE is
 * pretty standard
 */
(async () => {

    // -------------------- 1. Initialize commander specific options for cli flag -----------------------
    program
        .version('1.0.0', '-v, --version')
        .option('-p, --posts <limit>', 'Number of top posts to fetch from hacker news')
        .description('Get top posts from hacker news server')
        .parse(process.argv);

    if (!process.argv.slice(2).length) {
        return program.help();
    }
    // -------------------------------------- 1. END -----------------------------------------------------


    // ----------------------- 2. Fetch and log posts from hacker news server --------------------------
    fetchAndLogPosts(program.posts);
    // ------------------------------------ 2. END -----------------------------------------------------
})();
