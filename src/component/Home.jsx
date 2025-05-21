import './../style/Home.css'
import background from './../img/background2.jpg'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className='home-main-container' >
        <div className='img-container'>
            <img  src={background}/>
        </div>
        <div className='home-container'>

      <div>
        <h1>WELCOME</h1>
      <button className='button1' onClick={() => navigate('/list')}>take quiz</button>
<button className='button2' onClick={() => navigate('/create')}>create quiz</button>      </div>
    </div>
    </div>
  )
}

export default Home
