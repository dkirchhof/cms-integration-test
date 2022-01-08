import { NumberEditor } from "cms/dist/editor/editors/numberEditor";
import { IBlockConfig, IBlock } from "cms/dist/editor/types/block";
import { renderChildren } from "cms/dist/editor/utils/renderChildren";
import { Container } from "./styles";

interface IData {
    maxWidth: number;
    children: IBlock[];
}

export const MaxWidthBlock: IBlockConfig<IData> = {
    name: "ContentLimitation",

    getInitialData: () => ({
        maxWidth: 800,
        children: [],
    }),

    getEditorInputs: () => ({
        maxWidth: NumberEditor,
    }),

    getLabel: data => data.maxWidth.toString(),

    Component: props => (
        <Container maxWidth={props.data.maxWidth}>
            {renderChildren(props.blockConfigs, props.data.children)}
        </Container>
    ),
};
