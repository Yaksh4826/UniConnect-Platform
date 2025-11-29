import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import './App.css'
import { AppRouter } from './router/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <AppRouter/>
      </AuthProvider>
          </>
  )
}

export default App
