// Script for octokit/rest 16.32.0 latest

const Octokit = require("@octokit/rest");

const octokit = new Octokit({
    userAgent: 'testApp v1.2.3',
    baseUrl: 'https://github.ncsu.edu', // append /api/v3 if necessary
    auth: 'paste-token-here',
})

octokit.gists.list().then((res) => {
    console.log(res)
});