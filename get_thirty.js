// Script for octokit/rest 18.0.3 latest
const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const secret = require("./secret");

const API_KEY = secret.API_KEY;

const octokit = new Octokit({
  requestMedia: "application/vnd.github.v3+json",
  auth: API_KEY,
  headers: {
    userAgent: "testApp v1.2.3",
    "user-agent": "octokit/rest.js v1.2.3",
    mediaType: {
      format: "application/vnd.github.v3+json",
    },
  },
});

octokit.gists
  .list()
  .then((res) => {
    let gistsArr = [];
    res.data.map((gist) => {
      const gistObj = {
        id: gist.id,
        description: gist.description,
        updated_at: gist.updated_at,
        html_url: gist.html_url,
      };
      console.log(gistObj);
      gistsArr.push(gistObj);
    });
    return gistsArr;
  })
  .then((gists) => {
    console.log("gists length " + gists.length);
    fs.writeFile("./gists.json", JSON.stringify(gists), (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
    return gists;
  })
  .then((gists) => {
    console.log("gists length " + gists.length);

    const gistPromises = [];
    const howManyDetailedGists = 5;
    for (let i = 0; i < howManyDetailedGists; i++) {
      gistPromises.push(octokit.gists.get({ gist_id: gists[i].id }));
    }

    Promise.allSettled(gistPromises)
      .then((values) => {
        const notes = [];

        values.forEach((response) => {
          //console.log(value.status)
          if (response.status == "fulfilled") {
            console.log(response.value.data);
            notes.push(response.value.data);
          }
        });

        console.log("notes length " + notes.length);

        fs.writeFile("./detailedGists.json", JSON.stringify(notes), (err) => {
          if (err) throw err;
          console.log("Data written to file");
        });
      })
      .catch((err) => console.log(err));
  });
