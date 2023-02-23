import FundCard from '#/components/FundCard'
import { Spinner } from 'flowbite-react'
const DisplayCampaigns = ({ isLoading, campaigns }: any) => {
	return (
		<div className="mt-6 flex flex-wrap gap-8">
			{isLoading && <Spinner />}
			{!isLoading && campaigns.length === 0 && <p>No campaign available</p>}
			{!isLoading &&
				campaigns.length > 0 &&
				campaigns.map((campaign: any) => <FundCard key={campaign.pId} {...campaign} />)}
		</div>
	)
}

export default DisplayCampaigns
