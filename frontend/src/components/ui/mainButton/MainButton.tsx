import { memo } from "react";
import "../mainButton/MainButton.css"
interface MainButtonProps {
  text: string;
  disabled?: boolean;
  onClick: () => void;
}

function MainButton({ text, disabled, onClick }: MainButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick} className='btn-main'>{text}</button>
  )
}

export default memo(MainButton);
