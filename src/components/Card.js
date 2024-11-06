import './Card.css';
import more from './more.png';
import { Link } from 'react-router-dom';

const Card = (props) => {
  

    return (
        <div className="Card">
            {/* Link to edit page */}
            <Link to={'/edit/' + props.id}>
                <img className="moreButton" alt="edit button" src={more} />
            </Link>
            
            <h2 className="name">Name: {props.name}</h2>
            <p className="color">Color: {props.color}</p>
            <p className="loyalty_level">Loyalty Level: {props.loyalty_level}</p>
            <p className="sus_level">Sus Level: {props.sus_level}</p>
            <Link to={`/crewmate/${props.id}`}>
                <button>View More</button>
            </Link>
        </div>
    );
};

export default Card;
