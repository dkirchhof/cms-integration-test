import { IBlock, IBlockConfig } from "cms/dist/types/block";
import { renderChildren } from "cms/dist/utils/renderChildren";

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
