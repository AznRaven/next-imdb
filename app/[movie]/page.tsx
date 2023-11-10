import Image from "next/image";
import React from "react";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function generateStaticParams() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  return data.results.map((x : any) => ({ x: toString(x.id), }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imgPath = "https://image.tmdb.org/t/p/original";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();
  console.log(res);
  return (
    <div>
      <div>
        <h2 className="text-2xl">{res.title}</h2>
        <h2 className="text-lg">{res.release_date}</h2>
        <h2 className="text-lg">Runtime: {res.runtime} minutes</h2>
        <h2 className="text-sm bg-green-600 inline-block my-2 py-2 px-4 rounded-md">
          {res.status}
        </h2>
        <div className="flex justify-center">
          <Image
            className="my-12"
            src={imgPath + res.backdrop_path}
            width={1000}
            height={1000}
            priority
          />
        </div>
        <p>{res.overview}</p>
      </div>
    </div>
  );
}
