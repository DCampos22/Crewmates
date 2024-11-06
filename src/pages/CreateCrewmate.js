import React, { useState } from 'react';
import './CreateCrewmate.css';
import { supabase } from '../client';

const CreateCrewmate = ({ addCrewmate }) => {
    const [crewmate, setCrewmate] = useState({
        name: "",
        color: "",
        loyalty_level: 1,
        sus_level: 1
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const createCrewmate = async (event) => {
        event.preventDefault();

        // Insert the crewmate data into the Supabase table
        const { data, error } = await supabase
            .from('Crewmates')
            .insert([{ 
                name: crewmate.name, 
                color: crewmate.color, 
                loyalty_level: crewmate.loyalty_level, 
                sus_level: crewmate.sus_level
            }])
            .select();

        if (error) {
            console.error("Error inserting crewmate:", error);
        } else {
            console.log("Crewmate inserted successfully:", data);
            // Add the new crewmate to the list in the parent component
            addCrewmate(data[0]); // Assuming data[0] is the new crewmate
            // Redirect after successful submission
            window.location = "/";
        }
    };

    return (
        <div>
            <form onSubmit={createCrewmate}>
                <label htmlFor="name">Name</label><br />
                <input type="text" id="name" name="name" value={crewmate.name} onChange={handleChange} /><br /><br />

                <label htmlFor="color">Color</label><br />
                <select
                    id="color"
                    name="color"
                    value={crewmate.color}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Purple">Purple</option>
                    <option value="Pink">Pink</option>
                    <option value="Orange">Orange</option>
                    <option value="Cyan">Cyan</option>
                </select><br /><br />

                <label htmlFor="loyalty_level">Loyalty Level</label><br />
                <input type="number" id="loyalty_level" name="loyalty_level" value={crewmate.loyalty_level} min="1" max="10" onChange={handleChange} /><br /><br />

                <label htmlFor="sus_level">Sus Level</label><br />
                <input type="number" id="sus_level" name="sus_level" value={crewmate.sus_level} min="1" max="10" onChange={handleChange} /><br /><br />

                <input type="submit" value="Submit Crewmate" />
            </form>
        </div>
    );
};

export default CreateCrewmate;
