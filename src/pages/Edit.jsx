import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateDocument } from "../hooks/useUpdateDocument"
import { useFetchId } from "../hooks/useFetchId";
import Loading from "../components/Loading";
import Input from "../components/form/Input";
import Form from "../components/form/Form";

const PostContent = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchId("posts", id);
  const { updateDocument, response } = useUpdateDocument('posts')
  const [postData, setPostData] = useState({})
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState(undefined)
  const navigate = useNavigate() 

  useEffect(() => {
    if (post) {
      setPostData({...post})
      setTags(postData.tags)
    }
  }, [post])

  function handleCreatePostInputChange(e) {
    return setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  function handleTagsInputChange(e) {
    return setTags(e.target.value.split(',').map(tag => tag.trim().toLowerCase().replace('#', '')))
  }

  function handleEditSubmit(e) {
    e.preventDefault()

    if (Object.values(postData).includes("")) {
      setFormError('Por favor, preencha todos os campos!')
    } else {
      postData.tags = tags
    }

    try {
      new URL(postData.image)
    } catch (err) {
      setFormError('A imagem precisa ser uma URL.')
    }

    console.log(postData)

    updateDocument(postData.postId, postData)
    navigate('/dashboard')
  
    if (formError) return
  }

  return (
    <>
      {loading && <Loading />}

      {post ? (
        <Form
          headerTitle={`Editando post: ${post.title}`}
          spanText="Altere os dados do post como desejar!"
          buttonText="Editar post"
          handleSubmit={handleEditSubmit}
          error={formError}
        >
          <Input
            labelName="Título"
            type="text"
            name="title"
            value={postData.title}
            handleEvent={handleCreatePostInputChange}
          />
          <Input
            labelName="URL da imagem"
            type="text"
            name="image"
            value={postData.image}
            handleEvent={handleCreatePostInputChange}
          />

          <figure className="post_image">
            <img src={postData.image} alt={postData.title} />
            <figcaption hidden>{postData.author}</figcaption>
          </figure>

          <Input
            labelName="Conteúdo"
            type="textarea"
            name="content"
            value={postData.content}
            handleEvent={handleCreatePostInputChange}
          />
          <Input
            labelName="Tags"
            type="text"
            name="tags"
            value={tags}
            handleEvent={handleTagsInputChange}
          />
        </Form>
      ) : (
        <p>Não foi possível carregar o post!</p>
      )}
    </>
  );
};

export default PostContent;
