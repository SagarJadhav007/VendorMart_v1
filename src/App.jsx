import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SupplierDirectory from './SupplierDirectory'
import Card from './FeaturedSuppliers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
     <SupplierDirectory/>
     <Card/>
    </>
  )
}

export default App
