import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './EditCrewmate.css';

const EditCrewmate = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crewmate, setCrewmate] = useState({
        id: null,
        name: "",
        color: "",
        loyalty_level: 1,
        sus_level: 1
    });

    useEffect(() => {
        const foundCrewmate = data.find((c) => c.id === parseInt(id)); // Parse id to integer for comparison
        if (foundCrewmate) {
            setCrewmate(foundCrewmate);
        }
    }, [id, data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCrewmate((prev) => ({
            ...prev,
            [name]: name === 'loyalty_level' || name === 'sus_level' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = await supabase
            .from('Crewmates')
            .update({
                name: crewmate.name,
                color: crewmate.color,
                loyalty_level: crewmate.loyalty_level,
                sus_level: crewmate.sus_level
            })
            .eq('id', parseInt(id));

        if (error) {
            console.error('Error updating crewmate:', error);
        } else {
            console.log('Crewmate updated successfully');
            navigate('/'); // Navigate to home after successful update
        }
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('Crewmates')
            .delete()
            .eq('id', parseInt(id));

        if (error) {
            console.error('Error deleting crewmate:', error);
        } else {
            console.log('Crewmate deleted successfully');
            navigate('/'); // Navigate to home after successful delete
        }
    };

    return (
        <div className="EditCrewmate">
            <h2>Edit Crewmate</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label><br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={crewmate.name}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="color">Color</label><br />
                <select
                    id="color"
                    name="color"
                    value={crewmate.color || ""} // Fallback if color is undefined
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

                <label htmlFor="loyalty_level">Loyalty Level (1-10)</label><br />
                <input
                    type="number"
                    id="loyalty_level"
                    name="loyalty_level"
                    value={crewmate.loyalty_level}
                    min="1"
                    max="10"
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="sus_level">Sus Level (1-10)</label><br />
                <input
                    type="number"
                    id="sus_level"
                    name="sus_level"
                    value={crewmate.sus_level}
                    min="1"
                    max="10"
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit" className="updateButton">Update Crewmate</button>
                <button type="button" className="deleteButton" onClick={handleDelete}>Delete Crewmate</button>
            </form>
        </div>
    );
};

export default EditCrewmate;
