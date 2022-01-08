import { NumberEditor } from "cms/dist/editor/editors/numberEditor";
import { IBlockConfig, IBlock } from "cms/dist/editor/types/block";
import { renderChildren } from "cms/dist/editor/utils/renderChildren";
import { ColumnsContainer } from "./styles";

interface IData {
    gap: number;
    children: IBlock[];
}

export const ColumnsBlock: IBlockConfig<IData> = {
    name: "Columns",

    getInitialData: () => ({
        gap: 0,
        children: [],
    }),

    getEditorInputs: () => ({
        gap: NumberEditor,
    }),

    getLabel: data => `columns: ${data.children.length}`,

    Component: props => (
        <ColumnsContainer gap={props.data.gap}>
            {renderChildren(props.blockConfigs, props.data.children)}
        </ColumnsContainer>
    ),
};
