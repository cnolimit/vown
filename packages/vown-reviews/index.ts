import axios from 'axios'

axios.get('https://google.com').then(data => {
  console.log({ data })
})
