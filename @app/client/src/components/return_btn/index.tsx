import { useNavigate } from "react-router-dom";
import Return from "../../assets/Return";

function ReturnBtn() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <button type="button" onClick={handleClick}>
      <Return />
    </button>
  );
}

export default ReturnBtn;
