export const config = {
  BASE_URL: "http://139.59.14.81:4000/api/v1",
  cloudinaryConfig: {
    cloudName: "square-logic-technologies",
    uploadPreset: "w9ff7nxw"
  },
  THEMES: {
    Light: {
      themeClass: "previewLight",
      textClass: "text-black",
      btnClass: "btnOrange"
    },
    Dark: {
      themeClass: "previewDark",
      textClass: "text-white",
      btnClass: "btnOrange btnLight"
    },
    Scooter: {
      themeClass: "previewScooter",
      textClass: "text-white",
      btnClass: "btnOrange btnLight"
    },
    Leaf: {
      themeClass: "previewLeaf",
      textClass: "text-black",
      btnClass: "btnOrange btnLeaf"
    },
    Moon: {
      themeClass: "previewMoon",
      textClass: "text-black",
      btnClass: "btnOrange btnMoon"
    }
  }
}

export default config;