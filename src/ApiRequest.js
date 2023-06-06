import axios from "axios"
import { sanitizeUrl } from '@braintree/sanitize-url';

export const ApiRequest = axios.create({
   baseURL: sanitizeUrl("http://codefeverllp.com/katta/API.svc"),
   headers: {
      'Content-Type': 'application/json'
   },
})
export const IpApiRequest = axios.create({
   baseURL: sanitizeUrl("https://api.ipify.org"),
   headers: {
      'Content-Type': 'application/json'
   },
})

export const ApiRequestUrl = {
   baseUrl: sanitizeUrl("http://codefeverllp.com/katta/API.svc")
}