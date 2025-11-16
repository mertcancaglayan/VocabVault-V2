import "../mainButton/MainButton.css"
interface MainButtonProps {
  text: string;
  disabled?: boolean;
}

function MainButton({ text, disabled }: MainButtonProps) {



  return (
    <button disabled={disabled} className='btn-main'>{text}</button>
  )
}

export default MainButton
