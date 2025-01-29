import { Message } from '@/types/message-type';
import { useEffect, useState } from 'react';
import { axiosInstance } from './util/axios';

export default function App() {
	const [message, setMessage] = useState<string | undefined>();

	useEffect(() => {
		axiosInstance.get<Message>(`/api/messages`).then(response => {
			setMessage(response.data.message);
		});
	}, []);

	return (
		<div className="h-screen w-full flex flex-col gap-2 justify-center items-center">
			<div className="font-bold uppercase">Express + React + Typescript</div>
			{message && <div className="font-bold text-2xl">{message}</div>}
		</div>
	);
}
