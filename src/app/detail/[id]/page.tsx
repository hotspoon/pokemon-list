import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IMAGE_API_URL } from "@/constant"
import { fetchPokemon, fetchSpecies } from "@/services/pokemon-services"
import Image from "next/image"
import BaseStats from "./base-stats"
import About from "./about"

// Define a type for the items in the types array
type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

async function Page({ params }: { params: { id: string } }) {
  const { name, types, weight, height, abilities } = await fetchPokemon(Number(params.id))
  // const species = await fetchSpecies(Number(params.id))
  // Correctly typed version of the map function
  const typeNames = types.map((item: PokemonType) => item.type.name)
  const abilityNames = (abilities as any[]).map((ability: any) => ability.ability.name)

  let aboutData = {
    weight: weight,
    height: height,
    abilities: abilityNames
  }
  return (
    <>
      <div className="h-screen flex flex-col bg-[#3ec8a0]">
        <div className="flex-1 container">
          <div className="grid grid-cols-4 pt-10 items-center">
            <div className="col-span-3">
              <h1 className="text-3xl font-bold text-white capitalize">{name}</h1>
              <div className="flex gap-2 my-2">
                {types.map((item: PokemonType, index: number) => (
                  <Badge
                    key={index}
                    variant="default"
                    className="bg-[rgba(255,255,255,0.2)] text-white capitalize"
                  >
                    {item.type.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex justify-end text-white font-bold">
                #{String(params.id).padStart(3, "0")}
              </div>
            </div>
          </div>
          <div className="flex justify-center z-1">
            <div className="relative">
              <Image
                src={`${IMAGE_API_URL}${params.id}.png`}
                alt="pokeball"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        <Card className="rounded-tl-3xl rounded-tr-3xl flex-1">
          <div className="pt-10 px-4 text-sm">
            <Tabs defaultValue="about">
              <TabsList className="w-full bg-transparent z-10">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="base_stats">Base Stats</TabsTrigger>
                <TabsTrigger value="evolution">Evo</TabsTrigger>
                <TabsTrigger value="moves">Moves</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <About data={aboutData} />
              </TabsContent>
              <TabsContent value="base_stats">
                <BaseStats />
              </TabsContent>

              <TabsContent value="evolution">
                <div>Evolution</div>
              </TabsContent>
              <TabsContent value="moves">
                <div>Moves</div>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Page

{
  /* <div className="flex justify-center">
            <Image
              src={`${IMAGE_API_URL}${params.id}.png`}
              alt="pokeball"
              width={400}
              height={400}
            />
          </div> */
}
