const getRandomNumber = max => (Math.floor(Math.random() * Math.floor(max)));

const getNextRoundRobin = (total, current) => ((current > total - 2) ? 0 : current + 1);

export { getNextRoundRobin, getRandomNumber };
