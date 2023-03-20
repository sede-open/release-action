import {Releases} from "./Releases";

export interface ActionSkipper {
    shouldSkip(): Promise<boolean>
}

export class ReleaseActionSkipper {
    constructor(private readonly skipIfReleaseExists: boolean,
                private readonly releases: Releases,
                private readonly tag: string) {
    }

    async shouldSkip(): Promise<boolean> {
        if (!this.skipIfReleaseExists) {
            // Bail if skip flag isn't set.
            return false;
        }

        try {
            const getResponse = await this.releases.getByTag(this.tag)
            return getResponse.data != null
        } catch (error: any) {
            // There is either no release or something else went wrong. Either way, run the action.
            return false;
        }
    }
}