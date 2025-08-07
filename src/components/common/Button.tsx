import { Button } from "@mui/material";

type CustomButtonProps = {
  placeholder: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  sx?: object;
};

export const CustomButton: React.FC<CustomButtonProps> = ({
  placeholder,
  onClick,
  sx,
}) => {
  return (
    <Button variant="contained" onClick={onClick} sx={sx}>
      {placeholder}
    </Button>
  );
};
