import './App.css';
import React, { useEffect, useState } from 'react';
import { useRoutes, Link } from 'react-router-dom';
import ReadCrewmates from './pages/ReadCrewmate';
import CreateCrewmate from './pages/CreateCrewmate';
import EditCrewmate from './pages/EditCrewmate';
import InfoCrewmate from './pages/InfoCrewmate';
import { supabase } from '../src/client'; // Ensure you have the supabase client imported

const App = () => {
    const [crewmates, setCrewmates] = useState([]);

    const fetchCrewmates = async () => {
        const { data, error } = await supabase
            .from('Crewmates')
            .select()
            .order('loyalty_level', { ascending: true });

        if (error) {
            console.error('Error fetching crewmates:', error);
        } else {
            setCrewmates(data);
        }
    };

    useEffect(() => {
        fetchCrewmates(); // Fetch crewmates on mount
    }, []);

    const addCrewmate = (newCrewmate) => {
        setCrewmates((prevCrewmates) => [...prevCrewmates, newCrewmate]);
    };

    // Routes configuration
    let element = useRoutes([
        { path: "/", element: <ReadCrewmates crewmates={crewmates} /> },
        { path: "/edit/:id", element: <EditCrewmate data={crewmates} /> },
        { path: "/new", element: <CreateCrewmate addCrewmate={addCrewmate} fetchCrewmates={fetchCrewmates} /> },
        { path: "/crewmate/:id", element: <InfoCrewmate crewmates={crewmates} /> } // Add the InfoCrewmate route
    ]);

    return (
        <div className="App">
            <div className="header">
                <h1>👨‍🚀 Crew Builder</h1>
                <Link to="/"><button className="headerBtn"> View Crewmates 🔍 </button></Link>
                <Link to="/new"><button className="headerBtn"> Add Crewmate 🚀 </button></Link>
            </div>
            {element}
        </div>
    );
};

export default App;
