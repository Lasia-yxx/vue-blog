import service from "../ulits/request"

export function loginCheck(data){
  return service.request({
    method:"POST",
    url: "users/loginCheck",
    data
  })
}

export function tokenCheck(data){
  return service.request({
    method: "POST",
    url   : "users/tokenCheck",
    data
  })
}