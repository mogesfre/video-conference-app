import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Meeting from './components/Meeting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meeting/:meetingId" element={<Meeting />} />
      </Routes>
    </Router>
  );
}

export default App;
