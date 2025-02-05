import childProcess from 'child_process';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isProduction = process.env.NODE_ENV === 'production';

(async () => {
	try {
		await remove('./dist/server.cjs');
		await remove('./dist/server.cjs.map');
		await exec('npm run lint', './');
		await copy('./src/favicon.ico', './dist/favicon.ico');
		await copy('./.env', './dist/.env');
		await copy('./ecosystem.config.cjs', './dist/ecosystem.config.cjs');
		await copy('./package.json', './dist/package.json');
		await exec('npm pkg delete devDependencies', './dist');
		await exec('npm pkg delete lint-staged', './dist');
		await exec('npm pkg delete simple-git-hooks', './dist');
		await exec('npm pkg set type="commonjs"', './dist');

		webpack(
			{
				entry: './src/server.ts',

				target: 'node',

				output: {
					path: path.resolve(__dirname, 'dist'),
					filename: 'server.cjs',
				},

				resolve: {
					alias: {
						'@': path.resolve(__dirname, 'src'),
					},

					extensions: ['.ts', '.js'],
				},

				module: {
					rules: [
						{
							test: /\.ts?$/,
							loader: 'esbuild-loader',
							exclude: [path.resolve(__dirname, 'node_modules')],
						},
					],
				},

				externals: [nodeExternals()],

				mode: isProduction ? 'production' : 'development',

				devtool: isProduction ? 'source-map' : 'inline-source-map',

				plugins: [
					new webpack.DefinePlugin({
						'process.envc': {
							NODE_ENV: JSON.stringify(process.env.NODE_ENV),
						},
					}),
				],
			},
			(err, stats) => {
				if (err) {
					if (err) {
						console.error(err);
					}
					return;
				}

				const info = stats?.toJson();

				if (stats?.hasErrors()) {
					console.error(info?.errors);
				}

				if (stats?.hasWarnings()) {
					console.warn(info?.warnings);
				}
			}
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();

function copy(src: string, dest: string): Promise<void> {
	return new Promise((res, rej) => {
		return fs.copy(src, dest, err => {
			return !!err ? rej(err) : res();
		});
	});
}

function exec(cmd: string, loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
			if (!!stdout) {
				console.log(stdout);
			}
			if (!!stderr) {
				console.log(stderr);
			}
			return !!err ? rej(err) : res();
		});
	});
}

function remove(loc: string): Promise<void> {
	return new Promise((res, rej) => {
		return fs.remove(loc, err => {
			return !!err ? rej(err) : res();
		});
	});
}
