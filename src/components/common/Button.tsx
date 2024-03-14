interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  addClassName?: string;
  text?: string;
}
const Button = ({ type, addClassName, text, ...props }: ButtonProps) => {
  return (
    <>
      <button
        className={
          `group relative ${addClassName ? addClassName : "w-full"} flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-10`
        }
        type={type}
        {...props}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
