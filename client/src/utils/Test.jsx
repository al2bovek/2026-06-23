import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Test() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const testApi = async () => {
            try {
                const response = await api.get("/");
                console.log(response.data);
                setData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        testApi();
    }, []);

    return <p className="text-lg font-bold text-amber-800 text-center">{data ? JSON.stringify(data.message) : "Loading..."}</p>;
}
