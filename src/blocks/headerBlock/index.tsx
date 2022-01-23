import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/types/block";
import { IPostEntity } from "../../types/post";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

export const HeaderBlock: IBlockConfig<IPostEntity, IData> = {
    name: "Header",
    toString: () => "",

    propConfigs: {
        imgAlt: {
            editor: textEditorFactory(),
            defaultValue: "",
        },
        imgSrc: {
            editor: textEditorFactory(),
            defaultValue: "",
        },
    },

    Component: props => {
        return (
            <HeaderContainer>
                <img src={props.data.imgSrc} alt={props.data.imgAlt} />
                <div>
                    <h1>{props.ctx.title}</h1>
                </div>
            </HeaderContainer>
        );
    },
};
