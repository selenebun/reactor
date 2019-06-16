// Convert a heatmap value into an HSL color.
function heatmapColor(value) {
  return [(1 - value / MAX_HEAT) * 240, 100, 50];
}
