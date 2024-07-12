import React, { useEffect, useState } from 'react';
import TeamWork from 'screens/TeamWork/TeamWork';
import styles from './BigDashboard.module.css';
import { TopStatistics } from './TopStatistics';
import ProjectsColumn from './ProjectsColumn';
import ActivitiesColumn from './ActivitiesColumn';
import moment from 'moment';
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';

const BigDashboard = ({ selectedProject, setSelectedProject, timer }) => {
	useEffect(() => {
		getTeamWorkData();
		setInterval(async () => getTeamWorkData(), 120000);
	}, []);

	const [totalTickets, setTotalTickets] = useState(0);
	const [completedTask, setCompletedTask] = useState(0);

	const localStorageData = localStorage.getItem('redwing_data');

	const [allusers, setAllUsers] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);

	const [data, setData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);
	const [projectData, setProjectData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData).projects : []
	);

	const scrollTop=()=>{
		window.scrollTo({top:0,behaviour:'smooth'})
	}

	useEffect(() => {
		if (allusers.users) {
			const teamMembers = allusers.users.filter(user => user.user_id !== 33629907);
			const totalTasks = teamMembers.reduce((acc, user) => {
				return acc + user.tasks_count;
			}, 0);
			if(totalTasks !== totalTickets){
				setTotalTickets(totalTasks);
				setTopStatisticsCount(prev => {
					return {
						...prev,
						teamLoad: totalTasks
					};
				});
			}
		}
	}, [allusers]);

	useEffect(() => {
		if(allusers.users) {
			const teamMembers = allusers.users.filter(user => user.user_id !== 33629907);
			const totalCompleteTask  = teamMembers.reduce((acc,user) => {
				return acc + user.completed_todo;
			},0);
			if(totalCompleteTask !== completedTask){
				setCompletedTask(totalCompleteTask);
				setTopStatisticsCount(prev => {
					return {
						...prev,
						taskCompleted: completedTask
					}
				});
			}
		}
	},[allusers]);

	const getTeamWorkData = () => {
		// setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_URL}/pages/team_work.php`, {
				headers: {
					// Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(res => {
				// console.log(res.data);
				localStorage.setItem('redwing_data', JSON.stringify(res.data));
				setData(res.data);
				setAllUsers(res.data);
				setProjectData(res.data.projects);
				// setLoading(false);
			})
			.catch(error => {
				console.error(error);
				// setLoading(false);
			});
	};

	useEffect(()=>{
		setTopStatisticsCount(()=>{
			return {
				...topStatisticsCount,
				tasksToday: data.tickets_created_today
			};
		});
	},[data]);

	const [topStatisticsCount, setTopStatisticsCount] = useState({
		hoursOfWeek: 0,
		completion: 0,
		worthOrders: '$0',
		tasksToday: data.tickets_created_today,
		teamLoad: totalTickets,
		taskCompleted: completedTask
	});
	useEffect(() => {
		// console.log(timer);
		setTopStatisticsCount(prev => {
			return {
				...prev,
				hoursOfWeek: timer.day,
				completion: moment().add(timer.day, 'hours').format('hh:mm')
			};
		});
	}, [timer]);
	return (
		<div className={styles.bigdashboard}>
			<Helmet>
				<meta name="apple-mobile-web-app-capable" content="yes" />
			</Helmet>
			<div className={styles.activity}>
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Hours of work'} count={topStatisticsCount.hoursOfWeek} />
						<TopStatistics text={'Completion'} count={topStatisticsCount.completion} />
					</div>
				</div>
				<div className={styles.alignActivitiesContent}>
					<ActivitiesColumn
						setTopStatisticsCount={setTopStatisticsCount}
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
					/>
				</div>
			</div>
			<div className={styles.project}>
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Worth Orders'} count={topStatisticsCount.worthOrders} />
					</div>
				</div>
				<div className={styles.alignProjectsContent}>
					<ProjectsColumn setTopStatisticsCount={setTopStatisticsCount} />
				</div>
			</div>
			<div className={styles.teamWork}>
				<div className={styles.outertopStatisticsBar}>
					<div className={styles.topStatisticsBar}>
						<TopStatistics text={'Tasks Today'} count={topStatisticsCount.tasksToday} />
						<TopStatistics text={'Team Load'} count={totalTickets} />
						<TopStatistics text={'Completions'} count={completedTask} />
					</div>
				</div>
				<div className={styles.alignTeamContent}>
					<TeamWork
						isInverted={false}
						screenIndex={2}
						showTeamTabTop={false}
						showTabComponent={false}
						showActionButtons={false}
					/>
				</div>
			</div>
			<div className="big-dashboard-footer" style={{margin:"1rem"}}>
				<Link to='/homepage'onClick={scrollTop}>Go to Homepage</Link>
			</div>
		</div>
	);
};

export default BigDashboard;
