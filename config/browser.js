exports.config = {
    browserOptions: {
        headless: false,
        defaultViewport: {
            width: 1366,
            height: 768
        },
        args: [
            '--window-size=1920,1080'
        ],
    },
    screenshotOptions: {
        folder: './screenshots',
        format: 'png',
        fullPage: true
    }
}
