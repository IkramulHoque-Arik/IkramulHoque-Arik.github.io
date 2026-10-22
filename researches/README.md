# Research Archive & JSON Guide

This folder contains the research investigations, case studies, and engineering explorations displayed on [Ikramul Hoque's Portfolio](https://ikramulhoque-arik.github.io).

## How to Add a New Research

All research entries are driven from `researches/researches.json`. To add a new research entry, open `researches.json` and append a new JSON object to the array:

```json
{
  "id": "my-new-research-id",
  "title": "Title of the Investigation",
  "qs": "What is the core physical, mathematical, or engineering question being investigated?",
  "images": [
    "researches/images/my-image-1.jpg",
    "researches/images/my-image-2.jpg"
  ],
  "link": "researches/my-new-research-id.html",
  "highlight": true,
  "upcoming": false,
  "date": "2026-10-22",
  "time": "14:30",
  "summary": "Optional brief summary or key finding of the research.",
  "tags": [
    "mechanisms",
    "materials",
    "physics"
  ]
}
```

### Field Definitions

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | **Yes** | Unique hyphenated identifier (e.g. `umbrella-parachute`). |
| `title` | `string` | **Yes** | Bold headline describing the topic or paradox. |
| `qs` | `string` | **Yes** | Core research question displayed on the card. |
| `images` | `array of strings` | **Yes** | One or multiple image paths or URLs (`https://...` or `researches/images/...`). Cards automatically create a dot-slider when multiple images are provided. |
| `link` | `string` | **Yes** | Relative path to the research article or HTML file (e.g. `researches/my-topic.html` or external link). |
| `highlight` | `boolean` | **Yes** | If `true`, the research appears in the horizontal scroll section on the homepage. If `false`, it appears only in the full archive (`researches/researches.html`). Shows a `★ Highlight` badge. |
| `upcoming` | `boolean` | No | If `true`, displays a `⏳ Upcoming` badge on the card and enables filtering under "⏳ Upcoming Only" in `researches/researches.html`. |
| `date` | `string` | **Yes** | Publication date in `YYYY-MM-DD` format (used to sort newest first). |
| `time` | `string` | **Yes** | Publication time in `HH:MM` format (24-hour). |
| `summary` | `string` | No | Optional paragraph summarizing the investigation. |
| `tags` | `array of strings` | No | Tags used for filtering in `researches/researches.html` (e.g. `fluids`, `structures`). |

### Image Recommendations
- Store local images inside the `researches/images/` directory.
- Use landscape images with an aspect ratio of approximately 16:9 or 16:10 (e.g., 800×500 px or 1200×750 px).
- Both WebP and JPG formats are recommended for fast loading.
