import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'

import { Toaster } from 'react-hot-toast'
import { Fade } from 'react-awesome-reveal'

import { HomeScreen } from './screens/HomeScreen'
import { AlgoScreen } from 'screens/AlgoScreen'

import { Header } from 'components/molecules/Header'
import { Brand } from 'components/molecules/Brand'

function App () {
  return (
    <Router>
      <div className="App h-screen bg-zinc-900">
        <Toaster />
        <Header />
        <Fade triggerOnce duration={2000}>
          <Brand />
        </Fade>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/algo" element={<AlgoScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
