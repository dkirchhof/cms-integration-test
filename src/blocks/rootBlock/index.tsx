import { IBlock, IBlockConfig } from "cms/dist/editor/types/block";
import { renderChildren } from "cms/dist/editor/utils/renderChildren";

interface IData {
    children: IBlock[];
}

export const RootBlock: IBlockConfig<IData> = {
    name: "Root",

    getInitialData: () => ({
        children: [],
    }),

    getEditorInputs: () => ({}),

    getLabel: _data => "",

    Component: props => (
        <>
            {renderChildren(props.blockConfigs, props.data.children)}
        </>
    ),
};
