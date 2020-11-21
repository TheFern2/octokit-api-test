// Script for octokit/rest 18.0.3 latest
const { Octokit } = require("@octokit/rest");
const fs = require("fs");
const secret = require("./secret")

const API_KEY = secret.API_KEY

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

octokit.paginate(
    "GET /gists",
    (res) => res.data.map(gist => {
        const gistObj = {
            id: gist.id,
            description: gist.description,
            updated_at: gist.updated_at,
            html_url: gist.html_url
        }
        //console.log(`${gist.id} ${gist.updated_at}`)
        return gistObj
    })
).then((gists) => {
    console.log('gists length ' + gists.length);
    fs.writeFile("./gists.json", JSON.stringify(gists), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    return gists
}).then((gists) => {
    console.log('gists length ' + gists.length);

    const gistPromises = []
    //var detailedGists = [] 

    gists.forEach(gist => {
        //console.log(gist)
        gistPromises.push( octokit.gists.get({ gist_id: gist.id }) )
    })

    Promise.allSettled(gistPromises).then(values =>{
        const notes = []

        values.forEach(response => {
            //console.log(value.status)
            if(response.status == 'fulfilled'){
                console.log(response.value.data)
                notes.push(response.value.data)
            }
        })

        console.log('notes length ' + notes.length)

        fs.writeFile("./detailedGists.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

    }).catch(err => console.log(err))

})