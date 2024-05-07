const InputComponent = ({ type, placeholder, state, setState, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => setState(e.target.value)}
      value={state}
      required={required}
      className="bg-transparent rounded border-2 border-solid border-purple-grey  py-2 px-4 focus:outline-blue focus:bg-white focus:text-purple-grey w-3/6 placeholder:text-purple-grey text-white text-sm m-4"
    />
  );
};

export default InputComponent;
