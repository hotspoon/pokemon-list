"use client"
import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import axios from "axios"
// import ProductCard from "./ProductCard";
// import Loader from "./Loader";

const InfiniteScrollExample1 = () => {
  const [items, setItems] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [index, setIndex] = useState(1) // Start index at 1 for clarity

  useEffect(() => {
    // Changed API to PokeAPI with initial offset 0 and limit 50
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=50")
      .then((res) => setItems(res.data.results)) // Adjusted for PokeAPI response structure
      .catch((err) => console.log(err))
  }, [])

  const fetchMoreData = () => {
    // Adjusted API call to use PokeAPI with dynamic offset based on index, limit set to 50
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${index * 50}&limit=50`) // Adjusted offset calculation for PokeAPI
      .then((res) => {
        setItems((prevItems: any) => [...prevItems, ...res.data.results]) // Adjusted for PokeAPI response structure

        res.data.results.length > 0 ? setHasMore(true) : setHasMore(false) // Check based on results array
      })
      .catch((err) => console.log(err))

    setIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={"Loading..."}
    >
      <div className="container">
        <div className="row">
          {items &&
            items.map((item: any) => (
              <>
                <p>{item.name}</p> {/* Adjusted to display the Pokemon name */}
              </>
            ))}
        </div>
      </div>
    </InfiniteScroll>
  )
}

export default InfiniteScrollExample1
