const activityList = [
	{ id: 'activity-13', isSelected: false },
	{ id: 'activity-15', isSelected: false }, 
	{ id: 'activity-1', isSelected: false },
	{ id: 'activity-2', isSelected: false },
	{ id: 'activity-4', isSelected: false },
	{ id: 'activity-5', isSelected: false },
	{ id: 'activity-6', isSelected: false },
	{ id: 'activity-7', isSelected: false },
	{ id: 'activity-8', isSelected: false },
	{ id: 'activity-9', isSelected: false },
	{ id: 'activity-10', isSelected: false },
	{ id: 'activity-11', isSelected: false }, 
	{ id: 'activity-12', isSelected: false },
	{ id: 'activity-14', isSelected: false }, 
	{ id: 'activity-3', isSelected: false },
	{ id: 'activity-16', isSelected: false }, 
	{ id: 'activity-17', isSelected: false }, 
	{ id: 'activity-18', isSelected: false }, 
];

const workList = [
	{ id: 'work-1', isSelected: false },
	{ id: 'work-2', isSelected: false },
	{ id: 'work-3', isSelected: false },
	{ id: 'work-4', isSelected: false },
	{ id: 'work-5', isSelected: false },
	{ id: 'work-6', isSelected: false },
	{ id: 'work-7', isSelected: false },
	{ id: 'work-8', isSelected: false },
	{ id: 'work-9', isSelected: false },
	{ id: 'work-10', isSelected: false },
	{ id: 'work-11', isSelected: false }, 
	{ id: 'work-12', isSelected: false }, 
	{ id: 'work-13', isSelected: false }, 
	{ id: 'work-14', isSelected: false }, 
	{ id: 'work-15', isSelected: false }, 
	{ id: 'work-16', isSelected: false }, 
	{ id: 'work-17', isSelected: false }, 
	{ id: 'work-18', isSelected: false }, 
	{id : 'work-19',isSelected: false},
	{id : 'work-20',isSelected: false},
	{id : 'work-21',isSelected: false},
];

const painPointsList = [
	{ id: 'pain-point-1', isChecked: false },
	{ id: 'pain-point-2', isChecked: false },
	{ id: 'pain-point-3', isChecked: false },
	{ id: 'pain-point-4', isChecked: false },
	{ id: 'pain-point-5', isChecked: false }
];

const categoriesForActivity = [
	{ id: 'c-1', text: 'Day to Day' },
	{ id: 'c-2', text: 'Kickstart' },
	{ id: 'c-3', text: 'Commuication' },
	{ id: 'c-4', text: 'Miscellaneous' }, 
	{ id: 'c-5', text: 'Happiness' },
];

const categoriesForOtherWorks = [
	{ id: 'c-1', text: 'Growth' },
	{ id: 'c-2', text: 'Back Office' }
];

