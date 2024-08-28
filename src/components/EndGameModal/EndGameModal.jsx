import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addLeader } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, cards, achievements }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  const [username, setUsername] = useState("");

  const handleUserNameChange = e => {
    setUsername(e.target.value);
  };

  const PostNewLeader = async () => {
    const leader = {
      name: username,
      time: gameDurationMinutes * 60 + gameDurationSeconds,
      achievements,
    };

    try {
      await addLeader(leader);
      onClick();
    } catch (error) {
      console.error("ошибка при добавлении лидера: ", error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />
      <Link to="/">
        <span className={styles.link}>X</span>
      </Link>
      {cards.length === 6 && isWon ? (
        <>
          <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
          <input
            value={username}
            onChange={handleUserNameChange}
            placeholder="Пользователь"
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
