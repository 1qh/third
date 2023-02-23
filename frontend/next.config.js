/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	assetPrefix: './',
	swcMinify: true,
	experimental: {
		appDir: true
	},
	images: {
		domains: ['flowbite.com']
	}
}

module.exports = nextConfig
