import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { fetchAllPokemon } from "@/services/pokemon-services"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const pokemons = await fetchAllPokemon()

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

        <div className="grid grid-cols-2 gap-2 my-10">
          {pokemons.map((pokemon: any) => (
            <Link href={`/detail/${pokemon.id}`}>
              <Card key={pokemon.id} className="rounded-2xl bg-[#3ec8a0]">
                <div className="px-2 py-3">
                  <div className="flex justify-end text-gray-600 font-bold opacity-15">
                    #{String(pokemon.id).padStart(3, "0")}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm font-bold text-white capitalize">{pokemon.name}</h2>
                      <Badge variant="default" className="bg-[rgba(255,255,255,0.2)] text-white">
                        Grass
                      </Badge>
                      <Badge variant="default" className="bg-[rgba(255,255,255,0.2)] text-white">
                        Poison
                      </Badge>
                    </div>
                    <div className="relative">
                      <Image
                        src="/assets/images/pokeball.png"
                        alt="pokeball"
                        layout="fill"
                        objectFit="cover"
                        className="absolute z-10 opacity-15"
                      />
                      <Image
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        width={100}
                        height={100}
                        className="w-full h-auto relative z-20"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
