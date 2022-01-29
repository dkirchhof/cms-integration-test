import { BlockConfigs } from "cms/dist/types/block";
import { ColumnsBlock } from "./columnsBlock";
import { HeaderBlock } from "./headerBlock";
import { HeadingBlock } from "./headingBlock";
import { ImageBlock } from "./imageBlock";
import { MaxWidthBlock } from "./maxWidthBlock";
import { TextBlock } from "./textBlock";

export const blockConfigs: BlockConfigs = [
    HeaderBlock,
    HeadingBlock,
    TextBlock,
    ImageBlock,
    MaxWidthBlock,
    ColumnsBlock,
];
