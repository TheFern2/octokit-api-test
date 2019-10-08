const Octokit = require("@octokit/rest");


const octokit = new Octokit({
    debug: true,
    host: 'https://github.ncsu.edu',
    pathPrefix: '/api/v3'
});

octokit.authenticate({
    type: 'token',
    token: 'paste-token-here',
});

octokit.gists.getAll().then((res) => {
    console.log(res);
});