'use client'
import DisplayCampaigns from '#/components/DisplayCampaigns'
import { useStateContext } from '#/context'
import { useEffect, useState } from 'react'

export default function Page() {
	const [isLoading, setIsLoading] = useState(false)
	const [campaigns, setCampaigns] = useState([])

	const { address, contract, getCampaigns } = useStateContext()

	const fetchCampaigns = async () => {
		setIsLoading(true)
		const data = await getCampaigns()
		setCampaigns(data)
		setIsLoading(false)
	}

	useEffect(() => {
		if (contract) fetchCampaigns()
	}, [address, contract])

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex justify-center py-20">
				<div className="rounded-full bg-white bg-opacity-50 px-8 py-5 text-center text-5xl font-bold text-gray-600 shadow-2xl shadow-gray-300 dark:bg-black dark:text-gray-300">
					Browse Campaigns
				</div>
			</div>
			<DisplayCampaigns isLoading={isLoading} campaigns={campaigns} />
		</div>
	)
}
