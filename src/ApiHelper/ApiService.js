
import axios from "axios";

class ApiService {
  static async PostData(url, data, Coustomheader = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...Coustomheader,
    };

    try {
      const response = await axios.post(url, data, {
        headers: headers,
      });
      return response;
    } catch {
      return null;
    }
  }

  static async Getdata(url,Coustomheader = {}) {

    const headers = {
      ...Coustomheader
    }

    try {
      const response = await axios.get(url,{ headers:headers })
      return response
    } catch {
      return null;
    }
  }

}

export {
  ApiService
}