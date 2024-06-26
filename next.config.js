/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.cloudinary.com',
                port: '',
                pathname: '/dwgzndxmx/**',
            },
        ],
    },
}

module.exports = {
    experimental: {
        instrumentationHook: true,
    },
}


module.exports = {
    reactStrictMode: false,
}

