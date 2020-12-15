import axios from "axios";
export const apiVIP = axios.create({
  baseURL:'https://05addb8a72a0.ngrok.io/api/'
    // baseURL:"http://192.168.1.32:9090/api/",
    // baseURL:"https://f55537d71e25.ngrok.io/api"
    
})
export const apiCR = axios.create({
    basseURL:"http://chuawXXong.com/api/"

})
export const axiosLocation = axios.create({
  baseURL: "http://14.241.239.78/tek.btc.kiot/api/",
});