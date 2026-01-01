import axios from "axios";
import { useEffect, useState } from "react";

export function useContent() {
    const [content, setContent] = useState([]);

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/braino/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setContent(response.data.message)
        })
    }

    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {content, refresh}
}