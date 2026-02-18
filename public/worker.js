// ─── Category Map ────────────────────────────────────────────────────────────
const CATEGORY_MAP = {
    // Development
    "github.com": "Development",
    "stackoverflow.com": "Development",
    "gitlab.com": "Development",
    "bitbucket.org": "Development",
    "localhost": "Development",
    "dev.to": "Development",
    "npmjs.com": "Development",
    "pypi.org": "Development",
    "replit.com": "Development",
    "glitch.com": "Development",
    "w3schools.com": "Development",
    "mdn.mozilla.org": "Development",
    "developer.mozilla.org": "Development",
    "codepen.io": "Development",
    "jsfiddle.net": "Development",
    "codesandbox.io": "Development",

    // Cloud / DevOps
    "aws.amazon.com": "Cloud/DevOps",
    "console.cloud.google.com": "Cloud/DevOps",
    "firebase.google.com": "Cloud/DevOps",
    "vercel.com": "Cloud/DevOps",
    "netlify.com": "Cloud/DevOps",
    "heroku.com": "Cloud/DevOps",
    "digitalocean.com": "Cloud/DevOps",

    // Learning
    "codecademy.com": "Learning",
    "freecodecamp.org": "Learning",
    "udemy.com": "Learning",
    "coursera.org": "Learning",
    "edx.org": "Learning",
    "khanacademy.org": "Learning",
    "pluralsight.com": "Learning",
    "skillshare.com": "Learning",
    "duolingo.com": "Learning",

    // Social Media
    "facebook.com": "Social Media",
    "twitter.com": "Social Media",
    "x.com": "Social Media",
    "instagram.com": "Social Media",
    "reddit.com": "Social Media",
    "tiktok.com": "Social Media",
    "pinterest.com": "Social Media",
    "tumblr.com": "Social Media",
    "snapchat.com": "Social Media",
    "mastodon.social": "Social Media",
    "threads.net": "Social Media",

    // Communication
    "messenger.com": "Communication",
    "whatsapp.com": "Communication",
    "telegram.org": "Communication",
    "discord.com": "Communication",
    "slack.com": "Communication",
    "zoom.us": "Communication",
    "teams.microsoft.com": "Communication",
    "meet.google.com": "Communication",
    "skype.com": "Communication",

    // Professional
    "linkedin.com": "Professional",

    // Video / Streaming
    "youtube.com": "Video/Streaming",
    "netflix.com": "Video/Streaming",
    "twitch.tv": "Video/Streaming",
    "hulu.com": "Video/Streaming",
    "disneyplus.com": "Video/Streaming",
    "primevideo.com": "Video/Streaming",
    "hbomax.com": "Video/Streaming",
    "max.com": "Video/Streaming",
    "peacocktv.com": "Video/Streaming",
    "vimeo.com": "Video/Streaming",
    "dailymotion.com": "Video/Streaming",
    "puhutv.com": "Video/Streaming",
    "exxen.com": "Video/Streaming",
    "blutv.com": "Video/Streaming",

    // Music
    "spotify.com": "Music",
    "soundcloud.com": "Music",
    "music.apple.com": "Music",
    "music.youtube.com": "Music",
    "deezer.com": "Music",
    "tidal.com": "Music",

    // Gaming
    "steamcommunity.com": "Gaming",
    "steampowered.com": "Gaming",
    "epicgames.com": "Gaming",
    "roblox.com": "Gaming",
    "minecraft.net": "Gaming",
    "battle.net": "Gaming",
    "ea.com": "Gaming",
    "ubisoft.com": "Gaming",

    // Entertainment
    "imdb.com": "Entertainment",
    "letterboxd.com": "Entertainment",
    "rottentomatoes.com": "Entertainment",

    // Search / Productivity
    "google.com": "Search/Productivity",
    "bing.com": "Search/Productivity",
    "duckduckgo.com": "Search/Productivity",
    "search.brave.com": "Search/Productivity",
    "yandex.com": "Search/Productivity",

    // Productivity
    "docs.google.com": "Productivity",
    "sheets.google.com": "Productivity",
    "slides.google.com": "Productivity",
    "drive.google.com": "Productivity",
    "calendar.google.com": "Productivity",
    "microsoft.com": "Productivity",
    "office.com": "Productivity",
    "notion.so": "Productivity",
    "trello.com": "Productivity",
    "asana.com": "Productivity",
    "todoist.com": "Productivity",
    "airtable.com": "Productivity",
    "obsidian.md": "Productivity",

    // Email
    "mail.google.com": "Email",
    "gmail.com": "Email",
    "outlook.live.com": "Email",
    "outlook.com": "Email",
    "yahoo.com": "Email",
    "protonmail.com": "Email",

    // Design
    "canva.com": "Design",
    "figma.com": "Design",
    "adobe.com": "Design",
    "behance.net": "Design",
    "dribbble.com": "Design",

    // AI Tools
    "chatgpt.com": "AI Tools",
    "chat.openai.com": "AI Tools",
    "openai.com": "AI Tools",
    "claude.ai": "AI Tools",
    "gemini.google.com": "AI Tools",
    "bard.google.com": "AI Tools",
    "perplexity.ai": "AI Tools",
    "copilot.microsoft.com": "AI Tools",
    "midjourney.com": "AI Tools",

    // News
    "medium.com": "Blog/Reading",
    "substack.com": "Blog/Reading",
    "wikipedia.org": "Reference",
    "nytimes.com": "News",
    "cnn.com": "News",
    "bbc.com": "News",
    "bbc.co.uk": "News",
    "theguardian.com": "News",
    "reuters.com": "News",
    "habr.com": "News",
    "quora.com": "Reference",
    "weather.com": "Reference",
    "hurriyet.com.tr": "News",
    "milliyet.com.tr": "News",
    "sabah.com.tr": "News",
    "ntv.com.tr": "News",

    // Shopping
    "amazon.com": "Shopping",
    "ebay.com": "Shopping",
    "etsy.com": "Shopping",
    "walmart.com": "Shopping",
    "aliexpress.com": "Shopping",
    "trendyol.com": "Shopping",
    "hepsiburada.com": "Shopping",
    "n11.com": "Shopping",
    "sahibinden.com": "Shopping",
    "dolap.com": "Shopping",
    "yemeksepeti.com": "Shopping",
    "getir.com": "Shopping",
    "migros.com.tr": "Shopping",
    "a101.com.tr": "Shopping",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract clean domain (no www.) from a URL string */
function getDomain(url) {
    try {
        if (!url) return "unknown";
        if (!url.startsWith("http") && !url.startsWith("ftp")) url = "https://" + url;
        return new URL(url).hostname.replace(/^www\./, "");
    } catch {
        return "unknown";
    }
}

/** Map domain → category. Tries exact match first, then suffix match. */
function getCategory(domain) {
    // Exact match
    if (CATEGORY_MAP[domain]) return CATEGORY_MAP[domain];
    // Suffix match: e.g. "mail.google.com" matches "mail.google.com" key
    for (const key of Object.keys(CATEGORY_MAP)) {
        if (domain === key || domain.endsWith("." + key)) {
            return CATEGORY_MAP[key];
        }
    }
    return "Other";
}

/** Parse a timestamp into a JS Date, handling multiple formats:
 *  - Chrome JSON: time_usec (microseconds since 1601-01-01 Windows epoch)
 *  - Firefox JSON: lastVisitTime (milliseconds since Unix epoch)
 *  - CSV numeric: could be seconds, milliseconds, or microseconds
 *  - ISO / human-readable strings
 */
function parseTimestamp(raw) {
    if (!raw) return null;

    if (typeof raw === "string") {
        // Try ISO / human-readable
        const d = new Date(raw);
        if (!isNaN(d.getTime())) return d;
        // Try pure numeric string
        const n = Number(raw);
        if (!isNaN(n)) return parseNumericTimestamp(n);
        return null;
    }

    if (typeof raw === "number") return parseNumericTimestamp(raw);
    return null;
}

function parseNumericTimestamp(n) {
    // Windows FILETIME: 100-nanosecond intervals since 1601-01-01
    // Typical value: ~1.3e16 for recent dates
    if (n > 1e16) {
        // Convert to Unix ms: subtract Windows epoch offset (11644473600 seconds) then divide by 10000
        return new Date(n / 10000 - 11644473600000);
    }
    // Microseconds since Unix epoch: ~1.7e15 for recent dates
    if (n > 1e13) {
        return new Date(n / 1000);
    }
    // Milliseconds since Unix epoch: ~1.7e12 for recent dates
    if (n > 1e10) {
        return new Date(n);
    }
    // Seconds since Unix epoch: ~1.7e9 for recent dates
    if (n > 1e8) {
        return new Date(n * 1000);
    }
    return null;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── CSV Parser ───────────────────────────────────────────────────────────────
/** Splits a CSV line respecting quoted fields */
function splitCSVLine(line) {
    const result = [];
    let cur = "";
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            inQuote = !inQuote;
        } else if (ch === "," && !inQuote) {
            result.push(cur.trim());
            cur = "";
        } else {
            cur += ch;
        }
    }
    result.push(cur.trim());
    return result;
}

