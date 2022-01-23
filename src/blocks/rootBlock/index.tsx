import { IBlock, IBlockConfig } from "cms/dist/types/block";
import { renderChildren } from "cms/dist/utils/renderChildren";

interface IData {
    children: IBlock[];
}

export const RootBlock: IBlockConfig<any, IData> = {
    name: "Root",
    toString: () => "",

    propConfigs: {
        children: {
            editor: null,
            defaultValue: [],
        },
    },

    Component: props => (
        <>
            {renderChildren(props.blockConfigs, props.ctx, props.data.children)}
        </>
    ),
};
