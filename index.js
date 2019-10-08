// Script for octokit/rest 14.08.0

const Octokit = require("@octokit/rest");

const octokit = new Octokit({
    debug: true,
    host: 'https://github.ncsu.edu/api/v3',
    headers: {
        'user-agent': 'octokit/rest.js v1.2.3',
    },
});

octokit.authenticate({
    type: 'token',
    token: 'paste-token-here',
});

octokit.gists.getAll().then((res) => {
    console.log(res);
});