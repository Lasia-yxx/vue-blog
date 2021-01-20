import service from "../ulits/request"

export function loginCheck(data){
  return service.request({
    method  : "POST",
    url     : "users/loginCheck",
    data
  })
}

export function tokenCheck(data){
  return service.request({
    method  : "POST",
    url     : "users/tokenCheck",
    data
  })
}

export function delData(data){
  return service.request({
    method  : 'POST',
    url     : "users/delData",
    data
  })
}

export function editBlogData(data){
  return service.request({
    method  : "POST",
    url     : "users/edtiBlogData",
    data
  })
}

export function uploadPhotographyPost(data){
  return service.request({
    method  : "POST",
    url     : "users/uploadPhotographyPost",
    data    
  })
}

export function uploadBlog(data){
  return service.request({
    method  : "POST",
    url     : "users/uploadBlog",
    data
  })
}

export function uploadNote(data){
  return service.request({
    method  : "POST",
    url     : "/users/uploadNote",
    data
  })
}

export function updateBlog(data){
  return service.request({
    method  : "POST",
    url     : "users/updateBlog",
    data
  })
}

export function updateNote(data){
  return service.request({
    method  : "POST",
    url     : "users/updateNote",
    data
  })
}

export function updateAbout(data){
  return service.request({
    method  : "POST",
    url     : "users/updateAbout",
    data
  })
}

export function updateMyData(data){
  return service.request({
    method  : "POST",
    url     : "users/updateMyData",
    data
  })
}

export function uploadTips(data){
  return service.request({
    method  : "POST",
    url     : "users/uploadTips",
    data
  })
}

