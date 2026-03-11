const BASE_URL = "https://james-allen.in1woord.nl";

async function getMangaDetails(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    return {
        title: doc.querySelector("h1")?.innerText || "Unknown",
        description: "Book by James Allen",
        cover: "",
    };
}

async function getChapters(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const chapters = [];

    doc.querySelectorAll("a[href*='#p']").forEach(link => {
        chapters.push({
            name: link.innerText,
            url: link.href
        });
    });

    return chapters;
}

async function getChapterText(url) {
    const res = await fetch(url);
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const text = doc.querySelector("article")?.innerText || "";

    return {
        text: text
    };
}