const url = `https://api.jikan.moe/v4`
export default function fetchAnime(endpoint) {
    return fetch(`${url}${endpoint}`)
        .then((response) => {
            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error("too-many-requests")
                }
                if (response.status === 502 || response.status === 504) {
                    throw new Error("gateway-timeout");
                }
                if (response.status === 503) {
                    throw new Error("service-unavailable");
                }
                throw new Error("request-failed");
            }
            return response.json()
        })
        .then((jdata) => {
            console.log();
            return jdata.data
        })
        .catch((error) => {
            if (!navigator.onLine) {
                throw new Error("offline");
            }

            throw error;
        });
}