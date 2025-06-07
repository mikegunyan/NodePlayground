const express = require('express')
const app = express()
const port = process.env.PORT_SERVER || 3333;

app.get('/', (req, res) => {
  console.log('Hello world!')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})