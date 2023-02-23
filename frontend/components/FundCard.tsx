import { useStateContext } from '#/context'
import { calculateBarPercentage, daysLeft } from '#/lib/utils'
import { Accordion, Button, Card, Modal, Progress, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiCurrencyDollar } from 'react-icons/hi'

const FundCard = ({
	owner,
	title,
	description,
	target,
	deadline,
	amountCollected,
	image,
	pId
}: any) => {
	const [isOpen, setOpen] = useState(false)
	const { donate, getDonations, contract, address } = useStateContext()
	const [isLoading, setIsLoading] = useState(false)
	const [amount, setAmount] = useState('')
	const [donators, setDonators] = useState([])
	const remainingDays = daysLeft(deadline)

	const fetchDonators = async () => {
		const data = await getDonations(pId)
		setDonators(data)
	}
	useEffect(() => {
		if (contract) fetchDonators()
	}, [contract, address])

	const handleDonate = async () => {
		setIsLoading(true)
		await donate(pId, amount)
		setIsLoading(false)
	}
	return (
		<div>
			<Card imgSrc={image} className="w-full cursor-pointer sm:w-64" onClick={() => setOpen(true)}>
				<p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</p>
				<div className="flex flex-col">
					<p className="text-gray-500">{description}</p>
					<div className="my-4 flex flex-wrap justify-between">
						<div className="flex flex-col">
							<p className="text-xs font-semibold text-gray-700 dark:text-gray-400">
								{amountCollected}
							</p>
							<p className="text-xs text-gray-500 sm:max-w-max">Raised of {target}</p>
						</div>
						<div className="flex flex-col">
							<p className="text-xs font-semibold text-gray-700 dark:text-gray-400">
								{remainingDays}
							</p>
							<p className="text-xs text-gray-500 sm:max-w-max">Days eft</p>
						</div>
					</div>
					<div className="flex items-center">
						<p className="flex-1 truncate text-xs text-gray-500">
							by <span className="text-gray-700 dark:text-gray-400">{owner}</span>
						</p>
					</div>
				</div>
			</Card>
			<Modal show={isOpen} onClose={() => setOpen(false)}>
				<Modal.Header>{title}</Modal.Header>
				<Modal.Body>
					<img src={image} className="w-full rounded-2xl" />
					<p className="my-5 text-gray-500">{description}</p>
					<Progress
						progress={calculateBarPercentage(target, amountCollected)}
						size="lg"
						color="green"
						label={`Collected ${amountCollected}/${target}`}
						labelPosition="outside"
						labelProgress={true}
					/>
					<Accordion flush={true} alwaysOpen={true}>
						<Accordion.Panel>
							<Accordion.Title>Donators</Accordion.Title>
							<Accordion.Content>
								{donators.length > 0 ? (
									donators.map((item: any, index) => (
										<div
											key={`${item.donator}-${index}`}
											className="flex items-center justify-between gap-4">
											<p className="break-ll text-[#b2b3bd]">
												{index + 1}. {item.donator}
											</p>
											<p className="break-ll text-[#808191]">{item.donation}</p>
										</div>
									))
								) : (
									<p className="text-gray-500">Be the first donator!</p>
								)}
							</Accordion.Content>
						</Accordion.Panel>
					</Accordion>
					{/* <div className="flex w-full flex-col gap-[30px] md:flex-row">
						<div className="flex-1 flex-col">
							<img
								src={image}
								alt="campaign"
								className="h-[410px] w-full rounded-xl object-cover"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="flex flex-[2] flex-col gap-[40px]">
							<div>
								<h4 className="text-[18px] font-semibold">Creator</h4>
								<div className="flex flex-row flex-wrap items-center gap-[14px]">
									<h4 className="break-all text-[14px] font-semibold">{owner}</h4>
								</div>
							</div>
							<p className="text-gray-500">{description}</p>
							<div>
								<h4 className="text-[18px] font-semibold">Donators</h4>
								<div className="flex flex-col gap-4">
									{donators.length > 0 ? (
										donators.map((item: any, index) => (
											<div
												key={`${item.donator}-${index}`}
												className="flex items-center justify-between gap-4">
												<p className="break-ll text-[#b2b3bd]">
													{index + 1}. {item.donator}
												</p>
												<p className="break-ll text-[#808191]">
													{item.donation}
												</p>
											</div>
										))
									) : (
										<p className="text-justify text-[#808191]">
											No donators yet. Be the first one!
										</p>
									)}
								</div>
							</div>
						</div>
						<div className="flex-1">
							<h4 className="text-[18px] font-semibold">Fund</h4>
							<div className="flex flex-col rounded-[10px] bg-[#1c1c24] p-4">
								<div className="mt-[30px]">
									<input
										type="number"
										placeholder="ETH 0.1"
										step="0.01"
										className="w-full rounded-[10px] border-[1px] border-[#3a3a43] bg-transparent py-[10px] px-[15px] text-[18px] leading-[30px] outline-none placeholder:text-[#4b5264] sm:px-[20px]"
										value={amount}
										onChange={e => setAmount(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div> */}
				</Modal.Body>
				<Modal.Footer>
					<div className="flex flex-1 flex-col">
						<TextInput
							id="goal"
							type="number"
							min={0.0}
							step="0.01"
							icon={HiCurrencyDollar}
							placeholder="Amount of money you want to donate"
							required={true}
							className="min-w-max"
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<Button gradientDuoTone="purpleToPink" onClick={handleDonate}>
						{isLoading ? (
							<>
								<Spinner />
								<span className="pl-3">Transaction in progress ...</span>
							</>
						) : (
							<span>Fund Campaign</span>
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default FundCard
