import service from "../ulits/request"

export function getBlogData(){
  return service.request({
    method:"GET",
    url:"api/getBlogData"
  })
}

