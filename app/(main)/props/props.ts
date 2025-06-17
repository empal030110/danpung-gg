export interface userProps {
	name: string,
	className: string,
	level: number,
	img: string,
	floor?: number,
	trophyGrade?: string,
	trophyScore?: number
};

export interface noticeProps {
	title: string,
	url: string,
	notice_id: number,
};
