import "./Input.css";

const Input = ({ labelName, type, name, id, placeholder, handleEvent, value }) => {
  return (
    <label className="label_content">
      <span>{labelName}</span>
      {type !== "textarea" ? (
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleEvent}
          placeholder={placeholder}
          value={value}
          required
          className="label_content__input"
        />
      ) : (
        <textarea
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={handleEvent}
          value={value}
          required
          className="label_content__input_textarea"
        ></textarea>
      )}
    </label>
  );
};

export default Input;
