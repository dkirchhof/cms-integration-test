import { IBlock, IBlockConfig } from "cms/dist/types/block";
import { renderChildren } from "cms/dist/utils/renderChildren";

interface IData {
    children: IBlock[];
}

export const RootBlock: IBlockConfig<any, IData> = {
    name: "Root",

    getInitialData: () => ({
        children: [],
    }),

    getEditorInputs: () => ({}),

    getLabel: _data => "",

    Component: props => (
        <>
            {renderChildren(props.blockConfigs, props.ctx, props.data.children)}
        </>
    ),
};
