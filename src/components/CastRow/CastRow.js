import React from 'react';
import "./CastRow.css";

const base_url = "https://image.tmdb.org/t/p/w500/";

function CastRow({ cast }) {
    return (
        <div className="castRow">
            <h2 className="text-center mb-4">Cast</h2>
            <div className="castRow__images">
                {cast.map((actor) => (
                    <div key={actor.id} className="castRow__imageContainer" >
                        <img
                            className="castRow__actorImage"
                            src={`${base_url}${actor.profile_path}`}
                            alt={actor.title || actor.name}
                        />
                        <div className="castRow__actorInfo">
                            <p className="castRow__actorName">{actor.name}</p>
                            {actor.character && <p className="castRow__actorCharacter">Character: {actor.character}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CastRow;