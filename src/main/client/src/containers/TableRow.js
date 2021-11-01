import '../App.css';

const TableRow = ({ cell1, cell2, cell3 }) => {
  return (
    <div className="table-row">
        <div className="table-cell">
            { cell1 }
        </div>
        <div className="table-cell">
            { cell2 }
        </div>
        <div className="table-cell">
            { cell3 }
        </div>
    </div>
  );
}

export default TableRow;