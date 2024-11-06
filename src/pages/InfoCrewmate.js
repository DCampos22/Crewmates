// CrewmateInfo.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const InfoCrewmate = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    // Fetch the crewmate data from the database using the ID
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('Crewmates')
        .select('*')
        .eq('id', id)
        .single(); // Single returns one object instead of an array

      if (error) {
        console.error("Error fetching crewmate:", error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]); // Runs every time the id in the URL changes

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div className="CrewmateInfo">
      <h2>{crewmate.name}</h2>
      <p>Color: {crewmate.color}</p>
      <p>Loyalty Level: {crewmate.loyalty_level}</p>
      <p>Sus Level: {crewmate.sus_level}</p>
      {/* You can add more details here as needed */}
    </div>
  );
};

export default InfoCrewmate;
