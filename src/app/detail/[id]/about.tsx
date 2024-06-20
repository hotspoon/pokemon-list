import React from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"

interface AboutProps {
  data: any
}

function About({ data }: AboutProps) {
  // Height conversion
  const totalInches = data.height * 3.937
  const feet = Math.floor(totalInches / 12)
  const inches = (totalInches % 12).toFixed(1)
  const meters = (data.height * 0.1).toFixed(2)

  // Weight conversion
  const pounds = (data.weight * 0.220462).toFixed(1)
  const kilograms = (data.weight * 0.1).toFixed(1)

  // Calculate gender distribution
  const femalePercentage = data.genderRate * 12.5
  const malePercentage = 100 - femalePercentage // Assuming gender_rate is not -1 (genderless)

  return (
    <div className="px-4 py-5">
      <div className="grid grid-cols-3 mb-3">
        <div className="grid-cols-1 text-gray-500">Species</div>
        <div className="grid-cols-2">Seed</div>
      </div>
      <div className="grid grid-cols-3 mb-3">
        <div className="col-span-1 text-gray-500">Height</div>
        <div className="col-span-2">{`${feet}'${inches}" (${meters} m)`}</div>
      </div>
      <div className="grid grid-cols-3 mb-3">
        <div className="col-span-1 text-gray-500">Weight</div>
        <div className="col-span-2">{`${pounds} lbs (${kilograms} kg)`}</div>
      </div>
      <div className="grid grid-cols-3 mb-3">
        <div className="col-span-1 text-gray-500">Abilities</div>
        <div className="col-span-2 capitalize">{data.abilities.join(", ")}</div>
      </div>

      <p className="font-bold my-4">Breeding</p>
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="col-span-1 text-gray-500">Gender</div>
        {data.gender_rate === -1 ? (
          <div className="col-span-3">Genderless</div>
        ) : (
          <>
            <div className="col-span-1 flex items-center">
              <i className="fas fa-mars text-blue-600" aria-hidden="true"></i>
              <span className="ml-2">{malePercentage}%</span>
            </div>
            <div className="col-span-1 flex items-center">
              <i className="fas fa-venus text-pink-600" aria-hidden="true"></i>
              <span className="ml-2">{femalePercentage}%</span>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 mb-3">
        <div className="grid-cols-1 text-gray-500">Egg Groups</div>
        <div className="grid-cols-2 capitalize">{data.eggGroups.join(", ")}</div>
      </div>
      <div className="grid grid-cols-3 mb-3">
        <div className="grid-cols-1 text-gray-500">Egg Cycle</div>
        <div className="grid-cols-2">Grass</div>
      </div>
    </div>
  )
}

export default About
