import React, { FormEvent, useState } from 'react'
import { Button } from 'reakit/Button'
import { Input } from 'reakit/Input'
import { auth } from 'libs/nhost'
import { useRouter } from 'next/router'
import { useAuth } from '@nhost/react-auth'

const Login: React.FC = (): React.ReactElement => {
  const router = useRouter()
  const { signedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(undefined)
    try {
      await auth.login(email, password)
      router.push('/game/new')
    } catch (e) {
      setError('Login failed. Make sure you email and password match')
    }
  }

  if (signedIn) {
    router.push('/game/new').then()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <Input
            className="border rounded-md border-gray-400 shadow-md"
            type="email"
            name="email"
            value={email}
            onChange={handleOnChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <br />
          <Input
            className="border rounded-md border-gray-400 shadow-md"
            type="password"
            name="password"
            value={password}
            onChange={handleOnChangePassword}
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
      {error && <p>There was an error: {error}</p>}
    </div>
  )
}

export default Login
