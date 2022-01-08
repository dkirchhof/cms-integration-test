/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    webpack: config => {
        config.cache = false;
        config.resolve.symlinks = false;

        return config
    }
}
