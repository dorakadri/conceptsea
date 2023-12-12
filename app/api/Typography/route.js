
let fontsByType = [];


async function fetchAllFonts() {
  const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}&capability=WOFF2`);
  const data = await res.json();
  data.items.forEach((font) => {
    fontsByType.push(font);
  });
}


function getPaginatedFonts( page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const fonts = fontsByType
  const paginatedFonts = fonts.slice(startIndex, endIndex);
  return paginatedFonts;
}


export async function GET(request) {
  await fetchAllFonts();
  const params = new URL(request.url).searchParams;
  const page = parseInt(params.get("page")) || 1;
  const itemsPerPage = parseInt(params.get("itemsPerPage")) || 10;
  const paginatedFonts = getPaginatedFonts( page, itemsPerPage);
  return new Response(JSON.stringify({ fonts: paginatedFonts }), { status: 200 });
}
