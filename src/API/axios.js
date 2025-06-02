import axios from "axios";
const axiosInstance = axios.create({
     //local instance of firebase functions
     // baseURL:"http://127.0.0.1:5001/clone-80fab/us-central1/api",
     //deployed version of amazon server on render.com
     baseURL:"https://amazon-api-deploy-fgmn.onrender.com",
     timeout: 5000,
     headers:{
          'Content-Type': 'application/json', // Ensure you're sending JSON
        'Accept': 'application/json' // Expecting JSON back
     },
     responseType: 'json'

});

export {axiosInstance};