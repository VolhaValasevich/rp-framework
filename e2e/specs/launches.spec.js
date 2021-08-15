'use strict';

const pages = require('../po/PO');
const user = ENV_PARAMS.users[1];
const launchesData = require('../data/launches.json');
const {verifyUserIsLoggedIn} = require('../utils/commonActions');
const logger = require('../utils/Logger');

describe(`[${user.role}] Report Portal Launches`, () => {
    beforeAll(async () => {
        await verifyUserIsLoggedIn(user.login, user.password);
        pages.setCurrentPage('launches');
        await pages.page.get(user.login);
        await pages.page.isOpened();
    });

    launchesData.forEach((launch, index) => {
        it(`should display correct data in launch [#${index}]`, async () => {
            const data = await pages.page.getAllDataFromLaunchByIndex(index);
            const statistics = launch.statistics;
            for (let key in statistics) {
                logger.info(`Launch #${index}, info: ${key}`)
                expect(data[key]).toBe(statistics[key]);
            }
        })
    })
})
