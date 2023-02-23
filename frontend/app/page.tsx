'use client'
import { useStateContext } from '#/context'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'

export default function Page() {
	const { connect, address } = useStateContext()
	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="flex justify-center py-20">
				<div className="rounded-full bg-white bg-opacity-50 px-8 py-5 text-center text-5xl font-bold text-gray-600 shadow-2xl shadow-gray-300 dark:bg-black dark:text-gray-300">
					Welcome to Crowdfund Dapp
				</div>
			</div>
			<Button
				outline
				gradientDuoTone="tealToLime"
				onClick={() => {
					if (address) {
						router.push('/profile')
					} else connect()
				}}>
				{address ? `Connected to ${address}` : 'Connect'}
			</Button>
		</div>
	)
}
