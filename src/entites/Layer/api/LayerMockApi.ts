export const getAllLayersMock = async () => {
  const layers = await fetch("src/entites/Layer/mock-data/mock.json");
  return layers.json();
};
