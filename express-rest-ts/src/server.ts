import app from '@/app';
import { PORT } from '@/config/constant';

const callback = () => {
	console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
};

const main = async () => {
	try {
		app.listen(parseInt(PORT), callback);
	} catch (error) {
		console.error(error);
		process.exit();
	}
};

main();
