/*
  Query used to build data/osm-spots.json (Jyväskylä region).
  To refresh: paste into https://overpass-turbo.eu, press Run, then Export -> "raw OSM data" (JSON),
  and save the file as data/osm-spots.json. The site reads the "elements" array.
*/
[out:json][timeout:120][bbox:61.85,25.25,62.55,26.15];
(
  nwr["amenity"="shelter"]["shelter_type"~"^(lean_to|basic_hut|weather_shelter|picnic_shelter)$"];
  nwr["tourism"~"^(wilderness_hut|viewpoint)$"];
  nwr["tourism"="picnic_site"]["fireplace"="yes"];
  nwr["amenity"="bbq"];
  nwr["leisure"="firepit"];
  nwr["man_made"="tower"]["tower:type"="observation"];
  nwr["leisure"~"^(swimming_area|beach_resort)$"];
  nwr["natural"="beach"];
  nwr["amenity"="sauna"]["access"!~"^(private|no|customers)$"];
  nwr["leisure"="nature_reserve"]["name"];
  wr["natural"="water"]["water"~"^(lake|reservoir)$"]["name"];
  relation["route"~"^(hiking|foot)$"]["name"];
);
out tags center qt;
