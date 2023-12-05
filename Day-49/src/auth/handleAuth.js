import { toast } from "react-toastify";
import { client } from "../config/client";

const getApiKey = async email => {
    const {response, data} = await client.get("/users/profile", {email})
    return {response, data}
}

export { getApiKey }