import m from "./ContextMenu.module.scss";
import { motion } from "framer-motion";

const ContextMenu = ({ setIsMenuOpen, handleChoice }: any) => {
  return (
    <div className={m.menu} onMouseLeave={() => setIsMenuOpen(false)}>
      <ul>
        <motion.li
          onClick={(e) => handleChoice(e, "edit")}
          whileHover={{ backgroundColor: "#A8BBFF", scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_499_1276)">
              <path
                opacity="0.4"
                d="M10.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15V13"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.8799 3.56022C20.6499 6.63022 17.5599 10.8102 14.9799 12.8802L13.3999 14.1402C13.1999 14.2902 12.9999 14.4102 12.7699 14.5002C12.7699 14.3502 12.7599 14.2002 12.7399 14.0402C12.6499 13.3702 12.3499 12.7402 11.8099 12.2102C11.2599 11.6602 10.5999 11.3502 9.91994 11.2602C9.75994 11.2502 9.59994 11.2402 9.43994 11.2502C9.52994 11.0002 9.65994 10.7702 9.82994 10.5802L11.0899 9.00022C13.1599 6.42022 17.3499 3.31022 20.4099 2.08022C20.8799 1.90022 21.3399 2.04022 21.6299 2.33022C21.9299 2.63022 22.0699 3.09022 21.8799 3.56022Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.7801 14.49C12.7801 15.37 12.4401 16.21 11.8101 16.85C11.3201 17.34 10.6601 17.68 9.87009 17.78L7.90009 17.99C6.83009 18.11 5.91009 17.2 6.03009 16.11L6.24009 14.14C6.43009 12.39 7.89009 11.27 9.45009 11.24C9.61009 11.23 9.77009 11.24 9.93009 11.25C10.6101 11.34 11.2701 11.65 11.8201 12.2C12.3601 12.74 12.6601 13.36 12.7501 14.03C12.7701 14.19 12.7801 14.35 12.7801 14.49Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                opacity="0.4"
                d="M15.82 11.9799C15.82 9.88994 14.13 8.18994 12.03 8.18994"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_499_1276">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Редактировать
        </motion.li>
        <motion.li
          onClick={(e) => handleChoice(e, "delete")}
          whileHover={{ backgroundColor: "#A8BBFF", scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.34"
              d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.8499 9.14014L18.1999 19.2101C18.0899 20.7801 17.9999 22.0001 15.2099 22.0001H8.7899C5.9999 22.0001 5.9099 20.7801 5.7999 19.2101L5.1499 9.14014"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.34"
              d="M10.3301 16.5H13.6601"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.34"
              d="M9.5 12.5H14.5"
              stroke="#D8E9FE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Удалить
        </motion.li>
      </ul>
    </div>
  );
};

export default ContextMenu;
