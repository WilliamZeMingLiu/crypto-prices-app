import '../App.css';

const CoinDisplay = ({ name, img }) => {
  return (
    <div className="table-cell">
        { name }
        { img }
    </div>
  );
}

export default CoinDisplay;