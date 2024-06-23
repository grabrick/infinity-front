import m from "./Header.module.scss";

const Header = () => {
  return (
    <div className={m.header}>
      <div className={m.searchWrapper}>
        <input className={m.search} placeholder="Поиск..." />
      </div>

      <div className={m.buttons}>
        <div className={m.buttonWrapper}>
          <button className={m.button}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M12.0605 16.5V11.5"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5 14H9.5"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <path
                d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            Создать папку
          </button>
        </div>
        <div className={m.buttonWrapper}>
          <button className={m.button}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M13.8095 15.7304L10.2695 12.1904"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.7705 12.2305L10.2305 15.7705"
                  stroke="#D8E9FE"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <path
                d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
                stroke="#D8E9FE"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            Удалить папку
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
