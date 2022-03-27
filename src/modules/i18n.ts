import { createLocales, Localized as Localized_ } from "cms/dist/types/i18n";

export namespace i18n {
    export const locales = createLocales([
        "en",
        "de",
    ]);

    export const defaultLocale = i18n.locales.locales[0];

    export type Locales = typeof locales.t;
    export type Localized<T> = Localized_<T, Locales>;
}
