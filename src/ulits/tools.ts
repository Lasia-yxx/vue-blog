
let monthMap:Array<string> = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

class tools {
  public $dateFormat(rawData:Array<any>): void{}
  public $getCurrentDate(): any{}
}



var tool = new tools

tool.$dateFormat = function(rawData){
  for(let i = 0;i<rawData.length;i++){
    let temp = rawData[i].blog_date.split("-").reverse()
    temp[1] = monthMap[Number(temp[1])]
    rawData[i].blog_date = temp[0] + " " + temp[1] + " " + temp[2]
  }
}

tool.$getCurrentDate = function(){
  let date = new Date()
  let divide = "-"
  let year = String(date.getFullYear())
  let month = String(date.getMonth() + 1)
  let strDate = String(date.getDate())
  if(Number(month) >= 1 && Number(month) <= 9){
    month = "0" + month
  }
  if(Number(strDate) >= 0 && Number(strDate) <= 9){
    strDate = "0" + strDate
  }
  let currentDate = year + divide + month + divide + strDate
  return currentDate
}

export default tool

