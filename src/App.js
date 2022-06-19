import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge-mock';
import { View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
	ConfigProvider,
	SplitLayout,
	SplitCol,
	Snackbar } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import Home from './panels/Home';
import Intro from './panels/Intro';
import Field from "./panels/Field";

const ROUTE = {
	HOME: 'home',
	INTRO: 'intro',
	FIELD: 'field'
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

const STORAGE_KEYS = {
	STATUS: 'status',

}

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState(ROUTE.HOME);
	const [snackbar, setSnackbar] = useState(false)
	const [cards, setCards ] = useState([{place: 'Палата в больнице', icon: 'Icon28LikeOutline'},
		{place: 'Комната художника', icon: 'Icon28BrushOutline'},
		{place: 'А корпус ДВФУ', icon: 'Icon28BuildingOutline'},
		{place: 'Главный офис ВК', icon: 'Icon28LogoVkOutline'},
		{place: 'Балкон в театре', icon: 'Icon28MasksOutline'},
		{place: 'Лучший вуз (ДВФУ)', icon: 'Icon28DiamondOutline'},
		{place: 'Караоке-бар', icon: 'Icon28MusicMicOutline'},
		{place: 'Борт самолета', icon: 'Icon28PlaneOutline'},
		{place: 'Спортивная площадка', icon: 'Icon28BasketballBallOutline'},
		{place: 'VK-фест', icon: 'Icon28FireOutline'},
	])

	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [userSeenIntro, setUserSeenIntro] = useState(false)
	const [number_p, setNumber_p] = useState(null)
	const [gamers, setGamers] = useState([])
	const [randomPlace, setRandomPlace] = useState()

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const storageDate = await bridge.send('VKWebAppStorageGet', {
				keys: Object.values(STORAGE_KEYS)
			});
			setUser(user);
			const data = {}
			storageDate.keys.forEach(({key, value}) => {
				try {
					data[key] = value? JSON.parse(value): {}
					switch (key) {
						case STORAGE_KEYS.STATUS:
							if (data[key].hasSeenIntro) {
								setActivePanel(ROUTE.HOME)
								setUserSeenIntro(true)
							}
							break
						default:
							break
					}
				} catch (e) {
					setSnackbar(<Snackbar layout={'vertical'}
										  onClose={() => setSnackbar(null)}
										  duration={1000}
										  >
						Произошла проблема с загрузкой данных
					</Snackbar>)
				}
			} )
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	// const viewIntro = async function() {
	// 	try {
	// 		await bridge.send('VKWebAppStorageSet', {
	// 			key: STORAGE_KEYS.STATUS,
	// 			data: JSON.stringify({hasSeenIntro: true})
	// 		})
	// 	}
	// 	catch (error) {
	// 		setSnackbar(<Snackbar layout={'vertical'}
	// 							  onClose={() => setSnackbar(null)}
	// 							  duration={1000}
	// 		>
	// 			Произошла проблема с отправкой данных
	// 		</Snackbar>)
	// 	}
	// }


	const number = (number) => {
		setActivePanel(ROUTE.FIELD)
		setNumber_p(number)

		const spy = getRandomInt(number)
		let gam = []
		for (let i =0; i < number; i++) {
			if (i === spy){
				gam.push('spy')
			}
			else gam.push(i)
		}
		setGamers(gam)

	}



	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id={ROUTE.HOME} go={go} msnackBarError={snackbar} cards={cards} />
								<Intro id={ROUTE.INTRO}  number={number} go={go} snackBarError={snackbar} />
								<Field  id={ROUTE.FIELD} number={number} gamers={gamers}/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
