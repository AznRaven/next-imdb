import Image from "next/image";
import Movie from "./components/Movie";



interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[]; // Assuming genre_ids is an array of numbers
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`, {next: {revalidate: 0}}
  );
  const res = await data.json();
  // console.log(res);
  return (
    <main className="">
      <div className="grid gap-16 grid-cols-fluid">
        {res.results.map((x: Movie) => (
          <Movie
            key={x.id}
            id={x.id}
            title={x.title}
            poster_path={x.poster_path}
            release_date={x.release_date}
          />
        ))}
      </div>
    </main>
  );
}
