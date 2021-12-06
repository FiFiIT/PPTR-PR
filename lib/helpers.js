module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			await page.click(selector);
		} catch (error) {
			throw new Error(`Could not click on selector: ${selector}`);
		}
	},
	clickXPath: async function (page, XPathSelector) {
		try {
			await page.waitForXPath(XPathSelector);
			const button = await page.$x(XPathSelector);
			await button[0].click();
		} catch (error) {
			throw new Error(`Could not click on XPath selector`);
		}
	},
	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			return await page.$eval(selector, e => e.innerHTML);
		} catch (error) {
			throw new Error(`Could not get text from: ${selector}`);
		}
	},
	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			return await page.$$eval(selector, e => e.length);
		} catch (error) {
			throw new Error(`Could not get count of selector: ${selector}`);
		}
	},
	clog: async (text, value, spacing = 8) => {
		console.log(text.padEnd(spacing) + ': ' + value);
	},
	typeText: async (page, selector, text) => {
		try {
			await page.waitForSelector(selector);
			await page.typeText(selector, text);
		} catch (error) {
			throw new Error(`Could not type text into selector: ${selector}`);
		}
	},
	clickAndWaitForTarget: async (browser, page, selector) => {
		const pageTarget = page.target();
		await page.click(selector);
		const newTarget = await browser.waitForTarget(
			target => target.opener() === pageTarget
		);

		const newPage = await newTarget.page();
		await newPage.waitForNavigation({ waitUntil: 'domcontentloaded' });
		await newPage.waitForSelector('body');
		return newPage;
	},
};
