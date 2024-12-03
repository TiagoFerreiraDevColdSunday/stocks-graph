"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import yahooFinance from 'yahoo-finance2';

export default function Home() {
  const [name, setName] = useState<string | null>(null); // State to store the fetched name
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status


  useEffect(() => {
    const fetchData = async () => {
      try {

        yahooFinance.suppressNotices(['yahooSurvey'])
        const result = await yahooFinance.quoteSummary('AAPL');
        setName(result.price?.shortName || "Unknown");


      } catch (error) {
        console.error("Failed to fetch data:", error)
        setName("Error fetching data")
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Stock Name: {loading ? "Loading..." : name}</h1> {/* Render stock name or loading */}
    </div>
  );
}
