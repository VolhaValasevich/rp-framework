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
    },
    reportPortalOptions: {
        token: "fd9978f4-ba87-4657-9b95-ee4048f87f6e",
        endpoint: "http://localhost:8080/api/v1",
        launch: "e2e-rp",
        project: "AT_MENTORING",
        attachPicturesToLogs: true,
    }
}
