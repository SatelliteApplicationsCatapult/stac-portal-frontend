import {MaxarProvider} from "./maxar"
import {PlanetProvider} from "./planet"
import {StacProvider} from "./stac"

export const findProvider = (name) => {
    if (name === "Maxar") {
        return new MaxarProvider();
    } else if (name === "Planet") {
        return new PlanetProvider();
    } else if (name === "Stac") {
        return new StacProvider();
    }

    return null;
}

