import { Sparkles } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
export default function Hero() {
    return (
        <section>
            <div className="hero">
                <div>
                    <span className="spark"><Sparkles className="sparkle" /> Powered by MyAnimeList via Jikan</span>
                    <h1>Discover anime you'll <span className="gradient-text">actually <br /> love</span></h1>


                    <p>Explore top-rated, currently airing, and upcoming series. Save favourites, dive into trailers, cast, and reviews — all in one place.</p>


                    <div className="hero-btn">
                        <button className="hero-search">Start searching</button>
                        <button className="hero-browse">Browse top anime <ArrowRight strokeWidth={1.5} height={20} /></button>
                    </div>
                </div>
            </div>
        </section>
    )
}