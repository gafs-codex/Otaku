const url = `https://api.jikan.moe/v4`
export default function fetchAnime(endpoint) {
    return fetch(`${url}${endpoint}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Api Request Failed")
            }
            return response.json()
        })
        .then((jdata) => {
            console.log();
            return jdata.data
        })
        .catch((error) => {
            console.error('Jikan API error:', error);
            return null;
        });
}