// ─── Main Worker ──────────────────────────────────────────────────────────────
self.onmessage = async (e) => {
    const file = e.data;

    try {
        const text = await file.text();
        let historyItems = [];

        const trimmed = text.trim();

        // ── JSON ──
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
                const json = JSON.parse(text);
                if (Array.isArray(json)) {
                    historyItems = json;
                } else if (json.BrowserHistory) {
                    // Chrome Takeout format
                    historyItems = json.BrowserHistory;
                } else {
                    // Try to find any array key
                    const key = Object.keys(json).find((k) => Array.isArray(json[k]));
                    if (key) historyItems = json[key];
                }
            } catch {
                // Not valid JSON, fall through to CSV
            }
        }

        // ── CSV ──
        if (historyItems.length === 0) {
            const lines = text.split(/\r?\n/);
            if (lines.length > 1) {
                const headers = splitCSVLine(lines[0]).map((h) =>
                    h.toLowerCase().replace(/['"]+/g, "").trim()
                );

                const urlIdx = headers.findIndex((h) => h === "url" || h.includes("url"));
                const timeIdx = headers.findIndex((h) => h.includes("time") || h.includes("date") || h.includes("visited"));
                const countIdx = headers.findIndex((h) => h.includes("visit") && h.includes("count"));
                const titleIdx = headers.findIndex((h) => h === "title" || h.includes("title"));

                if (urlIdx !== -1) {
                    for (let i = 1; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (!line) continue;
                        const cols = splitCSVLine(line);
                        const urlRaw = cols[urlIdx]?.replace(/^"|"$/g, "").trim();
                        if (!urlRaw) continue;

                        const timeRaw = timeIdx !== -1 ? cols[timeIdx]?.replace(/^"|"$/g, "").trim() : null;
                        const countRaw = countIdx !== -1 ? parseInt(cols[countIdx]?.replace(/^"|"$/g, "") || "1") : 1;
                        const titleRaw = titleIdx !== -1 ? cols[titleIdx]?.replace(/^"|"$/g, "").trim() : "";

                        historyItems.push({
                            url: urlRaw,
                            title: titleRaw,
                            visitTime: timeRaw || Date.now(),
                            visitCount: isNaN(countRaw) ? 1 : countRaw,
                        });
                    }
                }
            }
        }

        if (!historyItems || historyItems.length === 0) {
            throw new Error(
                "Could not parse history file. Please ensure it is a valid JSON or CSV export with a 'url' column."
            );
        }

        // ── Aggregate ──
        const domainCounts = {};
        const visitsByHour = {};
        const visitsByDayOfWeek = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
        const visitsByDate = {};
        const categoryCounts = {};
        let totalVisits = 0;

        for (const item of historyItems) {
            if (!item.url) continue;

            // Resolve timestamp — try multiple field names
            const rawTs =
                item.time_usec ??      // Chrome JSON (microseconds, Windows epoch)
                item.lastVisitTime ??  // Firefox JSON (milliseconds, Unix epoch)
                item.visitTime ??      // Generic
                item.visit_time ??
                item.date ??
                item.time ??
                null;

            let date = parseTimestamp(rawTs);

            // Sanity check: reject dates outside 2000–2030 range
            if (!date || date.getFullYear() < 2000 || date.getFullYear() > 2030) {
                date = new Date(); // fallback to now — won't distort counts much
            }

            totalVisits += 1;

            // Hour distribution
            const hour = date.getHours();
            visitsByHour[hour] = (visitsByHour[hour] || 0) + 1;

            // Day-of-week distribution
            const dayName = DAY_NAMES[date.getDay()];
            visitsByDayOfWeek[dayName] = (visitsByDayOfWeek[dayName] || 0) + 1;

            // Calendar heatmap
            const dateStr = date.toISOString().split("T")[0];
            visitsByDate[dateStr] = (visitsByDate[dateStr] || 0) + 1;

            // Domain + category
            const domain = getDomain(item.url);
            const category = getCategory(domain);

            if (!domainCounts[domain]) {
                domainCounts[domain] = { count: 0, category };
            }
            domainCounts[domain].count += 1;

            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }

        // ── Build result ──
        const topDomains = Object.entries(domainCounts)
            .map(([domain, d]) => ({ domain, count: d.count, category: d.category }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 100); // keep top 100 for category drill-down

        const categories = Object.entries(categoryCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        // Fill all 24 hours (so charts don't have gaps)
        const visitsByHourFull = Array.from({ length: 24 }, (_, h) => ({
            hour: h,
            count: visitsByHour[h] || 0,
        }));

        const visitsByDayArray = Object.entries(visitsByDayOfWeek).map(([day, count]) => ({
            day,
            count,
        }));

        // ── Find Hidden Gems (Rarely visited sites) ──
        const allDomains = Object.entries(domainCounts).map(([domain, d]) => ({
            domain,
            count: d.count,
            category: d.category,
        }));

        const gemsCandidates = allDomains.filter(d => d.count <= 3);
        // Shuffle and pick 5
        const gems = [];
        if (gemsCandidates.length > 0) {
            for (let i = 0; i < 5; i++) {
                if (gemsCandidates.length === 0) break;
                const r = Math.floor(Math.random() * gemsCandidates.length);
                gems.push(gemsCandidates[r]);
                gemsCandidates.splice(r, 1);
            }
        }

        const visitsByDateArray = Object.entries(visitsByDate)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        self.postMessage({
            type: "RESULT",
            payload: {
                totalVisits,
                topDomains,
                visitsByHour: visitsByHourFull,
                visitsByDayOfWeek: visitsByDayArray,
                visitsByDate: visitsByDateArray,
                categories,
                gems, // Add gems to payload
            },
        });

    } catch (err) {
        self.postMessage({ type: "ERROR", payload: err.message });
    }
};
