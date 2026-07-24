import { TrendingUp } from 'lucide-react';
import NowAiring from './NowAiring';
import Upcoming from './Upcoming';

export default function Main() {


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


            <section></section>


            <section></section>
        </main>
    )
}