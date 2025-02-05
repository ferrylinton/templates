export const getRandomNumber = (min: number = 10000000, max: number = 100000000) => {
	return Math.floor(Math.random() * (max - min) + min);
};
