import axios from "axios";

class ApiService{
    static async PostData(url,data,Coustomheader={}){
        const headers = {
            "Content-Type": "application/json",
            ...Coustomheader,
          };
      
          try {
            const response = await axios.post(url, data, {
              headers: headers,
            });
            return response;
          } catch (error) {
            // Handle the error more specifically (e.g., log the error or throw it)
            console.error("Error in getting response:", error);
            return null;
          }
    }
}

export {
    ApiService
}