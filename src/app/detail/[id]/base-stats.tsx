import React from "react"

function BaseStats() {
  // Example stat values
  const stats = {
    hp: 45,
    attack: 60,
    defense: 70,
    spAtk: 65,
    spDef: 60,
    speed: 55,
    total: 355
  }

  const maxStat = 100 // Maximum stat for calculation, adjust as needed

  // Function to calculate the percentage width of the stat bar
  //   const calculatePercentage = (value: number) => (value / maxStat) * 100
  // Adjust the calculatePercentage function to ensure it does not exceed 100%
  const calculatePercentage = (value: number) => Math.min((value / maxStat) * 100, 100)

  // Function to determine the bar color based on the stat name
  const getBarColor = (statName: string) => {
    switch (statName) {
      case "hp":
      case "defense":
      case "speed":
        return "bg-red-600" // Red color for HP, Defense, and Speed
      default:
        return "bg-green-600" // Green color for other stats
    }
  }

  return (
    <div className="px-4 py-5 overflow-hidden">
      {Object.entries(stats).map(([statName, value]) => (
        <div key={statName} className="grid grid-cols-4 mb-3 items-center">
          <div className="col-span-1 text-gray-500">{statName.toUpperCase()}</div>
          <div className="col-span-1 font-bold">{value}</div>
          <div className="col-span-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
              <div
                className={`${getBarColor(statName)} h-2.5 rounded-full max-w-full`}
                style={{ width: `${calculatePercentage(value)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}

      <p className="text-xl font-bold">Type defenses</p>
      <p className="text-sm text-gray-500">The effectiveness of each type on Charmander</p>
    </div>
  )
}

export default BaseStats
