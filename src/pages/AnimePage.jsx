import { useParams, NavLink } from "react-router-dom"
import { useState, useEffect, use } from "react";
import { Heart } from "lucide-react";
import { Star } from 'lucide-react';
import fetchAnime from "../utils/api";
import Cast from "../components/Cast";
import Recommendations from "../components/Recommendations";
import SkeletonCard from "../ui/SkeletonCard";
import GatewayError from "../Errors/GateWayError";
import RequestOverload from "../Errors/RequestOverload";
import FailedRequest from "../Errors/FailedRequest";
import AnimePageSkeleton from "../ui/AnimePageSkeleton";

export default function AnimePage({ isFavorite, toggleFavorite }) {
    const [anime, setAnime] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id]);

    useEffect(() => {
        setLoading(true);
        setError("");
        setAnime(null);
        fetchAnime(`/anime/${id}`)
            .then(data => {
                console.log(data);
                setAnime(data)
            })
            .catch(err => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [id])

    if (loading) {
        return <AnimePageSkeleton />;
    }

    if (error === "too-many-requests") {
        return <div className="error-wrapper"><RequestOverload /></div>;
    }

    if (error === "gateway-timeout") {
        return <div className="error-wrapper"><GatewayError /></div>;
    }

    if (error === "offline") {
        return <div className="error-wrapper"><NoInternet /></div>;
    }

    if (error === "request-failed") {
        return <div className="error-wrapper"><FailedRequest /></div>;
    }


    return (
        <>

            {anime && (
                <main className="anime-page">

                    <NavLink to=".." style={{ textDecoration: "none" }}>
                        <button className="back-btn">← Back</button>
                    </NavLink>


                    <section className="anime-hero">

                        <div className="anime-poster">
                            <img
                                src={anime.images.webp.large_image_url}
                                alt={anime.title}
                            />
                        </div>

                        <div className="anime-content">

                            <h1>{anime.title_english || anime.title}</h1>

                            <p className="jp-title">
                                {anime.title_japanese}
                            </p>

                            <p className="alt-title">
                                <strong>Also known as:</strong> {anime.title}
                            </p>

                            <div className="anime-badges">
                                <span className="pill score">
                                    <Star width={15} height={15} fill="#E5259A" /> {anime.score} <span className="scorers">{`(${anime.scored_by ? anime.scored_by.toLocaleString() : "0"} votes)`}</span>
                                </span>

                                <span className="pill">
                                    Rank #{anime.rank}
                                </span>

                                <span className="pill">
                                    {anime.status}
                                </span>

                                <span className="pill">
                                    {anime.type}
                                </span>
                            </div>

                            <div className="genre-list">
                                {anime.genres.map((genre) => (
                                    <button
                                        key={genre.mal_id}
                                        className="genre-pill"
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>

                            <button className="favorite-btn-page" onClick={() => toggleFavorite(anime)}>
                                <Heart height={18} width={18} fill={
                                    isFavorite.some(item => item.mal_id === anime.mal_id)
                                        ? "#e5259a"
                                        : "none"
                                } color={isFavorite.some(item => item.mal_id === anime.mal_id)
                                    ? "#e5259a"
                                    : "black"} />
                                {isFavorite.some(item => item.mal_id === anime.mal_id)
                                    ? " Remove from favourites"
                                    : " Add to favourites"}
                            </button>

                            <p className="synopsis">
                                {anime.synopsis}
                            </p>


                            <div className="anime-details">

                                <div className="detail-card">
                                    <span>Aired</span>
                                    <h4>{anime.aired.string}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Duration</span>
                                    <h4>{anime.duration}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Episodes</span>
                                    <h4>{anime.episodes}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Season</span>
                                    <h4>{anime.season}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Rating</span>
                                    <h4>{anime.rating}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Broadcast</span>
                                    <h4>
                                        {anime.broadcast?.day} at {anime.broadcast?.time}
                                    </h4>
                                </div>

                                <div className="detail-card">
                                    <span>Studio</span>
                                    <h4>{anime.studios[0]?.name}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Producer</span>
                                    <h4>{anime.producers[0]?.name}</h4>
                                </div>

                                <div className="detail-card">
                                    <span>Source</span>
                                    <h4>{anime.source}</h4>
                                </div>

                            </div>

                        </div>
                    </section>
                </main>
            )}



            <div className="cast-c">
                <h1>Cast</h1>
                <Cast />
            </div>


            <div className="cast-c">
                <h1>Recommendations</h1>
                <div className="anime-grid rec">
                    <Recommendations isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
                </div>
            </div>
        </>

    )
}
























