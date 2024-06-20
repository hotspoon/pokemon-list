import { POKEMON_API_URL } from "@/constant"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

// Modify the usePokemons hook to accept an offset parameter
export function usePokemons(offset = 0) {
  const { data, error, isLoading } = useSWR(`${POKEMON_API_URL}?offset=${offset}`, fetcher)

  return {
    pokemon: data,
    isLoading,
    isError: error
  }
}
