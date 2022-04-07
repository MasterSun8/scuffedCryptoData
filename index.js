const fs = require('fs')
const log = 'eo.json'
const start = new Date("01/01/2022")
const end = new Date("12/31/2022")

function todayDate(range='d', today='t'){
    today = today == 't' ? new Date() : new Date(today)

    if(today instanceof Date){
        let y = (today.getMonth()+1) < 10 ? '-0' : '-'

        let x = today.getFullYear()

        x += range == 'w' ? '-w' + getWeek(today) : range == 'd'  ? y + (today.getMonth()+1) + '-' + today.getDate() : y + today.getMonth()

        return x
    }
    return ''
}

function randVal(x){
    return Math.random() * x
}

fs.readFile(log, 'utf8', (err, data) => {
    if (err){
        console.log(err)
      } else {
        let obj = JSON.parse(data)
        let loop = new Date(start)
        while (loop <= end) {
            obj.push({crypto: 'tether', data: todayDate('d', loop), wartosc: randVal(100)})
            let newDate = loop.setDate(loop.getDate() + 1)
            loop = new Date(newDate)
        }
        let json = JSON.stringify(obj, null, "\t")
        fs.writeFileSync(log, json)
      }
})