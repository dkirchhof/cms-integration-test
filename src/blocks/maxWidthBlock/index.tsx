import { numberEditorFactory } from "cms/dist/editor/editors/numberEditor";
import { IBlockConfig, IBlock } from "cms/dist/types/block";
import { renderChildren } from "cms/dist/utils/renderChildren";
import { Container } from "./styles";

interface IData {
    maxWidth: number;
    children: IBlock[];
}

export const MaxWidthBlock: IBlockConfig<IData> = {
    name: "ContentLimitation",
    toString: data => data.maxWidth.toString(),

    propConfigs: {
        maxWidth: {
            editor: numberEditorFactory({ min: 0 }),
            defaultValue: 800,
        },
        children: {
            editor: null,
            defaultValue: [],
        },
    },

    Component: props => (
        <Container maxWidth={props.data.maxWidth}>
            {renderChildren(props.blockConfigs, props.data.children)}
        </Container>
    ),
};
