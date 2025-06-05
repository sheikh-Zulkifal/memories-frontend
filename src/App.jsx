
import {Route,Routes} from 'react-router-dom'
import CreateMemory from './pages/CreateMemory'
import ViewMemory from './pages/ViewMemory'


function App() {
  

  return (
    <>
    <Routes>
      <Route path = "/" element = {<CreateMemory/>} />
      <Route path='memory/:shortId' element = {<ViewMemory/>} />
    </Routes>
    </>
  )
}

export default App
