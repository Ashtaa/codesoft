import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import QuizCreation from './component/Quiz_creation'
import Quiz_listing from './component/Quiz_listing'
import Quiz_taking from './component/Quiz_taking'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<QuizCreation />} />
      <Route path='/list' element={<Quiz_listing />} />
          <Route path="/take-quiz/:id" element={<Quiz_taking />} />

      </Routes> 
    </>
  )
}

export default App
