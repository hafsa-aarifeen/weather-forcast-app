import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LocationPin = ({ text }) => {
  return (
    <div className="pin">
      <FontAwesomeIcon icon={faCloud} />
      <p className="pin-text">{text}</p>
    </div>
  );
};

export default LocationPin;
