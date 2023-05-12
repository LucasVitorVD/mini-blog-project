import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useInsertDocument } from "../hooks/useInsertDocument"
import { useAuthValue } from "../context/AuthContext"
import { v4 as uuidv4 } from "uuid"
import Form from "../components/form/Form"
import Input from "../components/form/Input"

const NewPost = () => {
  const [postData, setPostData] = useState({})
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState(undefined)
  const { insertDocument, response } = useInsertDocument('posts')
  const { user } = useAuthValue()
  const navigate = useNavigate()

  function handleCreatePostInputChange(e) {
    return setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  function handleTagsInputChange(e) {
    return setTags(e.target.value.split(',').map(tag => tag.trim().toLowerCase().replace('#', '')))
  }

  function handleCreatePostSubmit(e) {
    e.preventDefault()

    if (Object.values(postData).includes("")) {
      setFormError('Por favor, preencha todos os campos!')
    } else {
      postData.tags = tags
      postData.author = user.displayName
      postData.userId = user.uid
      postData.postId = uuidv4()
    }

    try {
      new URL(postData.image)
    } catch (err) {
      setFormError('A imagem precisa ser uma URL.')
    }

    insertDocument(postData)
    navigate('/')
  
    if (formError) return
  }

  return (
    <Form 
    headerTitle='Criar post'
    spanText='Escreva sobre o que quiser e compartilhe o seu conhecimento!'
    buttonText='Criar post'
    handleSubmit={handleCreatePostSubmit}
    error={formError || response.error}
    loading={response.loading}
    >
        <Input
          labelName="Título"
          type="text"
          name="title"
          placeholder="Pense em um bom título..."
          value={postData.title}
          handleEvent={handleCreatePostInputChange}
        />
        <Input
          labelName="URL da imagem"
          type="text"
          name="image"
          placeholder="Insira uma imagem que represente seu post"
          value={postData.image}
          handleEvent={handleCreatePostInputChange}
        />
        <Input
          labelName="Conteúdo"
          type="textarea"
          name="content"
          placeholder="Insira o conteúdo do post"
          value={postData.content}
          handleEvent={handleCreatePostInputChange}
        />
        <Input
          labelName="Tags"
          type="text"
          name="tags"
          placeholder="Insira as tags separadas por vírgula"
          value={tags}
          handleEvent={handleTagsInputChange}
        />
    </Form>
  )
}

export default NewPost
