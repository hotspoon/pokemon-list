import Image from "next/image"
import PokemonList from "./_components/PokemonList"

export default async function Home() {
  return (
    <>
      <div className="relative h-full w-full z-[-1] opacity-15">
        <div className="absolute top-0 right-0">
          <Image src="/assets/images/pokeball.png" alt="pokeball" width={400} height={400} />
        </div>
      </div>
      <div className="min-h-screen container py-10">
        <div className="flex">
          <h1 className="text-2xl font-bold">Pokedex</h1>
        </div>
        <PokemonList />
      </div>
    </>
  )
}
