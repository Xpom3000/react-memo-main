const hostUrl = "https://wedev-api.sky.pro/api/v2/leaderboard";

export async function getLeaderboard() {
  const response = await fetch(hostUrl);
  if (response.ok) {
    const data = await response.json();
    return data.leaders;
  } else {
    throw new Error(`Ошибка загрузки данных: ${response.status} ${response.statusText}`);
  }
}

export async function addLeader(leader) {
  const response = await fetch(hostUrl, {
    method: "POST",
    body: JSON.stringify({
      name: leader.name || "Пользователь",
      time: leader.time,
      achievements: leader.achievements,
    }),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Ошибка добавления лидера: ${response.status} ${response.statusText}`);
  }
}
