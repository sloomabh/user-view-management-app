import { Link } from "react-router-dom";

interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

const Header: React.FC<HeaderProps> = ({
  heading,
  paragraph,
  linkName,
  linkUrl = "",
}) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src="/hibot.png"
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className=" text-center text-sm text-gray-600 mt-5">
        {paragraph}
        <Link
          to={linkUrl}
          className="font-medium text-primary-600 hover:text-primary-700"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default Header;
