import { useEffect, useState } from "react"
import Form from "../components/form/Form"
import Input from "../components/form/Input"
import { useAuthentication } from "../hooks/useAuthentication"

const Register = () => {
  const [newUser, setNewUser] = useState({})
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const { createUser, error:authError, loading } = useAuthentication()

  function handleRegisterInputChange(e) {
    setNewUser(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  async function handleRegister(e) {
    e.preventDefault()

    if (newUser.password !== confirmPassword) setError('As senhas precisam ser iguais!')

    const res = await createUser(newUser)
    console.log(res)
  }

  useEffect(() => {
    if (authError) setError((authError))
  }, [authError])

  return (
    <Form
      headerTitle="Cadastre-se"
      spanText="Crie seu usuário e compartilhe suas histórias"
      buttonText="Entrar"
      handleSubmit={handleRegister}
      error={error}
      loading={loading}
    >
      <Input
        labelName="Nome:"
        type="text"
        name="name"
        placeholder="Nome do usuário..."
        value={newUser.name}
        handleEvent={handleRegisterInputChange}
      />
      <Input
        labelName="E-mail:"
        type="email"
        name="email"
        placeholder="Digite seu e-mail..."
        value={newUser.email}
        handleEvent={handleRegisterInputChange}
      />
      <Input
        labelName="Senha:"
        type="password"
        name="password"
        placeholder="Digite sua senha..."
        value={newUser.password}
        handleEvent={handleRegisterInputChange}
      />
      <Input
        labelName="Confirmação de senha:"
        type="password"
        name="confirmPassword"
        placeholder="Confirme a senha..."
        value={confirmPassword}
        handleEvent={(e) => setConfirmPassword(e.target.value)}
      />
    </Form>
  )
}

export default Register
