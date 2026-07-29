import { useState, useEffect } from "react"
import fetchAnime from "../utils/api"
import { useParams } from "react-router-dom"
import GatewayError from "../Errors/GatewayError"
import FailedRequest from "../Errors/FailedRequest"
import RequestOverload from "../Errors/RequestOverload"
import NoInternet from "../Errors/NoInternet"

export default function Cast() {
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const { id } = useParams()

    useEffect(() => {
        setLoading(true);
        setError("");
        setCast([]);
        fetchAnime(`/anime/${id}/characters`)
            .then(data => {
                console.log(data.slice(0, 20));
                setCast(data.slice(0, 20))
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false)
            }

            )

    }, [id])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error === "too-many-requests") {
        return <div className="cast-error"><RequestOverload /></div>;
    }

    if (error === "gateway-timeout") {
        return <div className="cast-error"><GatewayError /></div>;
    }

    if (error === "offline") {
        return <div className="cast-error"><NoInternet /></div>;
    }

    if (error === "request-failed") {
        return <div className="cast-error"><FailedRequest /></div>;
    }
    return (

        <div className="casting">
            {cast ? cast.map((cast) => {
                return (
                    <div className="cast-container">
                        <div className="cast-image">
                            <img src={cast.character.images.webp.image_url} alt={cast.character.name} className="cast-img" />
                        </div>

                        <div className="cast-info">
                            <h2>{cast.character.name}</h2>
                            <p>{cast.role}</p>

                            {cast.voice_actors ? cast.voice_actors.map((voice) => {
                                if (voice.language === "Japanese") {
                                    return <p key={voice.person.mal_id}>{voice.person.name}</p>
                                }
                            })
                                : ""}
                        </div>
                    </div>
                )
            }) : ""}

        </div>
    )
}