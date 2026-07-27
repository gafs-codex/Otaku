import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import fetchAnime from "../utils/api"
import { Heart } from 'lucide-react';
import { Link } from "react-router-dom";


export default function Recommendations({ isFavorite, toggleFavorite }) {
    const [recommendation, setRecommendation] = useState([])
    const { id } = useParams()


    useEffect(() => {
        setRecommendation([]);
        fetchAnime(`/anime/${id}/recommendations`)
            .then(data => {
                console.log(data);
                setRecommendation(data.slice(0, 15))
            })
    }, [id])

    return (
        <>
            {recommendation ? recommendation.map((reco) => {
                const favorited = isFavorite.some(
                    item => item.mal_id === reco.entry.mal_id
                );

                return (
                    <Link
                        key={reco.entry.mal_id}
                        to={`/anime/${reco.entry.mal_id}`}
                        className="recommendation-link"
                    >
                        <div className="recommendation-card">
                            <div className="recommendation-image">
                                <img
                                    src={reco.entry.images.webp.image_url}
                                    alt={reco.entry.title}
                                />

                                <button
                                    className="favorite-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleFavorite(reco.entry);
                                    }}
                                >
                                    <Heart
                                        color={favorited ? "#E5259A" : "black"}
                                        fill={favorited ? "#E5259A" : "none"}
                                    />
                                </button>
                            </div>

                            <div className="recommendation-info">
                                <h2>{reco.entry.title}</h2>
                            </div>
                        </div>
                    </Link>
                );
            }) : []}
        </>
    )
}