 const fs = require("fs")

 const data = fs.readFileSync("./historico.txt", "utf-8")
 const dataToJson = data.split("\r\n").map(line => {
     const [month, year, lat, long, temp, meters, satellite] = line.split(";");
     return {
        month, year, lat, long, temp, meters, satellite
     }
 })

 dataToJson.pop()

 fs.writeFileSync("./historico.json", JSON.stringify(dataToJson))

// const data = require("./temperatures.json")
// console.table(data.filter(item=> item.year==="2018"))