import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import LoginCard from '../components/LoginCard'
import SignupCard from '../components/SignUpCard'


const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  
  return <>
    {authScreenState === 'login' ? <LoginCard /> : <SignupCard />}
  </>
  
  
}

export default AuthPage