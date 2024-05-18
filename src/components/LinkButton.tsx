interface LinkButtonProps {
  title: string;
  onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, onClick }) => {
  return (
    <button type="button"
      className="p-2 cursor-pointer text-base font-normal hover:font-semibold relative slice-text"
      onClick={onClick}
      >{title}
    </button>
  )
}

export default LinkButton;