import { User } from "@tomersf/blog.shared"
import { Dispatch, SetStateAction, useState } from "react";
import authService from '../services/auth'
import Message from "./Message";

type Props = {
  setUser: Dispatch<SetStateAction<User | undefined>>;
  setToken: Dispatch<SetStateAction<string>>;
};


const AuthForm = ({ setUser, setToken }: Props) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [isRegistering,setIsRegistering] = useState(true)
  const [validCreds, setValidCreds] = useState(false)
  const [message,setMessage] = useState('')

  const changeAuth = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMessage('')
    e.preventDefault()
    setIsRegistering(oldValue => !oldValue)
  }

  const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setMessage('')
    let result
    if (isRegistering) {
      result = await authService.registerUser(username,password)
      if (result.success) {
        setMessage('Success! Please login now.')
        return
      }
    }
    else {
       result = await authService.loginUser(username,password)
       if(result.success) {
        setUser({
          blogs: [],
          username: result.data!.username,
          id: result.data!.id,
        })
        setToken(result.data!.token)
        return
      }
    }
      setMessage('Something went wrong!')
  }
  return <div className="flex h-full justify-center items-center">
    <form className="flex flex-col gap-6">
      {message && <Message msg={message}/>}
      <h1>{isRegistering ? 'Register Form' : 'Login Form'}</h1>
      <input className="text-black" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input className="text-black" placeholder="Enter Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={changeAuth}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
      <button onClick={handleSubmit}>
        Submit
      </button>
    </form>
  </div>;
};

export default AuthForm;
