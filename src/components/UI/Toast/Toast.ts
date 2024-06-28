import toast from "react-hot-toast";

export const toastSuccess = (message: string) => {
  const successStyle = {
    background: "rgba(7, 10, 20, 0.5)",
    padding: "20px 30px 20px 30px",
    // borderBottom: "2px solid #181A22",
    // borderLeft: "2px solid #181A22",
    // borderRight: "2px solid #181A22",
    borderRadius: "24px",
    color: "#72E292",
    fontSize: "18px",
    fontWeight: "400",
  };

  toast.success(message, { style: successStyle });
};

export const toastError = (message: string) => {
  const errorStyle = {
    background: "rgba(7, 10, 20, 0.5)",
    padding: "20px 30px 20px 30px",
    // borderBottom: "2px solid #181A22",
    // borderLeft: "2px solid #181A22",
    // borderRight: "2px solid #181A22",
    borderRadius: "24px",
    color: "#d6405e",
    fontSize: "18px",
    fontWeight: "400",
  };

  toast.error(message, { style: errorStyle });
};