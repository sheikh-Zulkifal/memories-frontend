import { Route, Routes } from 'react-router-dom';
import CreateMemory from './pages/CreateMemory';
import ViewMemory from './pages/ViewMemory';
import HomePage from './pages/HomePage'; // ✅ new import

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/create" element={<CreateMemory />} />
        <Route path="/memory/:shortId" element={<ViewMemory />} />
      </Routes>
    </>
  );
}

export default App;
