# Hidden Jyväskylä

A static website that shows lakes, forest trails, viewpoints, laavu shelters, fire pits and swimming spots near you in Jyväskylä, Finland. Type an address or area, or use your location, and it lists what's close, on a map.

Plain HTML, CSS and JavaScript. No build step, no API keys, and it runs on GitHub Pages.

## What's inside

| File | What it is |
|---|---|
| `index.html` | The page |
| `css/styles.css` | All styling |
| `js/app.js` | Map, search, filters, weather, generated artwork |
| `js/spots.js` | Hand-picked "local favourite" spots (edit this one) |
| `data/osm-spots.json` | Snapshot of ~700 laavus, fire pits, beaches, lakes, trails and viewpoints from OpenStreetMap |
| `data/osm-query.overpassql` | The query that produced the snapshot |
| `images/spots/` | Put your spot photos here |

## Run it locally

The page loads `data/osm-spots.json`, which browsers block when you open the file directly. Serve the folder instead:

```bash
python3 -m http.server 4317
```

Then open http://localhost:4317.

## Add your own photos

Each hand-picked spot shows generated artwork until it has a photo.

1. Put the image in `images/spots/`. A 16:10 photo about 1200×750 px works best. Keep it under ~300 KB (JPG or WebP).
2. In `js/spots.js`, set that spot's `image` field:
   ```js
   image: "images/spots/vesilinna.jpg"
   ```

If a photo fails to load, the artwork shows instead.

## Add or edit spots

Each entry in `js/spots.js` looks like this:

```js
{
  id: "vesilinna",                 // unique, kebab-case
  name: "Vesilinna Observation Tower",
  localName: "Vesilinna",
  category: "view",                // lake | trail | view | fire | swim | culture
  lat: 62.24567, lng: 25.74321,
  area: "Harju, city centre",
  short: "One line for the card.",
  description: "A few sentences for the detail view.",
  tips: ["Practical tip"],
  tags: ["Free", "Sunset"],
  seasons: ["summer", "autumn"],   // spring | summer | autumn | winter
  link: "https://…",               // or null
  image: null                      // or "images/spots/…"
}
```

## Refresh the OpenStreetMap data

1. Open https://overpass-turbo.eu, paste in the contents of `data/osm-query.overpassql`, then press **Run**.
2. Choose **Export → raw OSM data** and save the file as `data/osm-spots.json`.

The site keeps only what it needs from that file.

In the current snapshot, each trail route also has points sampled about every 200 m along its path (a `pts` array). That lets the site measure distance to the nearest part of a trail, not to its centre. A plain export doesn't include these points, so after a refresh, trails fall back to their centre point.

## Publish on GitHub Pages

```bash
git init -b main
git add .
git commit -m "Hidden Jyväskylä: first version"
gh repo create hidden-jyvaskyla --public --source=. --remote=origin --push
gh api -X POST repos/feroz2017/hidden-jyvaskyla/pages -f "source[branch]=main" -f "source[path]=/"
```

About a minute later the site is live at https://feroz2017.github.io/hidden-jyvaskyla/.

## Credits

- Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL)
- Basemap: [OpenFreeMap](https://openfreemap.org) "fiord" style, © [OpenMapTiles](https://www.openmaptiles.org/). Falls back to standard OpenStreetMap tiles.
- Address search: [Nominatim](https://nominatim.org/). Searches run only when you press the button, as its usage policy requires.
- Weather: [Open-Meteo](https://open-meteo.com/) (free for non-commercial use, CC BY 4.0)
- Map library: [Leaflet](https://leafletjs.com/) with [MapLibre GL](https://maplibre.org/)
