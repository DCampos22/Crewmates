import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';

const ReadCrewmates = () => {
    const [crewmates, setCrewmates] = useState([]);

    useEffect(() => {
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

        fetchCrewmates();
    }, []);

    return (
        <div className="ReadCrewmates">
            {
                crewmates && crewmates.length > 0 ? (
                    crewmates.map((crewmate) => (
                        <Card 
                            key={crewmate.id} 
                            id={crewmate.id} 
                            name={crewmate.name} 
                            color={crewmate.color}
                            loyalty_level={crewmate.loyalty_level} 
                            sus_level={crewmate.sus_level} 
                        />
                    ))
                ) : (
                    <h2>No Crewmates Available</h2>
                )
            }
        </div>
    );
};

export default ReadCrewmates;
