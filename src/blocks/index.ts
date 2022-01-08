import { BlockConfigs } from "cms/dist/editor/types/block";
import { ColumnsBlock } from "./columnsBlock";
import { HeaderBlock } from "./headerBlock";
import { HeadingBlock } from "./headingBlock";
import { ImageBlock } from "./imageBlock";
import { MaxWidthBlock } from "./maxWidthBlock";
import { RootBlock } from "./rootBlock";
import { TextBlock } from "./textBlock";

export const blockConfigs: BlockConfigs = [
    RootBlock,
    HeaderBlock,
    HeadingBlock,
    TextBlock,
    ImageBlock,
    MaxWidthBlock,
    ColumnsBlock,
];
