
let monthMap:Array<string> = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

class tools {
  public $dateFormat(rawData:Array<any>): void{}
}



var tool = new tools

tool.$dateFormat = function(rawData){
  // for(let i = 0;i<rawData.length;i++){
  //   let temp = rawData[i].blog_date.split("T")[0].split("-").reverse()
  //   temp[1] = monthMap[Number(temp[1])]
  //   rawData[i].blog_date = temp[0] + " " + temp[1] + " " + temp[2] 
  // }
}

export default tool

