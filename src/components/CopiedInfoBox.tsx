import { useEffect } from "react";

export type CopiedInfoBoxProps = {
    message: string;
    onClose: () => void;
  };

function CopiedInfoBox({ message, onClose }: CopiedInfoBoxProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="copied-box">
      <p>{message}</p>
    </div>
  );
}

export default CopiedInfoBox;
