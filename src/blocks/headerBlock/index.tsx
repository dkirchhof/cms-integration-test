import { TextEditor } from "cms/dist/editor/editors/textEditor";
import { IBlockConfig } from "cms/dist/types/block";
import { IPost } from "../../types/post";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

export const HeaderBlock: IBlockConfig<IPost, IData> = {
    name: "Header",

    getInitialData: () => ({
        imgAlt: "",
        imgSrc: "",
    }),

    getEditorInputs: () => ({
        imgAlt: TextEditor,
        imgSrc: TextEditor,
    }),

    getLabel: _data => "",

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
