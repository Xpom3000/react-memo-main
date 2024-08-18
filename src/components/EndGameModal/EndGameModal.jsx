import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { addLeader, getLeaderboard } from "../../api";
import { ModeContext } from "../../context/ModeContext";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, achievements }) {
  const { level } = useContext(ModeContext);
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;
  const [username, setUsername] = useState("Пользователь");
  const [newLeader, setNewLeader] = useState(false);

  useEffect(() => {
    if (level === 9 && isWon) {
      // если игрок выиграл 3 уровень сложности, получаем список лидеров
      getLeaderboard().then(({ leaders }) => {
        leaders = leaders.sort(function (a, b) {
          return a.time - b.time;
        });
        if (leaders.length < 10 || gameTime < leaders[9].time) {
          setNewLeader(true);
        }
      });
    }
  }, []);

  const handleUserNameChange = e => {
    setUsername(e.target.value);
  };

  const PostNewLeader = async () => {
    const leader = {
      name: username,
      time: gameTime,
      achievements,
    };

    try {
      await addLeader(leader);
      onClick();
    } catch (error) {
      console.error("ошибка при добавлении лидера: ", error.message);
    }
  };

  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      {newLeader ? (
        <>
          <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
          <input
            value={username}
            onChange={handleUserNameChange}
            placeholder={"Введите ваше имя"}
            className={styles.inputLeaderName}
            type="text"
          />
          <p className={styles.description}>Затраченное время:</p>

          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>

          <Button
            onClick={() => {
              onClick();
              PostNewLeader();
            }}
          >
            Начать сначала
          </Button>

          <Link className={styles.leaderboard} to="/leaderboard" onClick={PostNewLeader}>
            Перейти к лидерборду
          </Link>
        </>
      ) : (
        <>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>Затраченное время:</p>

          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>

          <Button onClick={onClick}>Начать сначала</Button>
        </>
      )}
    </div>
  );
}
