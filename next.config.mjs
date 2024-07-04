/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8000",
				pathname: "/uploads/**",
			},
            {
				protocol: "https",
				hostname: "assets.it-consultis.com",
				pathname: "*",
			},
			
		],
	},
};

export default nextConfig;
