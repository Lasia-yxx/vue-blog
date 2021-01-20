import service from "../ulits/request"

export function uploadPhotography(data){
  return service.request({
    method  : "POST",
    url     : "pic/uploadPhotography",
    data    : data
  })
}



export function uploadBlogPic(data){
  return service.request({
    method  : "POST",
    url     : "pic/uploadBlogPic",
    data
  })
}

export function delPic(data){
  return service.request({
    method:"POST",
    url:"pic/deletePic",
    data
  })
}

export function uploadAvatar(data){
  return service.request({
    method:"POST",
    url:"pic/uploadAvatar",
    data
  })
}