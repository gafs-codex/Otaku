export default function AnimePageSkeleton() {
    return (
        <main className="anime-page">
            {/* <div className="back-btn skeleton"></div> */}

            <section className="anime-hero">
                <div className="anime-poster">
                    <div className="poster skeleton"></div>
                </div>

                <div className="anime-content">

                    <div className="skeleton hero-title"></div>
                    <div className="skeleton hero-subtitle"></div>
                    <div className="skeleton hero-alt"></div>

                    <div className="badge-row">
                        <div className="skeleton badge"></div>
                        <div className="skeleton badge"></div>
                        <div className="skeleton badge"></div>
                        <div className="skeleton badge"></div>
                    </div>

                    <div className="genre-row">
                        <div className="skeleton genre"></div>
                        <div className="skeleton genre"></div>
                        <div className="skeleton genre"></div>
                    </div>

                    <div className="skeleton fav-btn"></div>

                    <div className="synopsis-skeleton">
                        <div className="skeleton line"></div>
                        <div className="skeleton line"></div>
                        <div className="skeleton line"></div>
                        <div className="skeleton line short"></div>
                    </div>

                    <div className="details-grid">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div className="detail-skeleton" key={i}>
                                <div className="skeleton detail-label"></div>
                                <div className="skeleton detail-value"></div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </main>
    );
}