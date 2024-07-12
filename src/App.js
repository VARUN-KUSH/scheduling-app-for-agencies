import React, { useState, useRef, useEffect, useCallback } from 'react';
import GlobalStyle from 'globalStyles';
import useData from 'hooks/use-data';
import { AllDataContext } from 'context/AllDataContext';
import { DraggingContext } from 'context/isDragging';
// screens
import Kanban from 'screens/Kanban/Kanban';
import RapidEstimation from 'screens/RapidEstimation/RapidEstimation';
import Needs from 'screens/Drive/Drive';
import Home from 'screens/Home/Home';
import NewHome from 'screens/Home/NewHome';
// routing
import { Switch, Route, useLocation } from 'react-router-dom';
import TimeBar from 'components/TimeBar/TimeBar';
import FocusMode from 'components/FocusMode/FocusMode';
import BasecampLoginCallback from 'components/Login/BasecampLoginCallback';
import TeamWork from 'screens/TeamWork/TeamWork';
import BigDashboard from 'screens/BigDashboard';
import Header from './components/Header/Header';

import OneSignal from 'react-onesignal';

const App = () => {
	const allScreenData = useData();
	const [globalState, setGlobalState] = useState(allScreenData);
	const firstTimeRef = useRef(true);

	const [selectedProject, setSelectedProject] = useState(null);

	useEffect(() => {
		OneSignal.init({
		  	appId: "7da97ba1-bdf1-4a39-86a1-2d16e97c85a3",
			allowLocalhostAsSecureOrigin: true,
		});
	}, []);

	const calculateTimerForGlobe = useCallback(
		activities => {
			let t = {
				day: 0,
				evening: 0
			};
			globalState?.projectOrder.forEach(projectID => {
				const project = globalState.tasks[projectID];
				project.activityList.forEach(a => {
					const activity = activities[a.id];
					if (a.isSelected) {
						if (project.isEveningTask) {
							t.evening += activity.time;
						} else if (activity.evening) {
							t.evening += activity.time;
						} else {
							t.day += activity.time;
						}
						//project.isEveningTask ? (t.evening += activity.time) : (t.day += activity.time);
					}
				});
			});

			globalState?.workList.forEach(a => {
				const work = globalState?.otherWorks[a.id];
				if (a.isSelected) {
					t.day += work.time;
				}
			});

			return t;
		},
		[globalState?.projectOrder, globalState?.tasks, globalState]
	);

	const calculateTimerForIndividualProjects = project => {
		if (!project) return 0;
		let t = 0;
		project.activityList.forEach(a => {
			const activity = globalState.activities[a.id];
			if (a.isSelected) {
				t += activity.time;
			}
		});
		return t;
	};

	const updateCompleteStatus = globalTask => {
		const tasks = {};
		Object.values(globalTask).forEach(project => {
			const timing = calculateTimerForIndividualProjects(project);
			tasks[project.id] = {
				...project,
				activityList: [...project.activityList],
				isCompleted: timing === 0
			};
		});
		setGlobalState(old => {
			const newData = { ...old, tasks };
			localStorage.setItem('data', JSON.stringify(newData));
			return newData;
		});
		firstTimeRef.current = true;
	};

	useEffect(() => {
		if (globalState && globalState.tasks && firstTimeRef.current) {
			updateCompleteStatus(globalState.tasks);
			firstTimeRef.current = false;
		}

		// eslint-disable-next-line
	}, [globalState?.tasks]);

	const [timer, setTimer] = useState(() => calculateTimerForGlobe(globalState?.activities));
	const [isDragging, setIsDragging] = useState(false);
	const [isInverted, setIsInverted] = useState(false);
	const [open, setOpen] = useState(false);

	// const previousXPosition = useRef(null);
	const location = useLocation();

	var screenName = 'Activities';
	if (location.state) {
		screenName = location.state.tab;
	}

	useEffect(() => {
		setTimer(t => (t = calculateTimerForGlobe(globalState?.activities)));
	}, [calculateTimerForGlobe, globalState?.activities, globalState]);

	const SHOW_TIMER = (window.location.pathname !== '/' && window.location.pathname !== '/homepage');

	return (
		<AllDataContext.Provider value={{ globalState, setGlobalState }}>
			<DraggingContext.Provider value={{ isDragging, setIsDragging }}>
				<GlobalStyle />

				{SHOW_TIMER && <TimeBar timer={timer} />}

            {
				window.location.pathname !== '/' ?
				<Header setOpenFocusMode={setOpen} selectedProject={selectedProject} /> :
				null

			}

				<Switch location={location} key={location.pathname}>
					<Route exact path='/kanban'>
						<Kanban
							screenIndex={0}
							setIsDragging={setIsDragging}
							isInverted={isInverted}
							setOpenFocusMode={setOpen}
						/>
					</Route>
					<Route exact path='/rapid-estimation'>
						<RapidEstimation
							screenIndex={1}
							setOpenFocusMode={setOpen}
							isInverted={isInverted}
							setSelectedProject={setSelectedProject}
							selectedProject={selectedProject}
							tabValues={screenName}
						/>
					</Route>

					<Route exact path='/team-work'>
						<TeamWork screenIndex={2} isInverted={isInverted} />
					</Route>
					<Route exact path='/drive'>
						<Needs screenIndex={2} isInverted={isInverted} />
					</Route>
					<Route exact path='/auth/callback'>
						<BasecampLoginCallback />
					</Route>
					<Route exact path='/homepage'>
						<NewHome />
					</Route>
					<Route exact path='/newhome'>
						<Home />
					</Route>
					<Route exact path='/'>
						<BigDashboard
							setSelectedProject={setSelectedProject}
							selectedProject={selectedProject}
							timer={timer}
						/>
					</Route>
				</Switch>
				<FocusMode open={open} setOpen={setOpen} />
			</DraggingContext.Provider>
		</AllDataContext.Provider>
	);
};

export default App;
