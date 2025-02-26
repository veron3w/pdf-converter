const puppeteer = require("puppeteer");
const fs = require('fs');


// instanciar o browser ↓
const launchBrowser = async () => {
	return await puppeteer.launch({
		headless: "new",
		args: ["--window-size=1920,1080"],
	});
};


// apos estanciado, criar uma página dentro dele ↓ ▼

const convertHTML = async () => {
	const browser = await launchBrowser();

	const page = await browser.newPage();

  const html = await fs.promises.readFile('index.html', 'utf8')
  

  // setar conteudo ↓
	await page.setContent(html);


  // conversão do conteúdo para PDF ↓
	await page.pdf({
		format: "A4",
		landscape: false,
		width: 1920,
		height: 1080,
		path: "new-blog.pdf",
		printBackground: true
	});


  // no final, descarregamos a pagina e o browser (fecha o browser para nao consumir memoria do PC)
  await page.close();
  await browser.close();

};

convertHTML();