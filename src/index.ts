import { createCMS, createItemTypeBuilder } from "cms/dist/";
import { i18n } from "./modules/i18n";

export const itemTypeBuilder = createItemTypeBuilder(i18n.locales);
export const cms = createCMS(i18n.locales);
