"use client"
import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { typeToColor } from "@/lib/type-color"

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon"
const IMAGE_API_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const PokemonList = () => {
  const [items, setItems] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [index, setIndex] = useState(1) // Start index at 1 for clarity

  async function fetchAllPokemon(offset: number, limit: number) {
    try {
      const response = await axios.get(`${POKEMON_API_URL}?offset=${offset}&limit=${limit}`)
      const results = response.data.results
      const pokemons = await Promise.all(
        results.map(async (pokemon: any) => {
          const id = pokemon.url.split("/")[6]
          // Fetch detailed Pokémon data to get types
          const pokemonDetailResponse = await axios.get(pokemon.url)
          const types = pokemonDetailResponse.data.types.map(
            (typeEntry: any) => typeEntry.type.name
          )
          // Map each type to its corresponding color
          const color = types.length > 0 ? typeToColor(types[0]) : "#68A090" // Default color if no types
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: id,
            imageUrl: `${IMAGE_API_URL}${id}.png`,
            types: types, // Include types in the Pokémon object
            colors: color // Include colors based on types
          }
        })
      )
      console.log(pokemons)
      return pokemons
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllPokemon(0, 20).then((pokemons) => {
      if (pokemons) {
        setItems(pokemons)
      }
    })
  }, [])

  const fetchMoreData = () => {
    const offset = index * 20
    fetchAllPokemon(offset, 20).then((pokemons) => {
      if (pokemons) {
        setItems((prevItems: any) => [...prevItems, ...pokemons])
        pokemons.length > 0 ? setHasMore(true) : setHasMore(false)
      }
    })
    setIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={"Loading..."}
      className="grid grid-cols-2 gap-2 my-10"
    >
      {items.map((pokemon: any) => (
        <Link href={`/detail/${pokemon.id}`} key={pokemon.id}>
          <Card className="rounded-2xl bg-[#3ec8a0] h-36">
            <div className="px-2 py-3">
              <div className="flex justify-end text-gray-600 font-bold opacity-15">
                #{String(pokemon.id).padStart(3, "0")}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-sm font-bold text-white capitalize">{pokemon.name}</h2>
                  {/* Dynamic badges for Pokémon types would go here */}
                  <div className="flex flex-col gap-2 my-2">
                    {pokemon.types.map((item: any, index: number) => (
                      <Badge
                        key={index}
                        variant="default"
                        className="bg-[rgba(255,255,255,0.2)] text-white capitalize"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
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
    </InfiniteScroll>
  )
}

export default PokemonList
