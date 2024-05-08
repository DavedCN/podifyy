const Button = ({ text, onClick, disabled, width, margin, height }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-transparent rounded border-2 border-solid border-white py-2 px-4 ${
        width ? width : "w-3/6"
      } placeholder:text-purple-grey text-white text-sm hover:bg-white hover:text-theme transition duration-300 ${
        margin ? margin : "m-4"
      } text-center cursor-pointer`}
      disabled={disabled}
    >
      {text}
    </div>
  );
};

export default Button;
