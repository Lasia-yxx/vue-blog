import service from "../ulits/request"

export function getBlogData(data){
  return service.request({
    method:"POST",
    url:"api/getBlogData",
    data
  })
}

export function searchBlog(data){
  return service.request({
    method:"POST",
    url:"api/search",
    data
  })
}

export function getTips(data){
  return service.request({
    method:"POST",
    url:"api/getTips",
    data
  })
}

export function getNote(data){
  return service.request({
    method:"POST",
    url:"api/getNote",
    data
  })
}

export function getDataLength(data){
  return service.request({
    method:"POST",
    url:"api/dataLength",
    data
  })
}
