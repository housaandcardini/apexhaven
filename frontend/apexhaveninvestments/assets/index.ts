/**
 * Central media registry.
 *
 * - Photos live in `public/assets/images` for easy direct access
 *   and are imported statically so Next.js Image handles dimensions.
 * - Videos live in `public/assets/videos`.
 *
 * Import from "@/assets" anywhere in the app.
 */

import heroHouse from "../public/assets/images/hero-house.jpg";
import houseExterior from "../public/assets/images/house-exterior.jpg";
import luxuryHouse from "../public/assets/images/luxury-house.jpg";
import villa from "../public/assets/images/villa.jpg";
import apartment from "../public/assets/images/apartment.jpg";
import keys from "../public/assets/images/keys.jpg";

import interior1 from "../public/assets/images/interior-1.jpg";
import interior2 from "../public/assets/images/interior-2.jpg";
import interior3 from "../public/assets/images/interior-3.jpg";
import interior4 from "../public/assets/images/interior-4.jpg";
import kitchen from "../public/assets/images/kitchen.jpg";

import skyscraper from "../public/assets/images/skyscraper.jpg";
import city from "../public/assets/images/city.jpg";
import finance from "../public/assets/images/finance.jpg";

import construction1 from "../public/assets/images/construction-1.jpg";
import construction2 from "../public/assets/images/construction-2.jpg";
import engineer from "../public/assets/images/engineer.jpg";
import blueprint from "../public/assets/images/blueprint.jpg";

import leahNjenga from "../public/assets/images/leahNjenga.jpeg";
import logo from "../public/assets/images/logo.jpeg";

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
  leahNjenga,
  logo,
};

export const videos = {
  livingRoomMinimal: "/assets/videos/living-room-minimal.mp4",
  livingRoomFireplace: "/assets/videos/living-room-fireplace.mp4",
  luxuryHomeAerial: "/assets/videos/luxury-home-aerial.mp4",
  modernKitchen: "/assets/videos/modern-kitchen.mp4",
} as const;
