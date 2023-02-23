'use client'
import { StateContextProvider } from '#/context'
import { links } from '#/lib/data'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Button, DarkThemeToggle, Flowbite, Navbar, Sidebar, Spinner } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import React, { Suspense, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [collapsed, setCollapsed] = useState(false)
	const mainRef = useRef<HTMLDivElement>(null)
	const theme = {
		sidebar: {
			base: 'h-full bg-inherit',
			inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-inherit py-4 px-3'
		}
	}
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThirdwebProvider activeChain={5}>
					<StateContextProvider>
						<Flowbite theme={{ theme }}>
							<div className="flex h-screen w-full flex-col overflow-hidden">
								<header className="sticky top-0 z-20 bg-white px-2 dark:bg-black dark:text-gray-300">
									<Navbar
										fluid
										className="rounded-[32px] shadow-lg shadow-gray-300 dark:shadow-gray-600">
										<Button
											className="rounded-full"
											color="transparent"
											onClick={() => setCollapsed(!collapsed)}>
											<HiMenu className="-mx-2 h-6 w-6" />
										</Button>
										<Navbar.Brand href="/">
											<span className="self-center whitespace-nowrap px-3 text-xl font-semibold">
												Crowdfund Dapp
											</span>
										</Navbar.Brand>
										<DarkThemeToggle className="rounded-full opacity-0" />
									</Navbar>
								</header>
								<div className="flex h-full overflow-hidden bg-white dark:bg-black">
									<Sidebar collapsed={collapsed} className="w-content">
										<Sidebar.Items>
											<Sidebar.ItemGroup>
												{links.map(item => (
													<Sidebar.Item
														onClick={() => mainRef.current?.scrollTo({ top: 0 })}
														href={item.href}
														icon={item.icon}
														active={item.href === usePathname()}>
														{item.name}
													</Sidebar.Item>
												))}
											</Sidebar.ItemGroup>
										</Sidebar.Items>
									</Sidebar>
									<main className="flex-1 overflow-auto p-4" ref={mainRef}>
										<Suspense
											fallback={
												<div className="flex h-full items-center justify-center">
													<Spinner />
												</div>
											}>
											{children}
										</Suspense>
									</main>
								</div>
							</div>
						</Flowbite>
					</StateContextProvider>
				</ThirdwebProvider>
			</body>
		</html>
	)
}
