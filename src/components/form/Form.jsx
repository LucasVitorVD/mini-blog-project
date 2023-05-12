import "./Form.css"

const Form = ({ children, headerTitle, spanText, buttonText, handleSubmit, error, loading }) => {
  return (
    <section className="form_section">
      <div className="form_section__header">
        <h1>{headerTitle}</h1>
        <span>{spanText}</span>
      </div>

      <form onSubmit={handleSubmit} className="form_section__form">
        {error && <p className="errorStatus">{error}</p>}
        {children}
        {!loading ? (
          <button type="submit" className="form_section__btn">
            {buttonText}
          </button>
        ) : (
          <button type="submit" className="form_section__btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </section>
  )
}

export default Form
