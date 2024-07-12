//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

//import '../../../node_modules/bootstrap/dist/css/bootstrap-grid.css'
import React, { useContext, useState, useEffect, useCallback } from 'react';
import './NewHome.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { AllDataContext } from 'context/AllDataContext';
import { withThemeCreator } from '@material-ui/styles';
import { formControlClasses } from '@mui/material';
import useData from 'hooks/use-data';
import moment from 'moment';
import axios from 'axios';
import OpIcon from '../../assets/icons/operations.svg';
import TeamIcon from '../../assets/icons/teamwork.svg';
import DriveIcon from '../../assets/icons/drive.svg';

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import TabComponent from 'components/TabComponent/TabComponent';
import { categoriesForOtherWorks } from 'initial-data';
const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

export default function NewHome() {
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks, projectOrder, activityOrder, workOrder, workList, otherWorks, activities } =
		globalState;

	//const [activities, setActivities] = useState([]);

	const [red, setRed] = useState(0);
	const [yellow, setYellow] = useState(0);
	const [green, setGreen] = useState(0);
	const [white, setWhite] = useState(0);
	const allScreenData = useData();
	const localStorageData = localStorage.getItem('redwing_data');
	const [data, setData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData) : {}
	);
	const [projectData, setProjectData] = useState(
		localStorage.getItem('redwing_data') ? JSON.parse(localStorageData).projects : []
	);
	const [totalTickets, setTotalTickets] = useState(0);
	const [membersWithZeroTask, setMembersWithZeroTask] = useState(0);
	const [absentMembers, setAbsentMembers] = useState(0);

	var arrelement = [...activityOrder];
	for (let i = 0; i < activityOrder.length; i++) {
		arrelement[i] = 0;
	}

	var worksArrelement = [...categoriesForOtherWorks];
	for (let i = 0; i < categoriesForOtherWorks.length; i++) {
		worksArrelement[i] = 0;
	}

	const [activityListTime, setActivityListTime] = useState(arrelement);
	const [workListTime, setWorkListTime] = useState(worksArrelement);

	const getOperationsData = () => {
		{
			const newArr = [...activityListTime];
			projectOrder.map(projectID => {
				var activityList = tasks[projectID].activityList;
				var length2 = activityList.length;

				for (var activity = 0; activity < length2; activity++) {
					for (let i = 0; i < activityOrder.length; i++) {
						const element = activityOrder[i];

						if (activityList[activity].id === element && activityList[activity].isSelected) {
							newArr[i] = newArr[i] + activities[element].time;

							// console.log(newArr);
						}
					}
				}
			});
			setActivityListTime(newArr);
		}

		{
			const workArr = [...workListTime];
			workList.map(({ id, isSelected }) => {
				const w = otherWorks[id];
				let idx = -1;
				categoriesForOtherWorks.forEach((c, i) => {
					if (c.id === w.category.id) idx = i;
				});

				if (isSelected) {
					workArr[idx] += w.time;
				}
			});
			setWorkListTime(workArr);
		}
	};

	//teamwork
	const getTeamWorkData = () => {
		// setLoading(true);
		axios
			.get(`${process.env.REACT_APP_API_URL}/pages/team_work.php`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Access-Control-Allow-Origin': '*'
				}
			})
			.then(res => {
				// console.log(res.data);
				setData(res.data);
				setProjectData(res.data.projects);
				localStorage.setItem('redwing_data', JSON.stringify(res.data));
				// setLoading(false);
			})
			.catch(error => {
				console.error(error);
				// setLoading(false);
			});
	};
	useEffect(() => {
		getOperationsData();
		if (token && token !== 'undefined' && new Date(token_expiry_date) > new Date()) {
			getTeamWorkData();

			// console.log('hii');
		}
	}, []);

	useEffect(() => {
		if (data !== {} && data.users) {
			// remove user with id = 0
			const users = data.users.filter(user => user.user_id !== 33629907);
			const totalTasks = users.reduce((acc, user) => {
				return acc + user.tasks_count;
			}, 0);
			setTotalTickets(totalTasks);

			const memWithZeroTask = data.users.reduce((acc, user) => {
				if (user.tasks_count === 0) {
					acc++;
				}
				return acc;
			}, 0);
			setMembersWithZeroTask(memWithZeroTask);

			const absentMembers = data.users.reduce((acc, user) => {
				if (user.active_todo_count === 0) {
					acc++;
				}
				return acc;
			}, 0);
			setAbsentMembers(absentMembers);
		}
	}, [data]);
	// console.log(data)
	// console.log(data.tickets_created_today)
	// console.log(data.average)

	const token = localStorage.getItem('red_wing_token');
	const token_expiry_date = localStorage.getItem('red_wing_token_expiry_date');

	const [globalTime, setGlobalTIme] = useState(allScreenData);

	// console.log(token)
	const calculateTimerForGlobe = useCallback(
		activities => {
			let t = {
				day: 0,
				evening: 0
			};
			globalTime?.projectOrder.forEach(projectID => {
				const project = globalTime.tasks[projectID];
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
		[globalTime.projectOrder, globalTime.tasks]
	);

	const [timer, setTimer] = useState(() => calculateTimerForGlobe(globalTime.activities));

	useEffect(() => {
		setTimer(t => (t = calculateTimerForGlobe(globalTime.activities)));
		// console.log(timer);
	}, [calculateTimerForGlobe, globalTime.activities, globalState]);

	useEffect(() => {
		var len = projectOrder.length;
		var x = 1;
		var r = 0,
			w = 0,
			g = 0,
			y = 0;
		while (x <= len) {
			if (tasks['project-' + x].needsColor === 'Red') {
				// console.log("red");
				r++;
			} else if (tasks['project-' + x].needsColor === 'Yellow') {
				// console.log("yellow");

				y++;
			} else if (tasks['project-' + x].needsColor === 'green') {
				// console.log("green");

				g++;
			} else if (tasks['project-' + x].needsColor === 'white') {
				// console.log("white");

				w++;
			}
			x++;
		}
		// console.log(r + " " + g + " " + y + " " + w);
		setRed(r);
		setYellow(y);
		setGreen(g);
		setWhite(w);
	}, []);

	const hasActivities =
		activityListTime.filter(a => a !== 0).length + workListTime.filter(a => a !== 0).length > 0;

	return (
		<div className='homebody'>
			{/*operation section*/}
			<div className='smallcontainer'>
				<Link
					to={{ pathname: '/rapid-estimation', state: { tab: 'Projects' } }}
					style={{ display: 'contents' }}
				>
					<div className='smalldivs'>
						{/* <svg width="22" height="22" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6152 8.43825C16.8741 9.14051 17.1486 10.1684 17.1479 11.4253C17.1472 12.1602 17.0529 13.3065 16.5436 14.5912C16.2414 15.353 15.5966 16.6589 14.2807 17.8315C13.8877 18.1819 12.5598 19.3006 10.5403 19.7744C9.7288 19.9645 9.02513 20 8.57398 20C8.36756 20 7.40851 19.9922 6.34164 19.7077C3.87238 19.0495 2.30471 17.3009 2.11177 17.0803C1.9394 16.8831 0.00711829 14.6082 2.47536e-05 11.4253C-0.00281266 10.2932 0.239077 9.37673 0.315687 9.1015C0.605812 8.06655 1.04136 7.26711 1.39816 6.72304C1.61451 6.39744 2.0607 6.30736 2.38629 6.52371C2.71188 6.73935 2.80197 7.18554 2.58562 7.51184C2.2735 7.98356 1.87485 8.70781 1.63296 9.66118C1.46058 10.3443 1.41731 10.9494 1.41944 11.4175C1.43363 13.9826 3.02258 15.9304 3.09848 16.0205C5.20242 18.5245 8.22639 18.5799 8.57327 18.5806C11.1844 18.5841 12.9117 17.1406 13.2976 16.8008C15.6767 14.7089 15.7299 11.8382 15.7306 11.4402C15.7363 8.42478 13.826 6.54854 13.4976 6.23713C13.3742 6.12009 11.3674 4.26867 8.55766 4.26655C7.48441 4.26584 6.60907 4.53539 6.41825 4.59569C5.49397 4.89007 4.80944 5.31852 4.37744 5.63773C4.05965 5.86685 3.61063 5.79378 3.38222 5.4767C3.1531 5.15962 3.22616 4.7106 3.54324 4.48148C4.01142 4.14454 4.69594 3.72247 5.5876 3.3912C6.8765 2.9131 7.98663 2.8521 8.57398 2.85139C10.3091 2.85068 11.6682 3.38056 12.4669 3.78348C13.6693 4.38927 14.4354 5.1277 14.7461 5.44762C15.1092 5.82216 16.0243 6.8337 16.6152 8.43825ZM7.19726 1.4258C6.80357 1.4258 6.48436 1.10659 6.48436 0.7129C6.48436 0.319209 6.80357 0 7.19726 0H9.95097C10.3447 0 10.6632 0.319209 10.6632 0.7129C10.6632 1.10659 10.3447 1.4258 9.95097 1.4258H7.19726ZM8.57369 7.10509C8.96597 7.10509 9.28305 7.42288 9.28305 7.81445V10.7164H12.1779C12.5695 10.7164 12.8873 11.0342 12.8873 11.4258C12.8873 11.8173 12.5695 12.1351 12.1779 12.1351H8.57369C8.18213 12.1351 7.86434 11.8173 7.86434 11.4258V7.81445C7.86434 7.42288 8.18213 7.10509 8.57369 7.10509Z" fill="white" />
                            <path d="M16.6152 8.43825C16.8741 9.14051 17.1486 10.1684 17.1479 11.4253C17.1472 12.1602 17.0529 13.3065 16.5436 14.5912C16.2414 15.353 15.5966 16.6589 14.2807 17.8315C13.8877 18.1819 12.5598 19.3006 10.5403 19.7744C9.7288 19.9645 9.02513 20 8.57398 20C8.36756 20 7.40851 19.9922 6.34164 19.7077C3.87238 19.0495 2.30471 17.3009 2.11177 17.0803C1.9394 16.8831 0.00711829 14.6082 2.47536e-05 11.4253C-0.00281266 10.2932 0.239077 9.37673 0.315687 9.1015C0.605812 8.06655 1.04136 7.26711 1.39816 6.72304C1.61451 6.39744 2.0607 6.30736 2.38629 6.52371C2.71188 6.73935 2.80197 7.18554 2.58562 7.51184C2.2735 7.98356 1.87485 8.70781 1.63296 9.66118C1.46058 10.3443 1.41731 10.9494 1.41944 11.4175C1.43363 13.9826 3.02258 15.9304 3.09848 16.0205C5.20242 18.5245 8.22639 18.5799 8.57327 18.5806C11.1844 18.5841 12.9117 17.1406 13.2976 16.8008C15.6767 14.7089 15.7299 11.8382 15.7306 11.4402C15.7363 8.42478 13.826 6.54854 13.4976 6.23713C13.3742 6.12009 11.3674 4.26867 8.55766 4.26655C7.48441 4.26584 6.60907 4.53539 6.41825 4.59569C5.49397 4.89007 4.80944 5.31852 4.37744 5.63773C4.05965 5.86685 3.61063 5.79378 3.38222 5.4767C3.1531 5.15962 3.22616 4.7106 3.54324 4.48148C4.01142 4.14454 4.69594 3.72247 5.5876 3.3912C6.8765 2.9131 7.98663 2.8521 8.57398 2.85139C10.3091 2.85068 11.6682 3.38056 12.4669 3.78348C13.6693 4.38927 14.4354 5.1277 14.7461 5.44762C15.1092 5.82216 16.0243 6.8337 16.6152 8.43825ZM7.19726 1.4258C6.80357 1.4258 6.48436 1.10659 6.48436 0.7129C6.48436 0.319209 6.80357 0 7.19726 0H9.95097C10.3447 0 10.6632 0.319209 10.6632 0.7129C10.6632 1.10659 10.3447 1.4258 9.95097 1.4258H7.19726ZM8.57369 7.10509C8.96597 7.10509 9.28305 7.42288 9.28305 7.81445V10.7164H12.1779C12.5695 10.7164 12.8873 11.0342 12.8873 11.4258C12.8873 11.8173 12.5695 12.1351 12.1779 12.1351H8.57369C8.18213 12.1351 7.86434 11.8173 7.86434 11.4258V7.81445C7.86434 7.42288 8.18213 7.10509 8.57369 7.10509Z" stroke="white" />
                        </svg> */}
						<img src={OpIcon} al='/' />
					</div>
				</Link>
				<div style={{ marginLeft: '10px', marginRight: '18px' }}>
					<p className='smalltextdivs'>Operations</p>
				</div>
				<div style={{ width: '-webkit-fill-available' }}>
					<hr className='dottedline' />
				</div>
			</div>

			<div
				className='operationdiv container-fluid'
				style={{ marginTop: `${!hasActivities ? '0px' : '22px'}` }}
			>
				<div className='row'>
					{activityOrder.map((activity, index) => {
						var activitydetails = activities[activity];
						var colors = ['#FE5826', '#FE5826', '#9D3EBE', '#5FB924'];
						var randomColor = colors[Math.floor(Math.random() * colors.length)]; //pluck a random color
						if (activityListTime[index] != 0) {
							return (
								<Link
									to={{ pathname: '/rapid-estimation', state: { tab: 'Activities' } }}
									style={{ display: 'contents' }}
								>
									<div className='op-div-container col-md-2 col-4'>
										<div className='operationdiv1' style={{ backgroundColor: randomColor }}>
											<div className='operationdiv1text1'>{activityListTime[index]}</div>
											<div className='operationdiv1text2'>
												<p> {activitydetails.content}</p>
											</div>
										</div>
									</div>
								</Link>
							);
						}
					})}
					{workListTime.map((time, index) => {
						var workDetails = categoriesForOtherWorks[index];
						var colors = ['#FE5826', '#FE5826', '#9D3EBE', '#5FB924'];
						var randomColor = colors[Math.floor(Math.random() * colors.length)]; //pluck a random color
						if (workListTime[index] != 0) {
							return (
								<Link
									to={{ pathname: '/rapid-estimation', state: { tab: 'Activities' } }}
									style={{ display: 'contents' }}
								>
									<div className='op-div-container col-md-2 col-4'>
										<div className='operationdiv1' style={{ backgroundColor: randomColor }}>
											<div className='operationdiv1text1'>{workListTime[index]}</div>
											<div className='operationdiv1text2'>
												<p> {workDetails.text}</p>
											</div>
										</div>
									</div>
								</Link>
							);
						}
					})}
				</div>
			</div>

			<div className='arrowText'>
				{timer.day ? (
					<p>
						→ <span> {timer.day}</span> Hours of work
					</p>
				) : (
					<p>
						→ <span>{timer.evening}</span> hours of evening work.
					</p>
				)}

				{timer.day ? (
					<p>
						→ completion by <span>{moment().add(timer.day, 'hours').format('hh:mm A')}</span>
					</p>
				) : (
					<p>→ Day completed.</p>
				)}
			</div>

			{/*team work section*/}

			<div className='smallcontainer'>
				<div className='smalldivs' style={{ backgroundColor: '#FB896B' }}>
					{/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0002 1C9.63001 1 8.50478 2.10773 8.47953 3.47442C7.80746 3.69993 7.17539 4.0123 6.5969 4.39654C6.54629 4.42898 6.50222 4.47157 6.46809 4.52104C6.43393 4.57052 6.40975 4.62683 6.39739 4.68566C6.38503 4.74449 6.38448 4.80578 6.3958 4.86482C6.40712 4.92385 6.4303 4.98058 6.46357 5.03065C6.49681 5.08073 6.54013 5.1241 6.59015 5.15743C6.64017 5.19076 6.69689 5.21403 6.75591 5.22544C6.81493 5.23685 6.8762 5.2364 6.93506 5.22408C6.9939 5.21179 7.05026 5.18769 7.09978 5.15362C7.57389 4.83872 8.08779 4.5786 8.63193 4.38343C8.98639 5.34803 9.91674 6.04036 11.0002 6.04036C12.0836 6.04036 13.0126 5.3477 13.3664 4.38322C13.9101 4.57716 14.4237 4.83775 14.8967 5.15483C14.946 5.18888 15.0023 5.21302 15.061 5.22539C15.1197 5.23775 15.1808 5.23834 15.2397 5.2272C15.2987 5.21598 15.3553 5.19294 15.4054 5.15985C15.4554 5.12676 15.4988 5.08365 15.5322 5.03382C15.5656 4.98399 15.589 4.92747 15.6006 4.86862C15.6122 4.80976 15.612 4.7486 15.5999 4.68982C15.5879 4.63104 15.5641 4.5747 15.5304 4.52509C15.4967 4.47549 15.453 4.43268 15.4027 4.39992C14.8242 4.01211 14.1913 3.69864 13.5186 3.47441C13.4933 2.10831 12.3702 1.00006 11.0001 1.00006L11.0002 1ZM11.0002 1.90897C11.8947 1.90897 12.6103 2.62409 12.6103 3.52138C12.6103 4.41589 11.8947 5.13143 11.0002 5.13143C10.1056 5.13143 9.38784 4.4153 9.38784 3.52138C9.38784 2.62469 10.1056 1.90897 11.0002 1.90897Z" fill="white" stroke="white" strokeWidth="0.5" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.76527 6.39345C4.69182 6.39526 4.61889 6.41517 4.55474 6.451C4.49061 6.48681 4.43536 6.53845 4.39532 6.60004C4.00829 7.17732 3.69734 7.80879 3.47224 8.47975C2.10655 8.50617 1 9.63099 1 11.0004C1 12.3687 2.10523 13.4906 3.46876 13.5188C3.69424 14.1929 4.00693 14.8272 4.39511 15.4073C4.42784 15.4576 4.47061 15.5013 4.52019 15.5351C4.56976 15.5688 4.62607 15.5926 4.68484 15.6047C4.74361 15.6167 4.80475 15.6169 4.86361 15.6047C4.92247 15.5931 4.97898 15.5698 5.02885 15.5364C5.07868 15.5031 5.12182 15.4597 5.15495 15.4097C5.18809 15.3597 5.21117 15.3031 5.22247 15.2442C5.23374 15.1853 5.23322 15.1241 5.2209 15.0654C5.20861 15.0067 5.18454 14.9505 5.15054 14.9011C4.83365 14.4275 4.5736 13.9132 4.37843 13.3677C5.34542 13.0152 6.0404 12.0849 6.0404 10.9997C6.0404 9.91553 5.34717 8.98465 4.38154 8.63072C4.57633 8.08751 4.83483 7.57597 5.15025 7.10552C5.19763 7.03697 5.22563 6.95519 5.23017 6.87199C5.23474 6.78879 5.21586 6.70442 5.17627 6.63111C5.13668 6.55779 5.07648 6.49573 5.00439 6.45392C4.93233 6.41211 4.84856 6.39068 4.76527 6.39271V6.39345ZM3.5213 9.38808C4.41525 9.38808 5.13143 10.1059 5.13143 11.0004C5.13143 11.8949 4.41584 12.6106 3.5213 12.6106C2.62404 12.6106 1.90897 11.8949 1.90897 11.0004C1.90897 10.1059 2.62463 9.38808 3.5213 9.38808H3.5213Z" fill="white" stroke="white" strokeWidth="0.5" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2231 6.39356C17.141 6.39379 17.059 6.41703 16.9888 6.45974C16.9186 6.50244 16.8603 6.56459 16.8222 6.63741C16.7841 6.71022 16.7663 6.79351 16.7713 6.87554C16.7763 6.95757 16.804 7.0381 16.8506 7.1058C17.1659 7.57797 17.4243 8.08934 17.6191 8.63191C16.6538 8.98602 15.9609 9.91675 15.9609 11.0007C15.9609 12.0854 16.6526 13.0172 17.6213 13.3696C17.4263 13.9142 17.1667 14.4282 16.8504 14.9027C16.8164 14.9522 16.7924 15.0084 16.7801 15.0672C16.7679 15.1259 16.7674 15.1871 16.7788 15.246C16.7901 15.305 16.8133 15.3616 16.8465 15.4116C16.8797 15.4616 16.923 15.5048 16.9729 15.5381C17.0228 15.5714 17.0794 15.5947 17.1383 15.6061C17.1972 15.6175 17.2584 15.6173 17.3172 15.6061C17.376 15.5941 17.4323 15.57 17.4818 15.5361C17.5313 15.5022 17.574 15.4584 17.6066 15.408C17.9939 14.827 18.3059 14.1931 18.5312 13.5201C19.8936 13.4915 20.9989 12.3693 20.9989 11.0007C20.9989 9.63102 19.8926 8.50607 18.5283 8.48C18.3032 7.80989 17.9926 7.17922 17.6064 6.601C17.5652 6.53741 17.5079 6.48439 17.4412 6.44833C17.3746 6.41227 17.2989 6.39326 17.2231 6.39356H17.2231ZM18.4799 9.38833C19.3739 9.38833 20.0901 10.1061 20.0901 11.0007C20.0901 11.8952 19.3745 12.6108 18.4799 12.6108C18.4229 12.6108 18.3709 12.6085 18.3271 12.6042C18.2859 12.5924 18.243 12.5867 18.2001 12.5869C17.4441 12.455 16.8698 11.7987 16.8698 11.0007C16.8698 10.1061 17.586 9.38833 18.4799 9.38833Z" fill="white" stroke="white" strokeWidth="0.5" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9998 15.9609C9.91361 15.9609 8.98057 16.6532 8.62973 17.6238C8.08624 17.4289 7.57337 17.1699 7.09978 16.8547C7.05028 16.8208 6.99401 16.7969 6.93527 16.7848C6.87654 16.7727 6.81539 16.7723 6.75651 16.7848C6.69762 16.7961 6.64108 16.8194 6.59115 16.8527C6.54125 16.8859 6.49802 16.9292 6.46477 16.9791C6.43155 17.029 6.40835 17.0856 6.39694 17.1445C6.38553 17.2034 6.38594 17.2645 6.39812 17.3232C6.4103 17.382 6.43425 17.4383 6.46814 17.4877C6.50202 17.5372 6.54581 17.5799 6.59617 17.6125C7.17546 17.998 7.80751 18.3096 8.47924 18.5348C8.50813 19.8966 9.63194 21.0001 10.9998 21.0001C12.3675 21.0001 13.4891 19.8963 13.5182 18.5353C14.1903 18.3112 14.8234 17.9985 15.4018 17.6121C15.4522 17.5794 15.496 17.5367 15.5299 17.4872C15.5638 17.4376 15.5877 17.3813 15.5998 17.3225C15.612 17.2637 15.6123 17.2025 15.6007 17.1436C15.5893 17.0847 15.5659 17.0281 15.5326 16.9782C15.4993 16.9282 15.4559 16.885 15.4059 16.8519C15.3559 16.8187 15.2992 16.7955 15.2403 16.7842C15.1813 16.7729 15.1201 16.7735 15.0614 16.7865C15.0026 16.7988 14.9464 16.8229 14.8969 16.857C14.4243 17.1726 13.911 17.4326 13.3683 17.6264C13.0162 16.6585 12.0856 15.9627 10.9998 15.9627L10.9998 15.9609ZM10.9998 16.8699C11.8943 16.8699 12.6099 17.5854 12.6099 18.48C12.6099 19.3745 11.8943 20.0901 10.9998 20.0901C10.1053 20.0901 9.38748 19.3739 9.38748 18.48C9.38748 18.4078 9.3926 18.3358 9.40248 18.2667L9.40509 18.2524C9.40598 18.2476 9.4068 18.2426 9.40753 18.2378C9.52252 17.4628 10.1867 16.8699 10.9998 16.8699V16.8699Z" fill="white" stroke="white" strokeWidth="0.5" />
                    </svg> */}

					<img src={TeamIcon} alt='/' />
				</div>
				<div style={{ marginLeft: '10px', marginRight: '18px' }}>
					<p className='smalltextdivs' style={{ whiteSpace: 'nowrap' }}>
						Team Work
					</p>
				</div>
				<div style={{ width: '-webkit-fill-available' }}>
					<hr className='dottedline' />
				</div>
			</div>

			<div style={{ marginTop: '14px' }} className='container-fluid'>
				<div className='row'>
					<Link to='/team-work' style={{ display: 'contents' }}>
						<div className='teamworkdiv1-parent col-md-6 col-8'>
							<div
								className='teamworkdiv1'
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between'
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<div className='teamworkdiv1text1'>{data.tickets_created_today}</div>
									<div>
										<svg
											width='33'
											height='51'
											viewBox='0 0 33 51'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M32.4314 37.2212C32.4614 37.1306 32.4797 37.0365 32.4859 36.9413C32.4875 36.9162 32.5002 36.8927 32.5002 36.8676V10.739C32.5002 10.4377 32.3805 10.1487 32.1675 9.93569C31.9544 9.72264 31.6655 9.60295 31.3642 9.60293H17.7319V7.12153C18.4899 6.85355 19.1287 6.32622 19.5355 5.63275C19.9424 4.93927 20.0909 4.12431 19.955 3.3319C19.819 2.53949 19.4073 1.82066 18.7926 1.30244C18.1779 0.784225 17.3998 0.5 16.5958 0.5C15.7918 0.5 15.0137 0.784225 14.399 1.30244C13.7843 1.82066 13.3726 2.53949 13.2367 3.3319C13.1007 4.12431 13.2493 4.93927 13.6561 5.63275C14.0629 6.32622 14.7018 6.85355 15.4598 7.12153V9.60293H1.82744C1.52615 9.60294 1.2372 9.72263 1.02416 9.93568C0.811113 10.1487 0.691419 10.4377 0.691406 10.739V49.364C0.691419 49.6653 0.811113 49.9542 1.02416 50.1672C1.2372 50.3803 1.52615 50.5 1.82744 50.5H18.8679C19.0151 50.4999 19.161 50.4712 19.2973 50.4154L19.3007 50.4138C19.4392 50.3568 19.5651 50.273 19.671 50.1672L32.1674 37.6708C32.2608 37.5742 32.3361 37.4615 32.3897 37.3382C32.3962 37.3242 32.4084 37.3133 32.4143 37.299C32.4246 37.274 32.423 37.2468 32.4314 37.2212ZM16.5958 2.78675C16.8205 2.78675 17.0401 2.85338 17.227 2.97821C17.4138 3.10304 17.5594 3.28047 17.6454 3.48805C17.7314 3.69564 17.7539 3.92406 17.71 4.14443C17.6662 4.3648 17.558 4.56722 17.3991 4.7261C17.2402 4.88497 17.0378 4.99317 16.8174 5.037C16.5971 5.08083 16.3687 5.05833 16.1611 4.97235C15.9535 4.88636 15.7761 4.74075 15.6512 4.55393C15.5264 4.36711 15.4598 4.14746 15.4598 3.92278C15.4602 3.6216 15.58 3.33288 15.793 3.11992C16.0059 2.90696 16.2946 2.78715 16.5958 2.78675V2.78675ZM2.96346 11.875H15.4598V14.147C15.4598 14.4483 15.5795 14.7373 15.7925 14.9503C16.0056 15.1634 16.2945 15.2831 16.5958 15.2831C16.8971 15.2831 17.1861 15.1634 17.3991 14.9503C17.6122 14.7373 17.7319 14.4483 17.7319 14.147V11.875H30.2282V35.7316H18.8679C18.5666 35.7316 18.2776 35.8513 18.0646 36.0644C17.8516 36.2774 17.7319 36.5664 17.7319 36.8676V48.2279H2.96346V11.875ZM20.0039 46.6215V38.0037H28.6218L20.0039 46.6215Z'
												fill='white'
											/>
											<path
												d='M7.50483 20.9635H25.6813C25.9819 20.9623 26.2697 20.8422 26.4819 20.6292C26.694 20.4163 26.8131 20.128 26.8131 19.8274C26.8131 19.5269 26.694 19.2386 26.4819 19.0256C26.2697 18.8127 25.9819 18.6925 25.6813 18.6914H7.50483C7.20428 18.6925 6.91641 18.8127 6.70428 19.0256C6.49215 19.2386 6.37305 19.5269 6.37305 19.8274C6.37305 20.128 6.49215 20.4163 6.70428 20.6292C6.91641 20.8422 7.20428 20.9623 7.50483 20.9635Z'
												fill='white'
											/>
											<path
												d='M7.50811 26.6441H25.6846C25.9859 26.6441 26.2748 26.5245 26.4879 26.3114C26.7009 26.0984 26.8206 25.8094 26.8206 25.5081C26.8206 25.2068 26.7009 24.9179 26.4879 24.7048C26.2748 24.4918 25.9859 24.3721 25.6846 24.3721H7.50811C7.20681 24.3721 6.91786 24.4918 6.70481 24.7048C6.49176 24.9179 6.37207 25.2068 6.37207 25.5081C6.37207 25.8094 6.49176 26.0984 6.70481 26.3114C6.91786 26.5245 7.20681 26.6441 7.50811 26.6441Z'
												fill='white'
											/>
											<path
												d='M17.7291 31.1888C17.7291 30.8875 17.6094 30.5985 17.3964 30.3855C17.1833 30.1724 16.8944 30.0528 16.5931 30.0527H7.50483C7.20428 30.0539 6.91641 30.174 6.70428 30.387C6.49215 30.5999 6.37305 30.8882 6.37305 31.1888C6.37305 31.4893 6.49215 31.7776 6.70428 31.9906C6.91641 32.2035 7.20428 32.3237 7.50483 32.3248H16.5931C16.8944 32.3248 17.1833 32.2051 17.3964 31.992C17.6094 31.779 17.7291 31.4901 17.7291 31.1888Z'
												fill='white'
											/>
										</svg>
									</div>
								</div>
								<div className='teamworkdiv1text2'>Task Delegated Today</div>
							</div>
						</div>
					</Link>

					<div className='teamworkdiv2-parent col-md-6 col-4'>
						<div
							className='teamworkdiv2-container'
							style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
						>
							<a
								href='https://redwing.puneetpugalia.com/pages/sleeping_task.php'
								target='_blank'
								style={{ display: 'contents', textDecoration: 'none' }}
							>
								<div
									className='teamworkdiv2'
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between'
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}
									>
										<div className='teamworkdiv2text1'>{data.sleeping_tasks}</div>
										<div>
											<svg
												width='16'
												height='26'
												viewBox='0 0 16 26'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M15.9657 18.8606C15.9807 18.8153 15.9899 18.7683 15.9929 18.7206C15.9937 18.7081 16.0001 18.6963 16.0001 18.6838V5.61948C16.0001 5.46884 15.9403 5.32437 15.8337 5.21784C15.7272 5.11132 15.5827 5.05147 15.4321 5.05146H8.61593V3.81077C8.99493 3.67677 9.31437 3.41311 9.51777 3.06637C9.72118 2.71964 9.79546 2.31216 9.72748 1.91595C9.65951 1.51975 9.45365 1.16033 9.14631 0.90122C8.83896 0.642113 8.4499 0.5 8.04791 0.5C7.64592 0.5 7.25686 0.642113 6.94952 0.90122C6.64217 1.16033 6.43632 1.51975 6.36834 1.91595C6.30036 2.31216 6.37464 2.71964 6.57805 3.06637C6.78145 3.41311 7.10089 3.67677 7.47989 3.81077V5.05146H0.663721C0.513075 5.05147 0.368602 5.11132 0.262079 5.21784C0.155556 5.32436 0.0957095 5.46883 0.0957031 5.61948V24.932C0.0957095 25.0826 0.155556 25.2271 0.262079 25.3336C0.368602 25.4401 0.513075 25.5 0.663721 25.5H9.18394C9.25757 25.4999 9.3305 25.4856 9.39865 25.4577L9.40034 25.4569C9.4696 25.4284 9.53253 25.3865 9.58551 25.3336L15.8337 19.0854C15.8804 19.0371 15.9181 18.9807 15.9449 18.9191C15.9481 18.9121 15.9542 18.9067 15.9571 18.8995C15.9623 18.887 15.9615 18.8734 15.9657 18.8606ZM8.04791 1.64338C8.16025 1.64338 8.27007 1.67669 8.36349 1.73911C8.4569 1.80152 8.5297 1.89023 8.57269 1.99403C8.61568 2.09782 8.62693 2.21203 8.60501 2.32221C8.5831 2.4324 8.529 2.53361 8.44956 2.61305C8.37012 2.69249 8.26891 2.74658 8.15872 2.7685C8.04854 2.79042 7.93433 2.77917 7.83053 2.73617C7.72674 2.69318 7.63803 2.62037 7.57562 2.52696C7.5132 2.43355 7.47989 2.32373 7.47989 2.21139C7.48009 2.0608 7.54 1.91644 7.64648 1.80996C7.75296 1.70348 7.89732 1.64357 8.04791 1.64338ZM1.23173 6.18749H7.47989V7.32352C7.47989 7.47417 7.53974 7.61864 7.64626 7.72517C7.75279 7.83169 7.89726 7.89154 8.04791 7.89154C8.19856 7.89154 8.34304 7.83169 8.44956 7.72517C8.55608 7.61864 8.61593 7.47417 8.61593 7.32352V6.18749H14.8641V18.1158H9.18394C9.03329 18.1158 8.88882 18.1757 8.7823 18.2822C8.67578 18.3887 8.61594 18.5332 8.61593 18.6838V24.364H1.23173V6.18749ZM9.75196 23.5608V19.2518H14.0609L9.75196 23.5608Z'
													fill='white'
												/>
												<path
													d='M3.50339 10.7308H12.5916C12.7419 10.7302 12.8858 10.6701 12.9919 10.5636C13.098 10.4572 13.1575 10.313 13.1575 10.1627C13.1575 10.0125 13.098 9.86831 12.9919 9.76184C12.8858 9.65538 12.7419 9.59529 12.5916 9.59473H3.50339C3.35311 9.59529 3.20918 9.65538 3.10312 9.76184C2.99705 9.86831 2.9375 10.0125 2.9375 10.1627C2.9375 10.313 2.99705 10.4572 3.10312 10.5636C3.20918 10.6701 3.35311 10.7302 3.50339 10.7308Z'
													fill='white'
												/>
												<path
													d='M3.50357 13.5716H12.5918C12.7425 13.5716 12.8869 13.5117 12.9935 13.4052C13.1 13.2987 13.1598 13.1542 13.1598 13.0036C13.1598 12.8529 13.1 12.7084 12.9935 12.6019C12.8869 12.4954 12.7425 12.4355 12.5918 12.4355H3.50357C3.35292 12.4355 3.20844 12.4954 3.10192 12.6019C2.99539 12.7084 2.93555 12.8529 2.93555 13.0036C2.93555 13.1542 2.99539 13.2987 3.10192 13.4052C3.20844 13.5117 3.35292 13.5716 3.50357 13.5716Z'
													fill='white'
												/>
												<path
													d='M8.61553 15.8444C8.61552 15.6937 8.55568 15.5493 8.44915 15.4427C8.34263 15.3362 8.19816 15.2764 8.04751 15.2764H3.50339C3.35311 15.2769 3.20918 15.337 3.10312 15.4435C2.99705 15.5499 2.9375 15.6941 2.9375 15.8444C2.9375 15.9947 2.99705 16.1388 3.10312 16.2453C3.20918 16.3517 3.35311 16.4118 3.50339 16.4124H8.04751C8.19816 16.4124 8.34263 16.3525 8.44915 16.246C8.55568 16.1395 8.61552 15.995 8.61553 15.8444Z'
													fill='white'
												/>
											</svg>
										</div>
									</div>
									<div className='teamworkdiv2text2'>
										Sleeping <br />
										Task
									</div>
								</div>
							</a>

							<a
								href='https://redwing.puneetpugalia.com/pages/unassigned_task.php'
								target='_blank'
								style={{ display: 'contents', textDecoration: 'none' }}
							>
								<div
									className='teamworkdiv2'
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										marginTop: '8px'
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center'
										}}
									>
										<div className='teamworkdiv2text1'>{data.unassigned_tasks}</div>
										<div>
											<svg
												width='16'
												height='26'
												viewBox='0 0 16 26'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M15.9657 18.8606C15.9807 18.8153 15.9899 18.7683 15.9929 18.7206C15.9937 18.7081 16.0001 18.6963 16.0001 18.6838V5.61948C16.0001 5.46884 15.9403 5.32437 15.8337 5.21784C15.7272 5.11132 15.5827 5.05147 15.4321 5.05146H8.61593V3.81077C8.99493 3.67677 9.31437 3.41311 9.51777 3.06637C9.72118 2.71964 9.79546 2.31216 9.72748 1.91595C9.65951 1.51975 9.45365 1.16033 9.14631 0.90122C8.83896 0.642113 8.4499 0.5 8.04791 0.5C7.64592 0.5 7.25686 0.642113 6.94952 0.90122C6.64217 1.16033 6.43632 1.51975 6.36834 1.91595C6.30036 2.31216 6.37464 2.71964 6.57805 3.06637C6.78145 3.41311 7.10089 3.67677 7.47989 3.81077V5.05146H0.663721C0.513075 5.05147 0.368602 5.11132 0.262079 5.21784C0.155556 5.32436 0.0957095 5.46883 0.0957031 5.61948V24.932C0.0957095 25.0826 0.155556 25.2271 0.262079 25.3336C0.368602 25.4401 0.513075 25.5 0.663721 25.5H9.18394C9.25757 25.4999 9.3305 25.4856 9.39865 25.4577L9.40034 25.4569C9.4696 25.4284 9.53253 25.3865 9.58551 25.3336L15.8337 19.0854C15.8804 19.0371 15.9181 18.9807 15.9449 18.9191C15.9481 18.9121 15.9542 18.9067 15.9571 18.8995C15.9623 18.887 15.9615 18.8734 15.9657 18.8606ZM8.04791 1.64338C8.16025 1.64338 8.27007 1.67669 8.36349 1.73911C8.4569 1.80152 8.5297 1.89023 8.57269 1.99403C8.61568 2.09782 8.62693 2.21203 8.60501 2.32221C8.5831 2.4324 8.529 2.53361 8.44956 2.61305C8.37012 2.69249 8.26891 2.74658 8.15872 2.7685C8.04854 2.79042 7.93433 2.77917 7.83053 2.73617C7.72674 2.69318 7.63803 2.62037 7.57562 2.52696C7.5132 2.43355 7.47989 2.32373 7.47989 2.21139C7.48009 2.0608 7.54 1.91644 7.64648 1.80996C7.75296 1.70348 7.89732 1.64357 8.04791 1.64338ZM1.23173 6.18749H7.47989V7.32352C7.47989 7.47417 7.53974 7.61864 7.64626 7.72517C7.75279 7.83169 7.89726 7.89154 8.04791 7.89154C8.19856 7.89154 8.34304 7.83169 8.44956 7.72517C8.55608 7.61864 8.61593 7.47417 8.61593 7.32352V6.18749H14.8641V18.1158H9.18394C9.03329 18.1158 8.88882 18.1757 8.7823 18.2822C8.67578 18.3887 8.61594 18.5332 8.61593 18.6838V24.364H1.23173V6.18749ZM9.75196 23.5608V19.2518H14.0609L9.75196 23.5608Z'
													fill='white'
												/>
												<path
													d='M3.50339 10.7308H12.5916C12.7419 10.7302 12.8858 10.6701 12.9919 10.5636C13.098 10.4572 13.1575 10.313 13.1575 10.1627C13.1575 10.0125 13.098 9.86831 12.9919 9.76184C12.8858 9.65538 12.7419 9.59529 12.5916 9.59473H3.50339C3.35311 9.59529 3.20918 9.65538 3.10312 9.76184C2.99705 9.86831 2.9375 10.0125 2.9375 10.1627C2.9375 10.313 2.99705 10.4572 3.10312 10.5636C3.20918 10.6701 3.35311 10.7302 3.50339 10.7308Z'
													fill='white'
												/>
												<path
													d='M3.50357 13.5716H12.5918C12.7425 13.5716 12.8869 13.5117 12.9935 13.4052C13.1 13.2987 13.1598 13.1542 13.1598 13.0036C13.1598 12.8529 13.1 12.7084 12.9935 12.6019C12.8869 12.4954 12.7425 12.4355 12.5918 12.4355H3.50357C3.35292 12.4355 3.20844 12.4954 3.10192 12.6019C2.99539 12.7084 2.93555 12.8529 2.93555 13.0036C2.93555 13.1542 2.99539 13.2987 3.10192 13.4052C3.20844 13.5117 3.35292 13.5716 3.50357 13.5716Z'
													fill='white'
												/>
												<path
													d='M8.61553 15.8444C8.61552 15.6937 8.55568 15.5493 8.44915 15.4427C8.34263 15.3362 8.19816 15.2764 8.04751 15.2764H3.50339C3.35311 15.2769 3.20918 15.337 3.10312 15.4435C2.99705 15.5499 2.9375 15.6941 2.9375 15.8444C2.9375 15.9947 2.99705 16.1388 3.10312 16.2453C3.20918 16.3517 3.35311 16.4118 3.50339 16.4124H8.04751C8.19816 16.4124 8.34263 16.3525 8.44915 16.246C8.55568 16.1395 8.61552 15.995 8.61553 15.8444Z'
													fill='white'
												/>
											</svg>
										</div>
									</div>
									<div className='teamworkdiv2text2'>
										Unassigned <br />
										Task
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

			<Grid container spacing={1}>
				<Grid item xs={4}>
					<Link to='/team-work' style={{ display: 'contents' }}>
						<div
							className='teamworkdiv2'
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between'
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}
							>
								<div className='teamworkdiv2text1'>{totalTickets}</div>
								<div>
									<svg
										width='16'
										height='26'
										viewBox='0 0 16 26'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M15.9657 18.8606C15.9807 18.8153 15.9899 18.7683 15.9929 18.7206C15.9937 18.7081 16.0001 18.6963 16.0001 18.6838V5.61948C16.0001 5.46884 15.9403 5.32437 15.8337 5.21784C15.7272 5.11132 15.5827 5.05147 15.4321 5.05146H8.61593V3.81077C8.99493 3.67677 9.31437 3.41311 9.51777 3.06637C9.72118 2.71964 9.79546 2.31216 9.72748 1.91595C9.65951 1.51975 9.45365 1.16033 9.14631 0.90122C8.83896 0.642113 8.4499 0.5 8.04791 0.5C7.64592 0.5 7.25686 0.642113 6.94952 0.90122C6.64217 1.16033 6.43632 1.51975 6.36834 1.91595C6.30036 2.31216 6.37464 2.71964 6.57805 3.06637C6.78145 3.41311 7.10089 3.67677 7.47989 3.81077V5.05146H0.663721C0.513075 5.05147 0.368602 5.11132 0.262079 5.21784C0.155556 5.32436 0.0957095 5.46883 0.0957031 5.61948V24.932C0.0957095 25.0826 0.155556 25.2271 0.262079 25.3336C0.368602 25.4401 0.513075 25.5 0.663721 25.5H9.18394C9.25757 25.4999 9.3305 25.4856 9.39865 25.4577L9.40034 25.4569C9.4696 25.4284 9.53253 25.3865 9.58551 25.3336L15.8337 19.0854C15.8804 19.0371 15.9181 18.9807 15.9449 18.9191C15.9481 18.9121 15.9542 18.9067 15.9571 18.8995C15.9623 18.887 15.9615 18.8734 15.9657 18.8606ZM8.04791 1.64338C8.16025 1.64338 8.27007 1.67669 8.36349 1.73911C8.4569 1.80152 8.5297 1.89023 8.57269 1.99403C8.61568 2.09782 8.62693 2.21203 8.60501 2.32221C8.5831 2.4324 8.529 2.53361 8.44956 2.61305C8.37012 2.69249 8.26891 2.74658 8.15872 2.7685C8.04854 2.79042 7.93433 2.77917 7.83053 2.73617C7.72674 2.69318 7.63803 2.62037 7.57562 2.52696C7.5132 2.43355 7.47989 2.32373 7.47989 2.21139C7.48009 2.0608 7.54 1.91644 7.64648 1.80996C7.75296 1.70348 7.89732 1.64357 8.04791 1.64338ZM1.23173 6.18749H7.47989V7.32352C7.47989 7.47417 7.53974 7.61864 7.64626 7.72517C7.75279 7.83169 7.89726 7.89154 8.04791 7.89154C8.19856 7.89154 8.34304 7.83169 8.44956 7.72517C8.55608 7.61864 8.61593 7.47417 8.61593 7.32352V6.18749H14.8641V18.1158H9.18394C9.03329 18.1158 8.88882 18.1757 8.7823 18.2822C8.67578 18.3887 8.61594 18.5332 8.61593 18.6838V24.364H1.23173V6.18749ZM9.75196 23.5608V19.2518H14.0609L9.75196 23.5608Z'
											fill='white'
										/>
										<path
											d='M3.50339 10.7308H12.5916C12.7419 10.7302 12.8858 10.6701 12.9919 10.5636C13.098 10.4572 13.1575 10.313 13.1575 10.1627C13.1575 10.0125 13.098 9.86831 12.9919 9.76184C12.8858 9.65538 12.7419 9.59529 12.5916 9.59473H3.50339C3.35311 9.59529 3.20918 9.65538 3.10312 9.76184C2.99705 9.86831 2.9375 10.0125 2.9375 10.1627C2.9375 10.313 2.99705 10.4572 3.10312 10.5636C3.20918 10.6701 3.35311 10.7302 3.50339 10.7308Z'
											fill='white'
										/>
										<path
											d='M3.50357 13.5716H12.5918C12.7425 13.5716 12.8869 13.5117 12.9935 13.4052C13.1 13.2987 13.1598 13.1542 13.1598 13.0036C13.1598 12.8529 13.1 12.7084 12.9935 12.6019C12.8869 12.4954 12.7425 12.4355 12.5918 12.4355H3.50357C3.35292 12.4355 3.20844 12.4954 3.10192 12.6019C2.99539 12.7084 2.93555 12.8529 2.93555 13.0036C2.93555 13.1542 2.99539 13.2987 3.10192 13.4052C3.20844 13.5117 3.35292 13.5716 3.50357 13.5716Z'
											fill='white'
										/>
										<path
											d='M8.61553 15.8444C8.61552 15.6937 8.55568 15.5493 8.44915 15.4427C8.34263 15.3362 8.19816 15.2764 8.04751 15.2764H3.50339C3.35311 15.2769 3.20918 15.337 3.10312 15.4435C2.99705 15.5499 2.9375 15.6941 2.9375 15.8444C2.9375 15.9947 2.99705 16.1388 3.10312 16.2453C3.20918 16.3517 3.35311 16.4118 3.50339 16.4124H8.04751C8.19816 16.4124 8.34263 16.3525 8.44915 16.246C8.55568 16.1395 8.61552 15.995 8.61553 15.8444Z'
											fill='white'
										/>
									</svg>
								</div>
							</div>
							<div className='teamworkdiv2text2'>Team load</div>
						</div>
					</Link>
				</Grid>
				{membersWithZeroTask !== 0 && (
					<Grid item xs={4}>
						<Link to='/team-work' style={{ display: 'contents' }}>
							<div
								className='teamworkdiv2'
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between'
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<div className='teamworkdiv2text1'>{membersWithZeroTask}</div>
									<div>
										<svg
											width='16'
											height='26'
											viewBox='0 0 16 26'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.9657 18.8606C15.9807 18.8153 15.9899 18.7683 15.9929 18.7206C15.9937 18.7081 16.0001 18.6963 16.0001 18.6838V5.61948C16.0001 5.46884 15.9403 5.32437 15.8337 5.21784C15.7272 5.11132 15.5827 5.05147 15.4321 5.05146H8.61593V3.81077C8.99493 3.67677 9.31437 3.41311 9.51777 3.06637C9.72118 2.71964 9.79546 2.31216 9.72748 1.91595C9.65951 1.51975 9.45365 1.16033 9.14631 0.90122C8.83896 0.642113 8.4499 0.5 8.04791 0.5C7.64592 0.5 7.25686 0.642113 6.94952 0.90122C6.64217 1.16033 6.43632 1.51975 6.36834 1.91595C6.30036 2.31216 6.37464 2.71964 6.57805 3.06637C6.78145 3.41311 7.10089 3.67677 7.47989 3.81077V5.05146H0.663721C0.513075 5.05147 0.368602 5.11132 0.262079 5.21784C0.155556 5.32436 0.0957095 5.46883 0.0957031 5.61948V24.932C0.0957095 25.0826 0.155556 25.2271 0.262079 25.3336C0.368602 25.4401 0.513075 25.5 0.663721 25.5H9.18394C9.25757 25.4999 9.3305 25.4856 9.39865 25.4577L9.40034 25.4569C9.4696 25.4284 9.53253 25.3865 9.58551 25.3336L15.8337 19.0854C15.8804 19.0371 15.9181 18.9807 15.9449 18.9191C15.9481 18.9121 15.9542 18.9067 15.9571 18.8995C15.9623 18.887 15.9615 18.8734 15.9657 18.8606ZM8.04791 1.64338C8.16025 1.64338 8.27007 1.67669 8.36349 1.73911C8.4569 1.80152 8.5297 1.89023 8.57269 1.99403C8.61568 2.09782 8.62693 2.21203 8.60501 2.32221C8.5831 2.4324 8.529 2.53361 8.44956 2.61305C8.37012 2.69249 8.26891 2.74658 8.15872 2.7685C8.04854 2.79042 7.93433 2.77917 7.83053 2.73617C7.72674 2.69318 7.63803 2.62037 7.57562 2.52696C7.5132 2.43355 7.47989 2.32373 7.47989 2.21139C7.48009 2.0608 7.54 1.91644 7.64648 1.80996C7.75296 1.70348 7.89732 1.64357 8.04791 1.64338ZM1.23173 6.18749H7.47989V7.32352C7.47989 7.47417 7.53974 7.61864 7.64626 7.72517C7.75279 7.83169 7.89726 7.89154 8.04791 7.89154C8.19856 7.89154 8.34304 7.83169 8.44956 7.72517C8.55608 7.61864 8.61593 7.47417 8.61593 7.32352V6.18749H14.8641V18.1158H9.18394C9.03329 18.1158 8.88882 18.1757 8.7823 18.2822C8.67578 18.3887 8.61594 18.5332 8.61593 18.6838V24.364H1.23173V6.18749ZM9.75196 23.5608V19.2518H14.0609L9.75196 23.5608Z'
												fill='white'
											/>
											<path
												d='M3.50339 10.7308H12.5916C12.7419 10.7302 12.8858 10.6701 12.9919 10.5636C13.098 10.4572 13.1575 10.313 13.1575 10.1627C13.1575 10.0125 13.098 9.86831 12.9919 9.76184C12.8858 9.65538 12.7419 9.59529 12.5916 9.59473H3.50339C3.35311 9.59529 3.20918 9.65538 3.10312 9.76184C2.99705 9.86831 2.9375 10.0125 2.9375 10.1627C2.9375 10.313 2.99705 10.4572 3.10312 10.5636C3.20918 10.6701 3.35311 10.7302 3.50339 10.7308Z'
												fill='white'
											/>
											<path
												d='M3.50357 13.5716H12.5918C12.7425 13.5716 12.8869 13.5117 12.9935 13.4052C13.1 13.2987 13.1598 13.1542 13.1598 13.0036C13.1598 12.8529 13.1 12.7084 12.9935 12.6019C12.8869 12.4954 12.7425 12.4355 12.5918 12.4355H3.50357C3.35292 12.4355 3.20844 12.4954 3.10192 12.6019C2.99539 12.7084 2.93555 12.8529 2.93555 13.0036C2.93555 13.1542 2.99539 13.2987 3.10192 13.4052C3.20844 13.5117 3.35292 13.5716 3.50357 13.5716Z'
												fill='white'
											/>
											<path
												d='M8.61553 15.8444C8.61552 15.6937 8.55568 15.5493 8.44915 15.4427C8.34263 15.3362 8.19816 15.2764 8.04751 15.2764H3.50339C3.35311 15.2769 3.20918 15.337 3.10312 15.4435C2.99705 15.5499 2.9375 15.6941 2.9375 15.8444C2.9375 15.9947 2.99705 16.1388 3.10312 16.2453C3.20918 16.3517 3.35311 16.4118 3.50339 16.4124H8.04751C8.19816 16.4124 8.34263 16.3525 8.44915 16.246C8.55568 16.1395 8.61552 15.995 8.61553 15.8444Z'
												fill='white'
											/>
										</svg>
									</div>
								</div>
								<div className='teamworkdiv2text2'>Idle</div>
							</div>
						</Link>
					</Grid>
				)}

				{absentMembers !== 0 && (
					<Grid item xs={4}>
						<Link to='/team-work' style={{ display: 'contents' }}>
							<div
								className='teamworkdiv2'
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between'
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center'
									}}
								>
									<div className='teamworkdiv2text1'>{absentMembers}</div>
									<div>
										<svg
											width='16'
											height='26'
											viewBox='0 0 16 26'
											fill='none'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path
												d='M15.9657 18.8606C15.9807 18.8153 15.9899 18.7683 15.9929 18.7206C15.9937 18.7081 16.0001 18.6963 16.0001 18.6838V5.61948C16.0001 5.46884 15.9403 5.32437 15.8337 5.21784C15.7272 5.11132 15.5827 5.05147 15.4321 5.05146H8.61593V3.81077C8.99493 3.67677 9.31437 3.41311 9.51777 3.06637C9.72118 2.71964 9.79546 2.31216 9.72748 1.91595C9.65951 1.51975 9.45365 1.16033 9.14631 0.90122C8.83896 0.642113 8.4499 0.5 8.04791 0.5C7.64592 0.5 7.25686 0.642113 6.94952 0.90122C6.64217 1.16033 6.43632 1.51975 6.36834 1.91595C6.30036 2.31216 6.37464 2.71964 6.57805 3.06637C6.78145 3.41311 7.10089 3.67677 7.47989 3.81077V5.05146H0.663721C0.513075 5.05147 0.368602 5.11132 0.262079 5.21784C0.155556 5.32436 0.0957095 5.46883 0.0957031 5.61948V24.932C0.0957095 25.0826 0.155556 25.2271 0.262079 25.3336C0.368602 25.4401 0.513075 25.5 0.663721 25.5H9.18394C9.25757 25.4999 9.3305 25.4856 9.39865 25.4577L9.40034 25.4569C9.4696 25.4284 9.53253 25.3865 9.58551 25.3336L15.8337 19.0854C15.8804 19.0371 15.9181 18.9807 15.9449 18.9191C15.9481 18.9121 15.9542 18.9067 15.9571 18.8995C15.9623 18.887 15.9615 18.8734 15.9657 18.8606ZM8.04791 1.64338C8.16025 1.64338 8.27007 1.67669 8.36349 1.73911C8.4569 1.80152 8.5297 1.89023 8.57269 1.99403C8.61568 2.09782 8.62693 2.21203 8.60501 2.32221C8.5831 2.4324 8.529 2.53361 8.44956 2.61305C8.37012 2.69249 8.26891 2.74658 8.15872 2.7685C8.04854 2.79042 7.93433 2.77917 7.83053 2.73617C7.72674 2.69318 7.63803 2.62037 7.57562 2.52696C7.5132 2.43355 7.47989 2.32373 7.47989 2.21139C7.48009 2.0608 7.54 1.91644 7.64648 1.80996C7.75296 1.70348 7.89732 1.64357 8.04791 1.64338ZM1.23173 6.18749H7.47989V7.32352C7.47989 7.47417 7.53974 7.61864 7.64626 7.72517C7.75279 7.83169 7.89726 7.89154 8.04791 7.89154C8.19856 7.89154 8.34304 7.83169 8.44956 7.72517C8.55608 7.61864 8.61593 7.47417 8.61593 7.32352V6.18749H14.8641V18.1158H9.18394C9.03329 18.1158 8.88882 18.1757 8.7823 18.2822C8.67578 18.3887 8.61594 18.5332 8.61593 18.6838V24.364H1.23173V6.18749ZM9.75196 23.5608V19.2518H14.0609L9.75196 23.5608Z'
												fill='white'
											/>
											<path
												d='M3.50339 10.7308H12.5916C12.7419 10.7302 12.8858 10.6701 12.9919 10.5636C13.098 10.4572 13.1575 10.313 13.1575 10.1627C13.1575 10.0125 13.098 9.86831 12.9919 9.76184C12.8858 9.65538 12.7419 9.59529 12.5916 9.59473H3.50339C3.35311 9.59529 3.20918 9.65538 3.10312 9.76184C2.99705 9.86831 2.9375 10.0125 2.9375 10.1627C2.9375 10.313 2.99705 10.4572 3.10312 10.5636C3.20918 10.6701 3.35311 10.7302 3.50339 10.7308Z'
												fill='white'
											/>
											<path
												d='M3.50357 13.5716H12.5918C12.7425 13.5716 12.8869 13.5117 12.9935 13.4052C13.1 13.2987 13.1598 13.1542 13.1598 13.0036C13.1598 12.8529 13.1 12.7084 12.9935 12.6019C12.8869 12.4954 12.7425 12.4355 12.5918 12.4355H3.50357C3.35292 12.4355 3.20844 12.4954 3.10192 12.6019C2.99539 12.7084 2.93555 12.8529 2.93555 13.0036C2.93555 13.1542 2.99539 13.2987 3.10192 13.4052C3.20844 13.5117 3.35292 13.5716 3.50357 13.5716Z'
												fill='white'
											/>
											<path
												d='M8.61553 15.8444C8.61552 15.6937 8.55568 15.5493 8.44915 15.4427C8.34263 15.3362 8.19816 15.2764 8.04751 15.2764H3.50339C3.35311 15.2769 3.20918 15.337 3.10312 15.4435C2.99705 15.5499 2.9375 15.6941 2.9375 15.8444C2.9375 15.9947 2.99705 16.1388 3.10312 16.2453C3.20918 16.3517 3.35311 16.4118 3.50339 16.4124H8.04751C8.19816 16.4124 8.34263 16.3525 8.44915 16.246C8.55568 16.1395 8.61552 15.995 8.61553 15.8444Z'
												fill='white'
											/>
										</svg>
									</div>
								</div>
								<div className='teamworkdiv2text2'>Absent</div>
							</div>
						</Link>
					</Grid>
				)}
			</Grid>

			<div className='arrowText'>→ {data.average} tasks created on average</div>

			{/*Drive section*/}

			<div className='smallcontainer'>
				<div className='smalldivs' style={{ backgroundColor: '#13B497' }}>
					{/* <svg width="22" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9792 3.55319C15.9792 2.14528 14.8339 1 13.426 1H3.55319C2.14528 1 1 2.14528 1 3.55319V14.2916C1 15.2258 1.42221 16.091 2.17624 16.6786L8.24568 20.9231C8.31902 20.9742 8.40421 21 8.48961 21C8.57501 21 8.6602 20.9742 8.73354 20.9231L14.8209 16.6653C15.557 16.091 15.9792 15.2258 15.9792 14.2916V3.55319ZM3.55319 1.85106H13.426C14.2168 1.85106 14.8774 2.39552 15.0677 3.12766H1.91148C2.10178 2.39552 2.76241 1.85106 3.55319 1.85106ZM15.1282 14.2916C15.1282 14.9615 14.8252 15.5824 14.3151 15.9813L8.48961 20.055L2.68197 15.9946C2.15401 15.5824 1.85106 14.9615 1.85106 14.2916V3.97872H15.1282V14.2916Z" fill="white" stroke="white" strokeWidth="0.5" />
                    </svg> */}

					<img src={DriveIcon} al='/' />
				</div>
				<div style={{ marginLeft: '10px', marginRight: '18px' }}>
					<p className='smalltextdivs'>Drive</p>
				</div>
				<div style={{ width: '-webkit-fill-available' }}>
					<hr className='dottedline' />
				</div>
			</div>

			<div className='drive container-fluid'>
				<div className='row'>
					<Link to='/drive' style={{ display: 'contents' }}>
						<div className='drive-div-container col-md-2 col-3'>
							<div className='driveDiv1' style={{ backgroundColor: '#ECAF02' }}>
								<div
									className='driveDiv1text1'
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									{yellow}
								</div>
								<div className='driveDiv1text2'>
									Yellow <br /> Signals
								</div>
							</div>
						</div>
					</Link>

					<Link to='/drive' style={{ display: 'contents' }}>
						<div className='drive-div-container col-md-2 col-3'>
							<div className='driveDiv1' style={{ backgroundColor: '#CC0000' }}>
								<div
									className='driveDiv1text1'
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									{red}
								</div>
								<div className='driveDiv1text2'>
									Red <br /> Signals
								</div>
							</div>
						</div>
					</Link>

					<Link to='/drive' style={{ display: 'contents' }}>
						<div className='drive-div-container col-md-2 col-3'>
							<div className='driveDiv1' style={{ backgroundColor: '#5FB924' }}>
								<div
									className='driveDiv1text1'
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									{green}
								</div>
								<div className='driveDiv1text2'>
									Green <br /> Signals
								</div>
							</div>
						</div>
					</Link>

					<Link to='/drive' style={{ display: 'contents' }}>
						<div className='drive-div-container col-md-2 col-3'>
							<div className='driveDiv1' style={{ backgroundColor: '#26292F' }}>
								<div
									className='driveDiv1text1'
									style={{ display: 'flex', justifyContent: 'center' }}
								>
									{white}
								</div>
								<div className='driveDiv1text2'>
									White <br /> Signals
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
