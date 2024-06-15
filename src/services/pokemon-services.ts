import { IMAGE_API_URL, POKEMON_API_DETAIL_URL, POKEMON_API_URL } from "@/constant"
import axios from "axios"

async function fetchPokemon(id: number) {
  try {
    const response = await axios.get(`${POKEMON_API_URL}/${id}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

async function fetchSpecies(id: number) {
  try {
    const response = await axios.get(`${POKEMON_API_DETAIL_URL}/pokemon-species/${id}`)
    return response.data
  } catch (error) {
    handleError(error)
  }
}

async function fetchAllPokemon() {
  try {
    const response = await axios.get(`${POKEMON_API_URL}`)
    const results = response.data.results
    const pokemons = results.map((pokemon: any) => {
      const id = pokemon.url.split("/")[6]
      return {
        name: pokemon.name,
        url: pokemon.url,
        id: id,
        imageUrl: `${IMAGE_API_URL}${id}.png`
      }
    })
    return pokemons
  } catch (error) {
    handleError(error)
  }
}

export { fetchPokemon, fetchAllPokemon, fetchSpecies }

function handleError(error: any) {
  if (error.response) {
    console.error(error.response.data)
    console.error(error.response.status)
    console.error(error.response.headers)
  } else if (error.request) {
    console.error(error.request)
  } else {
    console.error("Error", error.message)
  }
  console.error(error.config)
}
