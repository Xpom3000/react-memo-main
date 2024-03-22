import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import Checkbox from "../../components/Checkbox/Checkbox"

export function SelectLevelPage() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        {/* 1. Требуется создать контекст который будет передавать данные режима */}
        {/* 2. Отобразить количество попыток в компоненте cards, там же будет количество попыток */}
        {/* 3. Нужно в компоненте cards, внутри функции openCards, создать условие, есливключен лёгкий режим */}
        {/* 4. Если равно 2 карточки без пары, а попытки еще остались, нужно перевернуть открытые карточки без пары и вычесть попытки */}
        <Checkbox  id={"modeCheckbox"} name={"modeCheckbox"} label={"Эвключить лёгкий режим"} onClick={() => { }} />
      </div>
    </div>
  );
}
