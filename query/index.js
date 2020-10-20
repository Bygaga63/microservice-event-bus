const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())


const posts = {

}

app.post('/posts', (req, res) => {
    res.send(posts)
})


app.post('/events', (req, res) => {
    console.log(req.body)
    const { type, data } = req.body;
    console.log(type)
    if (type === 'PostCreated') {
        const { id, title } = data
        posts[id] = {id, title, comments: []}
    }

    if (type === 'CommentCreate') {
        const {id, content, postId} = data;

        const post = posts[postId];
        post.comments.push({id, content})
    }
})



app.use(bodyParser.json())
app.use(cors())

app.listen(4002, () => {
    console.log('Listen on 4002 ')
})