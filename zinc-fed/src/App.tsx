import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'
import SignIn from './Pages/Auth/SignIn'

function App() {
   const [count, setCount] = useState(0)

   return (
      <>
         <SignIn></SignIn>
      </>
   )
}

export default App