const initialData = {
	tasks: {
		'project-1': {
			id: 'project-1',
			content: 'NUCL',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-2': {
			id: 'project-2',
			content: 'SYCU',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-3': {
			id: 'project-3',
			content: 'BMPL',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-4': {
			id: 'project-4',
			content: 'PPRM',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-5': {
			id: 'project-5',
			content: 'DRMG',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-6': {
			id: 'project-6',
			content: 'GRTR',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-7': {
			id: 'project-7',
			content: 'WCV',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-8': {
			id: 'project-8',
			content: 'ALMO',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-9': {
			id: 'project-9',
			content: 'EBOT',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-10': {
			id: 'project-10',
			content: 'AX',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-11': {
			id: 'project-11',
			content: 'AMBO',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-12': {
			id: 'project-12',
			content: 'AMAP',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-13': {
			id: 'project-13',
			content: 'DAVE',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},

		'project-14': {
			id: 'project-14',
			content: 'REDWING',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'B',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Internal',
			needsColor:'white'
		},
		'project-15': {
			id: 'project-15',
			content: 'SHOWCASE',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'B',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Internal',
			needsColor:'white'
		},
		'project-16': {
			id: 'project-16',
			content: 'INSTA',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'B',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Internal',
			needsColor:'white'
		},
		'project-17': {
			id: 'project-17',
			content: 'MOBI',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'B',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Internal',
			needsColor:'white'
		},
		'project-18': {
			id: 'project-18',
			content: 'TDD',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},

		'project-19': {
			id: 'project-19',
			content: 'Hire',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-20': {
			id: 'project-20',
			content: 'Wall',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-21': {
			id: 'project-21',
			content: 'Social',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-22': {
			id: 'project-22',
			content: 'Expect',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-23': {
			id: 'project-23',
			content: 'Routine',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-24': {
			id: 'project-24',
			content: 'Laser',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-25': {
			id: 'project-25',
			content: 'Options',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-26': {
			id: 'project-26',
			content: 'Vault',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-27': {
			id: 'project-27',
			content: 'Narrative',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-28': {
			id: 'project-28',
			content: 'Fit',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		}, 
		'project-29': {
			id: 'project-29',
			content: 'Fly',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		}, 
		'project-30': {
			id: 'project-30',
			content: 'Story Builder',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-31': {
			id: 'project-31',
			content: 'Rapid Video Making',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-32': {
			id: 'project-32',
			content: 'Bootcamp',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-33': {
			id: 'project-33',
			content: 'Packaging',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'D',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Situation',
			needsColor:'white'
		},
		'project-34': {
			id: 'project-34',
			content: 'FF',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},

		'project-35': {
			id: 'project-35',
			content: 'GRSCI',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-36': {
			id: 'project-36',
			content: 'GRSAL',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-37': {
			id: 'project-37',
			content: 'GRDOC',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-38': {
			id: 'project-38',
			content: 'ANYX',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-39': {
			id: 'project-39',
			content: 'FOCR',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-40': {
			id: 'project-40',
			content: 'LUMI',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		'project-41': {
			id: 'project-41',
			content: 'AXWeb',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'C',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Closed',
			needsColor:'white'
		},
		'project-42': {
			id: 'project-42',
			content: 'SOLA',
			isCompleted: false,
			isEveningTask: false,
			projectTypeList: 'A',
			isInfullswing: false,
			activityList,
			painPointsList,
			category: 'Clients',
			needsColor:'white'
		},
		//if we add more projects here than we have to update project list in projectOrder Section (near line no- 120) and grid section(near line no-113)
	},

	activities: {
		'activity-1': {
			id: 'activity-1',
			content: 'Delegation',
			category: categoriesForActivity[0],
			time: 0.25
		},
		'activity-2': {
			id: 'activity-2',
			content: 'Review',
			category: categoriesForActivity[0],
			time: 0.25
		},
		'activity-3': {
			id: 'activity-3',
			content: 'Submission',
			category: categoriesForActivity[0],
			time: 0.25
		},
		'activity-4': {
			id: 'activity-4',
			content: 'Troubleshoot',
			category: categoriesForActivity[0],
			time: 1.0
		},
		'activity-5': {
			id: 'activity-5',
			content: 'Quality Check',
			category: categoriesForActivity[0],
			time: 0.25
		},

		'activity-6': {
			id: 'activity-6',
			content: 'User Stories',
			category: categoriesForActivity[1],
			time: 0.25
		},
		'activity-7': {
			id: 'activity-7',
			content: 'Feel',
			category: categoriesForActivity[1],
			time: 0.25
		},
		'activity-8': {
			id: 'activity-8',
			content: 'Video',
			category: categoriesForActivity[1],
			time: 0.50
		},

		'activity-9': {
			id: 'activity-9',
			content: 'Short Call',
			category: categoriesForActivity[2],
			time: 0.5
		},
		'activity-10': {
			id: 'activity-10',
			content: 'Long Call',
			category: categoriesForActivity[2],
			time: 1.0
		},

		'activity-11': {
			id: 'activity-11',
			content: 'Invoicing',
			category: categoriesForActivity[3],
			time: 0.25
		},
		'activity-12': {
			id: 'activity-12',
			content: 'Hire',
			category: categoriesForActivity[1],
			time: 0.25
		},
		'activity-13': {
			id: 'activity-13',
			content: 'Ideas',
			category: categoriesForActivity[4],
			time: 0.25
		},
		'activity-14': {
			id: 'activity-14',
			content: 'Catchup',
			category: categoriesForActivity[4],
			time: 0.125
		}, 
		'activity-15': {
			id: 'activity-15',
			content: 'Self',
			category: categoriesForActivity[1],
			time: 0.25
		}, 
		'activity-16': {
			id: 'activity-16',
			content: 'Deep Dive',
			category: categoriesForActivity[4],
			time: 0.5
		}, 
		'activity-17': {
			id: 'activity-17',
			content: 'Holiday',
			category: categoriesForActivity[4],
			time: 0.125
		}, 
		'activity-18': {
			id: 'activity-18',
			content: 'Advise',
			category: categoriesForActivity[0],
			time: 0.125
		},
	},
	otherWorks: {
		'work-1': {
			id: 'work-1',
			content: 'GST work',
			category: categoriesForOtherWorks[1],
			time: 0.25
		},
		'work-2': {
			id: 'work-2',
			content: 'Call with CA',
			category: categoriesForOtherWorks[1],
			time: 0.25
		},
		'work-3': {
			id: 'work-3',
			content: '1 sales session',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-4': {
			id: 'work-4',
			content: 'Sales Call',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-5': {
			id: 'work-5',
			content: '1 Enquiry',
			category: categoriesForOtherWorks[0],
			time: 0.25
		},
		'work-6': {
			id: 'work-6',
			content: '2 Enquiries',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-7': {
			id: 'work-7',
			content: '3 Enquiries',
			category: categoriesForOtherWorks[0],
			time: 0.75
		},
		'work-8': {
			id: 'work-8',
			content: '1 decision',
			category: categoriesForOtherWorks[1],
			time: 0.25
		},
		'work-9': {
			id: 'work-9',
			content: '2 decisions',
			category: categoriesForOtherWorks[1],
			time: 0.5
		},
		'work-10': {
			id: 'work-10',
			content: '3 decisions',
			category: categoriesForOtherWorks[1],
			time: 0.75
		},
		'work-11': {
			id: 'work-11',
			content: 'Salary payments',
			category: categoriesForOtherWorks[1],
			time: 0.5
		},
		'work-12': {
			id: 'work-12',
			content: 'Weekly billings',
			category: categoriesForOtherWorks[1],
			time: 0.25
		}, 
		'work-13': {
			id: 'work-13',
			content: 'Video demo',
			category: categoriesForOtherWorks[0],
			time: 0.50
		},
		'work-14': {
			id: 'work-14',
			content: 'Sales material',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-15': {
			id: 'work-15',
			content: 'Signature work',
			category: categoriesForOtherWorks[1],
			time: 0.25
		},
		'work-16': {
			id: 'work-16',
			content: 'Payment',
			category: categoriesForOtherWorks[1],
			time: 0.125
		},
		'work-17': {
			id: 'work-17',
			content: 'Hiring',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-18': {
			id: 'work-18',
			content: 'XP',
			category: categoriesForOtherWorks[0],
			time: 0.5
		},
		'work-19': {
			id: 'work-19',
			content: 'Automation',
			category: categoriesForOtherWorks[0],
			time: 0.5
		}, 
		'work-20': {
			id: 'work-20',
			content: 'Scoping',
			category: categoriesForOtherWorks[0],
			time: 0.5
		}, 
		'work-21': {
			id: 'work-21',
			content: 'New Project',
			category: categoriesForOtherWorks[0],
			time: 0.5
		}
	},
	
	workList: workList,
	
	allPainPoints: {
		'pain-point-1': { id: 'pain-point-1', content: 'Manpower Shortage' },
		'pain-point-2': { id: 'pain-point-2', content: 'Unorganized Communication' },
		'pain-point-3': { id: 'pain-point-3', content: 'Personal Attention' },
		'pain-point-4': { id: 'pain-point-4', content: 'Bad Communication' },
		'pain-point-5': { id: 'pain-point-5', content: 'Technical Challenge' }
	},

	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Hard'
		},
		'column-2': {
			id: 'column-2',
			title: 'Medium'
		},
		'column-3': {
			id: 'column-3',
			title: 'Easy'
		}
	},
	rows: {
		'row-1': {
			id: 'row-1',
			title: 'Waiting'
		},
		'row-2': {
			id: 'row-2',
			title: 'Involved'
		},
		'row-3': {
			id: 'row-3',
			title: 'Progress'
		},
		'row-4': {
			id: 'row-4',
			title: 'Top Speed'
		}
	},
	grid: [
		[
			['project-4', 'project-13','project-21','project-22','project-23'],
			['project-5', 'project-14', 'project-15','project-24','project-25','project-26','project-27','project-28','project-29','project-30','project-31','project-32','project-33','project-34', 'project-35', 'project-36', 'project-37', 'project-38', 'project-39', 'project-40', 'project-41', 'project-42',],
			['project-2', 'project-3', 'project-16', 'project-17', 'project-18']
		],
		[['project-1', 'project-19', 'project-20'], [], ['project-7']],
		[['project-8'], ['project-11'], ['project-6']],
		[['project-9'], ['project-12'], ['project-10']]
	],
	projectOrder: [
		'project-1',
		'project-2',
		'project-3',
		'project-4',
		'project-5',
		'project-6',
		'project-7',
		'project-8',
		'project-9',
		'project-10',
		'project-11',
		'project-12',
		'project-13',
		'project-14',
		'project-15',
		'project-16',
		'project-17',
		'project-18',
		'project-19',
		'project-20',
		'project-21',
		'project-22',
		'project-23',
		'project-24',
		'project-25',
		'project-26',
		'project-27',
		'project-28',
		'project-29',
		'project-30', 
		'project-31', 
		'project-32', 
		'project-33', 
		'project-34', 
		'project-35', 
		'project-36', 
		'project-37', 
		'project-38', 
		'project-39', 
		'project-40', 
		'project-41', 
		'project-42',
	],
	activityOrder: [
		'activity-1',
		'activity-2',
		'activity-3',
		'activity-4',
		'activity-5',
		'activity-6',
		'activity-7',
		'activity-8',
		'activity-9',
		'activity-10',
		'activity-11', 
		'activity-12', 
		'activity-13', 
		'activity-14', 
		'activity-15', 
		'activity-16', 
		'activity-17', 
		'activity-18', 
	],
	workOrder: [
		'work-1',
		'work-2',
		'work-3',
		'work-4',
		'work-5',
		'work-6',
		'work-7',
		'work-8',
		'work-9',
		'work-10',
		'work-11', 
		'work-12',
		'work-13',
		'work-14',
		'work-15',
		'work-16',
		'work-17',
		'work-18',
	],
	painPointOrder: ['pain-point-1', 'pain-point-2', 'pain-point-3', 'pain-point-4', 'pain-point-5'],
	columnOrder: ['column-1', 'column-2', 'column-3'],
	rowOrder: ['row-1', 'row-2', 'row-3', 'row-4']
};

export { initialData, activityList, workList, categoriesForActivity, painPointsList, categoriesForOtherWorks };
