let page;

beforeEach(async () => {
  page2Block = await browser.newPage();
});

afterEach(() => {
  page2Block.close();
});

// --- Test in "Describe" block ---
describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 15000);

  afterEach(() => {
    page.close();
  });

  test("Test # 1. The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 60000);

  test("Test # 2. The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("Test # 3. The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

// --- Test out "Describe" block ---
test("test # 4. The title in page Pricing", async () => {
  await page2Block.goto("https://github.com/pricing");
  await page2Block.waitForSelector("h1");
  const title2Block = await page2Block.title();
  expect(title2Block).toEqual("Pricing · Plans for every developer · GitHub");
}, 60000);

test("test # 5. The title in page Actions", async () => {
  await page2Block.goto("https://github.com/features/actions");
  await page2Block.waitForSelector("h1");
  const title2Block = await page2Block.title();
  expect(title2Block).toEqual("Features • GitHub Actions · GitHub");
}, 60000);

test("test # 6. The title in page Security", async () => {
  await page2Block.goto("https://github.com/features/security");
  await page2Block.waitForSelector(".btn-large-mktg", { visible: true });
  const title2Block = await page2Block.title();
  expect(title2Block).toEqual("Features · Security · GitHub");
}, 60000);
