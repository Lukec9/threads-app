import {  Container} from '@chakra-ui/react'
import { Route, Routes} from 'react-router-dom'
import UserPage from './pages/UserPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import PostPage from './pages/PostPage'

function App() {

  return (    
    <Container  maxW="620px">
      <Header />
      <Routes>
        <Route path='/:username' element={<UserPage />} />
        <Route path='/' element={<HomePage />}/>
        <Route path='/:username/post/:pid' element={<PostPage />} />
      </Routes>
    </Container>
  )
}

export default App
