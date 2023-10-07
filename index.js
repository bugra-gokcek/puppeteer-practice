const puppeteer = require('puppeteer');

async function clickButtonByXPath(page, xpath) {
    try {
        await page.waitForXPath(xpath);
        const elementHandles = await page.$x(xpath);
        if (elementHandles.length > 0) {
            await elementHandles[0].click();
        } else {
            console.error('no xpath match.');
        }
    } catch (error) {
        console.error('button click error:', error);
    }
}

async function writeToTextareaByXPath(page, xpath, data) {
    try {
        await page.waitForXPath(xpath);
        const textareaElement = (await page.$x(xpath))[0];

        if (textareaElement) {
            await textareaElement.type(data);
            await page.waitForTimeout(1000);
        } else {
            console.error('no xpath match.');
        }
    } catch (error) {
        console.error('Textarea type error:', error);
    }
}

async function loginProcess(_page, _username, _password, _usernameTextXPath, _passwordTextXPath, _buttonXPath) {
    try {
        await writeToTextareaByXPath(_page, _usernameTextXPath, _username);
        await writeToTextareaByXPath(_page, _passwordTextXPath, _password);
        await clickButtonByXPath(_page, _buttonXPath);
        console.log("tried to login")
    } catch (error) {
        console.error("login failed", error);
    }
}

async function isExists_XPath(_page, _XPath) {
    try {
        const element = await _page.$x(_XPath);
        if (element.length > 0) {
            console.log('Element bulundu.');
        } else {
            console.log('Element bulunamadı.');
        }
    }
    catch (error) {
        console.log(error);
    }
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto('http://localhost:3000');
    const title = await page.title();
    console.log(`Website title: ${title}`);
    //await loginProcess(page, "admin", "PUNJYRU7", "//*[@id=\"username\"]", "//*[@id=\"userpassword\"]", "//*[@id=\"loginBtn\"]");
    //await page.waitForSelector('.qrcodebox');
    //await isExists_XPath(page, "/html/body/div/div/div[4]/div[1]/div/div[3]/div/div[2]/div/div/img");
})();