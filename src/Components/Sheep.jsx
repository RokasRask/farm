import sheepImage from '../Images/sheep.svg';
import '../ComponentStyles/sheep.css';

const Sheep = ({ id, onClick }) => {
  return (
    <div className="sheep-container" onClick={onClick}>
      <img src={sheepImage} alt="Sheep" className="sheep-image" />
      <div className="sheep-id">{id}</div>
    </div>
  );
};

export default Sheep;