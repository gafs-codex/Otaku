import { TrendingUp } from 'lucide-react';
import NowAiring from './NowAiring';
import Upcoming from './Upcoming';
import GenreSection from './GenreSection';
import TopAnime from './TopAnime';
import { useState } from 'react';

export default function Main() {
    const [selectedGenre, setSelectedGenre] = useState(null)


    return (
        <main>
            <section>
                <div className="main-airing">
                    <div>
                        <h2 className="airing-header">
                            <TrendingUp height={20} />
                            Now Airing
                        </h2>
                        <p className="airing-text">Currently in this season</p>
                    </div>
                </div>



                <div className="anime-grid">
                    <NowAiring />
                </div>
            </section>


            <section>
                <div className="main-airing">
                    <div>
                        <h2 className="airing-header">
                            Upcoming
                        </h2>
                        <p className="airing-text">Coming next season</p>
                    </div>
                </div>


                <div className="anime-grid">
                    <Upcoming />
                </div>
            </section>


            <section>
                <GenreSection
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                />
            </section>


            <section>
                <div className="main-airing">
                    <div>
                        <h2 className="airing-header">
                            Top Anime
                        </h2>
                        <p className="airing-text">Highest rated of all time</p>
                    </div>
                </div>


                <div className="anime-grid">
                    <TopAnime
                        selectedGenre={selectedGenre}
                    />
                </div>
            </section>
        </main>
    )
}