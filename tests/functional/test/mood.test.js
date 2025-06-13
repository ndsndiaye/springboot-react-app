const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Mood Functional Tests', () => {
  let driver;
  const baseUrl = 'http://44.222.194.210/';

  
  beforeAll(async () => {
    const options = new chrome.Options().addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }, 20000); 

  
  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  }, 10000); 

  test(
    'should load the mood form page',
    async () => {
      await driver.get(baseUrl);
      const title = await driver.wait(
        until.elementLocated(By.xpath("//*[contains(text(), \"What's your mood?\")]")),
        10000 
      );
      expect(await title.isDisplayed()).toBe(true);
    },
    15000 
  );
});
