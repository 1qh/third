import { createContext, useContext } from 'react'

import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
	const { contract } = useContract('0xd8529A66bf44Da0f04fCee34d5DB5a0473062d98')
	const { mutateAsync: create } = useContractWrite(contract, 'create')

	const address = useAddress()
	const connect = useMetamask()

	const publishCampaign = async form => {
		try {
			const data = await create([
				address,
				form.title,
				form.description,
				form.target,
				new Date(form.deadline).getTime(),
				form.image
			])
			alert('Contract call success', data)
			console.info('Contract call success', data)
		} catch (error) {
			alert('Contract call failure', error)
		}
	}
	const getCampaigns = async () => {
		const campaigns = await contract.call('getCampaigns')
		const parsedCampaings = campaigns.map((campaign, i) => ({
			owner: campaign.owner,
			title: campaign.title,
			description: campaign.description,
			target: ethers.utils.formatEther(campaign.target.toString()),
			deadline: campaign.deadline.toNumber(),
			amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
			image: campaign.image,
			pId: i
		}))
		return parsedCampaings
	}
	const getUserCampaigns = async () => {
		const allCampaigns = await getCampaigns()
		const filteredCampaigns = allCampaigns.filter(campaign => campaign.owner === address)
		return filteredCampaigns
	}
	const donate = async (pId, amount) => {
		const data = await contract.call('donate', pId, { value: ethers.utils.parseEther(amount) })
		return data
	}
	const getDonations = async pId => {
		const donations = await contract.call('getDonators', pId)
		const numberOfDonations = donations[0].length
		const parsedDonations = []
		for (let i = 0; i < numberOfDonations; i++) {
			parsedDonations.push({
				donator: donations[0][i],
				donation: ethers.utils.formatEther(donations[1][i].toString())
			})
		}
		return parsedDonations
	}
	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				create: publishCampaign,
				getCampaigns,
				getUserCampaigns,
				donate,
				getDonations
			}}>
			{children}
		</StateContext.Provider>
	)
}
export const useStateContext = () => useContext(StateContext)
