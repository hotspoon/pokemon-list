type PokemonType = "grass" | "poison" | "fire" | "water" // Add more types as needed
export const typeToColor = (type: string) => {
  const colors: { [key in PokemonType]: string } = {
    grass: "#78C850",
    poison: "#A040A0",
    fire: "#F08030",
    water: "#6890F0"
    // Add more types and colors as needed
  }
  return colors[type.toLowerCase() as PokemonType] || "#68A090" // Default color if type not found
}
