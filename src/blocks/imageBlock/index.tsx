import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/types/block";

interface IData {
    alt: string;
    src: string;
}

export const ImageBlock: IBlockConfig<any, IData> = {
    name: "Image",
    toString: data => data.alt || data.src,
    
    propConfigs: {
        alt: {
            editor: textEditorFactory(),
            defaultValue: "",
        },
        src: {
            editor: textEditorFactory(),
            defaultValue: "",
        },
    },

    Component: props => (
        <img src={props.data.src} alt={props.data.alt} />
    ),
};
