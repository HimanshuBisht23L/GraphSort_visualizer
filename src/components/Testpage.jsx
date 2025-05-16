import '../styles/Testpage.css';
import { useNavigate } from 'react-router-dom';

export default function TestPage() {
  const navigate = useNavigate();

  return (
    <div className="main-box">
      <div className="sub-box">
        <div className="Page-head">
          <h1>Graph & Sorting Visualizer</h1>
          <p className="para-data">Understand graph algorithms and sorting visually with ease.</p>
        </div>

        <div className="visoBtn">
          <button onClick={() => navigate('/Graph')}>Graph Visualizer</button>
          <button onClick={() => navigate('/Sorting')}>Sorting Visualizer</button>
        </div>
      </div>
    </div>
  );
}
