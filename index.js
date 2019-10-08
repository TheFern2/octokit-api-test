const Octokit = require("@octokit/rest");


const octokit = new Octokit({
    baseUrl: "https://github.ncsu.edu/api/v3",
    //auth: "", // this is with latest version 16 do not uncomment this line
});

octokit.authenticate({
    type: 'token',
    token: 'paste-token-here',
});

// this is with latest version 16 do not uncomment this block
// octokit.gists.list().then((res) => {
//     console.log(res)
// });

octokit.gists.getAll().then((res) => {
    console.log(res);
});