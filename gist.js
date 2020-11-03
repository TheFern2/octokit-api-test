// Script for octokit/rest 18.0.3 latest
const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const API_KEY = ""

const octokit = new Octokit({
  requestMedia: "application/vnd.github.v3+json",
  auth: "",
  headers: {
    userAgent: "testApp v1.2.3",
    "user-agent": "octokit/rest.js v1.2.3",
    mediaType: {
      format: "application/vnd.github.v3+json",
    },
  },
});

const gist = octokit.gists.get({
    gist_id: '2b9f577fc8b0032163b4a67a7e4ab3d0'
})

console.log(Promise.resolve(gist))

Promise.resolve(gist).then(value => {
    console.log(value.data)
})