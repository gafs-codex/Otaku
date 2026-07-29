import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import fetchAnime from '../utils/api';
import GatewayError from '../Errors/GatewayError';
import FailedRequest from '../Errors/FailedRequest';
import NoInternet from '../Errors/NoInternet';
import RequestOverload from '../Errors/RequestOverload';
import SkeletonCard from '../ui/SkeletonCard';
import AnimeCard from '../ui/AnimeCard';
import { ShieldQuestionMark } from 'lucide-react';

export default function SearchPage({ isFavorite, toggleFavorite }) {
    const [input, setInput] = useState("")
    const [title, setTitle] = useState("")
    const [hasSearched, setHasSearched] = useState(false)
    const [allAnime, setAllAnime] = useState([]);
    const [type, setType] = useState("");
    const [minScore, setMinScore] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");
    const [sortBy, setSortBy] = useState("popularity");
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const endpoint = `/anime?q=${encodeURIComponent(title)}`;
    console.log(endpoint);


    useEffect(() => {
        let filtered = [...allAnime];

        if (type) {
            filtered = filtered.filter(
                anime => anime.type?.toLowerCase() === type
            );
        }

        if (minScore) {
            filtered = filtered.filter(
                anime => anime.score >= Number(minScore)
            );
        }


        if (fromYear) {
            filtered = filtered.filter(anime => {
                const year =
                    anime.year ??
                    (anime.aired?.from
                        ? new Date(anime.aired.from).getFullYear()
                        : 0)
                return year >= Number(fromYear);
            });
        }


        if (toYear) {
            filtered = filtered.filter(anime => {
                const year = anime.year || new Date(anime.aired.from).getFullYear();
                return year <= Number(toYear);
            });
        }

        if (sortBy === "score") {
            filtered = [...filtered].sort((a, b) => b.score - a.score);
        }

        if (sortBy === "start_date") {
            filtered = [...filtered].sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from))
        }

        if (sortBy === "title") {
            filtered = [...filtered].sort((a, b) =>
                a.title.localeCompare(b.title))
        }
        if (sortBy === "popularity") {
            filtered = [...filtered].sort(
                (a, b) => b.popularity - a.popularity
            );
        }

        setResult(filtered)
    }, [allAnime, type, minScore, fromYear, toYear, sortBy]);

    useEffect(() => {

        if (title.trim().length < 3) {
            setResult([]);
            setError("");
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(() => {
            setLoading(true);
            setError("");
            fetchAnime(endpoint)
                .then(data => {
                    setAllAnime(data);
                    setError("");
                })
                .catch(err => {
                    setResult([]);
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });

        }, 700);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };

    }, [title]);

    function handleSubmit(e) {
        e.preventDefault();
        if (title === input.trim()) return;
        setHasSearched(true)
        setLoading(true);
        setTitle(input.trim().toLowerCase());
    }

    return (
        <main className="search-container">
            <h1>Search</h1>
            <p>Live search across every Anime on the site</p>

            <form onSubmit={handleSubmit}>
                <div className='search-box'>
                    <Search strokeWidth={1.5} height={20} width={20} className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search anime...try 'naruto'"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button type='submit' className='search-btn'>
                        Search
                    </button>
                </div>
            </form>



            <div className='filter-search'>
                <label htmlFor="">
                    <span>Type</span>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="tv">TV</option>
                        <option value="movie">Movie</option>
                        <option value="ova">OVA</option>
                        <option value="special">Special</option>
                        <option value="ona">ONA</option>
                        <option value="music">Music</option>
                    </select>
                </label>

                <label htmlFor="">
                    <span>MIN SCORE</span>
                    <select
                        value={minScore}
                        onChange={(e) => setMinScore(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="9">9+</option>
                        <option value="8">8+</option>
                        <option value="7">7+</option>
                        <option value="6">6+</option>
                        <option value="5">5+</option>
                    </select>
                </label>

                <label htmlFor="">
                    <span>FROM YEAR</span>
                    <input
                        type="number"
                        value={fromYear}
                        onChange={(e) => setFromYear(e.target.value)}
                        placeholder="2015"
                    />
                </label>

                <label htmlFor="">
                    <span>TO YEAR</span>
                    <input
                        type="number"
                        value={toYear}
                        onChange={(e) => setToYear(e.target.value)}
                        placeholder="2025"
                    />
                </label>

                <label htmlFor="">
                    <span>SORT BY</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popularity">Popularity</option>
                        <option value="score">Rating</option>
                        <option value="start_date">Newest</option>
                        <option value="title">Title (A-Z)</option>
                    </select>
                </label>
            </div>

            <div className="results-section">

                {loading && (
                    <div className="anime-grid">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))}
                    </div>
                )}

                {!loading && error === "too-many-requests" && (
                    <div className="error-wrapper">
                        <RequestOverload />
                    </div>
                )}

                {!loading && error === "gateway-timeout" && (
                    <div className="error-wrapper">
                        <GatewayError />
                    </div>
                )}

                {!loading && error === "offline" && (
                    <div className="error-wrapper">
                        <NoInternet />
                    </div>
                )}

                {!loading && error === "request-failed" && (
                    <div className="error-wrapper">
                        <FailedRequest />
                    </div>
                )}

                {!loading && !error && hasSearched && (
                    result.length > 0 ? (
                        <div className="anime-grid">
                            {result && result.map(anime => (
                                <AnimeCard
                                    key={anime.mal_id}
                                    anime={anime}
                                    isFavorite={isFavorite.some(item => item.mal_id === anime.mal_id)} toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className='no-results-cont'>
                            <div className="no-results">
                                <ShieldQuestionMark color="#E5259A" width={40} height={40} />
                                <h3>No anime found</h3>
                                <p>
                                    No anime matches your current filters. Try changing the type,
                                    minimum score, year range, or search for another title.
                                </p>
                            </div>
                        </div>
                    )
                )}

            </div>
        </main>
    )
}