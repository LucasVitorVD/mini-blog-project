import { useState } from "react"
import { useAuthentication } from "../hooks/useAuthentication"
import Form from "../components/form/Form"
import Input from "../components/form/Input"

const Login = () => {
  const { login, error, loading } = useAuthentication()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const user = {email, password}
    await login(user)
  }

  return (
    <Form headerTitle='Entrar'
    spanText='Faça login para utilizar o sistema'
    buttonText='Entrar'
    handleSubmit={handleSubmit}
    error={error}
    loading={loading}
    >
      <Input
        labelName="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        value={email}
        handleEvent={(e) => setEmail(e.target.value)}
      />
      <Input
        labelName="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        value={password}
        handleEvent={(e) => setPassword(e.target.value)}
      />
    </Form>
  )
}

export default Login
