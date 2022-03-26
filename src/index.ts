import { createLocales } from "cms/dist/types/i18n";
import { createCMS, createItemTypeBuilder } from "cms/dist/";

export const locales = createLocales([
    "en",
    "de",
]);

export const itemTypeBuilder = createItemTypeBuilder(locales);
export const cms = createCMS(locales);
