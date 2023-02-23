import { IconType } from 'react-icons'
import { HiHome, HiPaperAirplane, HiUserCircle, HiViewBoards } from 'react-icons/hi'

export type CampaignForm = {
	name: string
	title: string
	description: string
	target: string
	deadline: string
	image: string
}
export type Campaign = {
	owner: string
	title: string
	description: string
	target: number
	deadline: string
	amountCollected: number
	image: string
}
export type CampaignContext = {
	address: string
	contract: any
	connect: () => void
	createCampaign: (form: CampaignForm) => void
	getCampaigns: () => void
	getUserCampaigns: () => void
	donate: (pId: number, amount: number) => void
	getDonations: (pId: number) => void
}
export type Item = {
	name: string
	href: string
	icon: IconType
}

export const links: Item[] = [
	{
		name: 'Home',
		href: '/',
		icon: HiHome
	},
	{
		name: 'Browse',
		href: '/browse',
		icon: HiViewBoards
	},
	{
		name: 'Create',
		href: '/create',
		icon: HiPaperAirplane
	},
	{
		name: 'Profile',
		href: '/profile',
		icon: HiUserCircle
	}
	// {
	// 	name: 'Test',
	// 	href: '/test',
	// 	icon: HiArchive
	// }
]
