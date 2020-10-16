const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostId  = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/events', (req, res) => {

})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body;
    const postId = req.params.id;
    const comments = commentsByPostId[postId] || []
    comments.push({id: commentId, content})

    commentsByPostId[postId] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            postId, content, id: commentId,
        }
    });

    return res.status(201).send(comments)
})

app.listen(4001, () => {
    console.log('Listen on 4001')
})