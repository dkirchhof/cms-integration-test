import { numberEditorFactory } from "cms/dist/editor/editors/numberEditor";
import { IBlockConfig, IBlock } from "cms/dist/types/block";
import { renderChildren } from "cms/dist/utils/renderChildren";
import { ColumnsContainer } from "./styles";

interface IData {
    gap: number;
    children: IBlock[];
}

export const ColumnsBlock: IBlockConfig<IData> = {
    name: "Columns",
    toString: data => `columns: ${data.children.length}`,

    propConfigs: {
        gap: {
            editor: numberEditorFactory({ min: 0 }),
            defaultValue: 0,
        },
        children: {
            editor: null,
            defaultValue: [],
        }
    },

    Component: props => (
        <ColumnsContainer gap={props.data.gap}>
            {renderChildren(props.blockConfigs, props.data.children)}
        </ColumnsContainer>
    ),
};
