import {MaxarProvider} from "./maxar"
import {PlanetProvider} from "./planet"

export const findProvider = (name) => {
    if (name === "Maxar") {
        return new MaxarProvider();
    } else if (name === "Planet") {
        return new PlanetProvider();
    }

    return null;
}

