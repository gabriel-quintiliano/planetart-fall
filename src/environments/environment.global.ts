// This data will be the same in every environment (dev, prod and others...):

export const globalEnvironment = {
  gameName: "Planetary Fall",
  gameSlogan: $localize`slogan do seu game aqui`,
  routePath: {
    home: "",
    history: $localize`:this will be part of a URL - CANNOT contain accents:historia`,
    download: $localize`:this will be part of a URL - CANNOT contain accents:download`,
  },
} as const;