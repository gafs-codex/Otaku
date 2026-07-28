export default function SkeletonCard() {
    return (
        <article className="anime-card skeleton-card">
            <div className="skeleton-poster"></div>

            <div className="anime-info">
                <div className="skeleton title"></div>
                <div className="skeleton subtitle"></div>
            </div>
        </article>
    );
}