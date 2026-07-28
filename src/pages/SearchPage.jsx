import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import fetchAnime from '../utils/api';
import GatewayError from '../Errors/GateWayError';
import FailedRequest from '../Errors/FailedRequest';
import NoInternet from '../Errors/NoInternet';
import RequestOverload from '../Errors/RequestOverload';
import SkeletonCard from '../ui/SkeletonCard';
import AnimeCard from '../ui/AnimeCard';

export default function SearchPage() {
    const [input, setInput] = useState("")
    const [type, setType] = useState("");
    const [minScore, setMinScore] = useState("");
    const [fromYear, setFromYear] = useState("");
    const [toYear, setToYear] = useState("");
    const [sortBy, setSortBy] = useState("popularity");
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const params = new URLSearchParams();

    params.append("q", input);

    if (type) params.append("type", type);
    if (minScore) params.append("min_score", minScore);

    const endpoint = `/anime?${params.toString()}`;

    // const endpoint = `/anime?${params.toString()}`;
    // const endpoint = `/anime?q=${encodeURIComponent(input)}`;
    // const endpoint = `/anime?q=${encodeURIComponent(input)}&order_by=popularity`;
    // const endpoint = `/anime?q=${encodeURIComponent(input)}&sort=desc`;
    console.log("Endpoint:", endpoint);
    console.log("Full URL:", `https://api.jikan.moe/v4${endpoint}`);


    useEffect(() => {

        if (input.trim().length < 3) {
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
                    setResult(data);
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

    }, [input, type, minScore]);

    // if (error === "too-many-requests") {
    //     return <div className="error-wrapper"><RequestOverload /></div>;
    // }

    // if (error === "gateway-timeout") {
    //     return <div className="error-wrapper"><GatewayError /></div>;
    // }

    // if (error === "offline") {
    //     return <div className="error-wrapper"><NoInternet /></div>;
    // }

    // if (error === "request-failed") {
    //     return <div className="error-wrapper"><FailedRequest /></div>;
    // }
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <main className="search-container">
            <h1>Search</h1>
            <p>Live search across every Anime on the site</p>

            <form>
                <div className='search-box'>
                    <Search strokeWidth={1.5} height={20} width={20} className='search-icon' />
                    <input
                        type="text"
                        placeholder="Search anime...try 'attack on titan'"
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

                {!loading && !error && (
                    <div className="anime-grid">
                        {result && result.map(anime => (
                            <AnimeCard
                                key={anime.mal_id}
                                anime={anime}
                            />
                        ))}
                    </div>
                )}

            </div>
        </main>
    )
}