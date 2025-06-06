import axios from "axios";

export const GetuserData = async () => {
    try {
        const API = import.meta.env.LARAVEL_API_URL;
        const response = await axios.get(`${API}getuser`);
        return response.data;
    } catch (err) {
        console.log("Error"+ err.message)
    }
}