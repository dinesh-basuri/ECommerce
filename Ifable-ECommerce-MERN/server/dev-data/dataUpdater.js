const fs = require('fs')
const data = JSON.parse(fs.readFileSync(`${__dirname}/data.json`))
const updatedData = data?.map((item) => {
  const {_id, ...rest} = item
  return rest
})
fs.writeFileSync('updatedData.json', JSON.stringify(updatedData, null, 2));