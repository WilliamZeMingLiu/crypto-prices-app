import '../App.css';

const PriceDisplay = ({ label1, value1, label2, value2, recommended1, recommended2 }) => {

  const label1Class = recommended1 ? "price-display-recommendation" : "price-display"
  const label2Class = recommended2 ? "price-display-recommendation" : "price-display"
  
  return (
    <>
        <div className={ label1Class }>
            <p>{ label1 }</p>
            <p>${ value1 }</p>
        </div>
        <div className={ label2Class }>
            <p>{ label2 }</p>
            <p>${ value2 }</p>
        </div>
    </>
  );
}

export default PriceDisplay;