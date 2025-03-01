import cowImage from '../Images/cow.svg';
import '../ComponentStyles/cow.css';

const Cow = ({ id, onClick }) => {
  return (
    <div className="cow-container" onClick={onClick}>
      <img src={cowImage} alt="Cow" className="cow-image" />
      <div className="cow-id">{id}</div>
    </div>
  );
};

export default Cow;