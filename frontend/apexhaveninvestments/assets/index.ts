/**
 * Central media registry.
 *
 * - Photos live in `assets/images` and are imported statically so that
 *   `next/image` can optimise them and generate blur placeholders.
 * - Videos live in `public/assets/videos` (video files can't be imported as
 *   modules) and are referenced here by their public URL.
 *
 * Import from "@/assets" anywhere in the app.
 */

import heroHouse from "./images/hero-house.jpg";
import houseExterior from "./images/house-exterior.jpg";
import luxuryHouse from "./images/luxury-house.jpg";
import villa from "./images/villa.jpg";
import apartment from "./images/apartment.jpg";
import keys from "./images/keys.jpg";

import interior1 from "./images/interior-1.jpg";
import interior2 from "./images/interior-2.jpg";
import interior3 from "./images/interior-3.jpg";
import interior4 from "./images/interior-4.jpg";
import kitchen from "./images/kitchen.jpg";

import skyscraper from "./images/skyscraper.jpg";
import city from "./images/city.jpg";
import finance from "./images/finance.jpg";

import construction1 from "./images/construction-1.jpg";
import construction2 from "./images/construction-2.jpg";
import engineer from "./images/engineer.jpg";
import blueprint from "./images/blueprint.jpg";

import team1 from "./images/team-1.jpg";
import team2 from "./images/team-2.jpg";
import team3 from "./images/team-3.jpg";

export const images = {
  heroHouse,
  houseExterior,
  luxuryHouse,
  villa,
  apartment,
  keys,
  interior1,
  interior2,
  interior3,
  interior4,
  kitchen,
  skyscraper,
  city,
  finance,
  construction1,
  construction2,
  engineer,
  blueprint,
  team1,
  team2,
  team3,
};

export const videos = {
  livingRoomMinimal: "/assets/videos/living-room-minimal.mp4",
  livingRoomFireplace: "/assets/videos/living-room-fireplace.mp4",
  luxuryHomeAerial: "/assets/videos/luxury-home-aerial.mp4",
  modernKitchen: "/assets/videos/modern-kitchen.mp4",
} as const;
