import { textEditorFactory } from "cms/dist/editor/editors/textEditor";
import { useItem } from "cms/dist/shared/hooks/useItem";
import { IBlockConfig } from "cms/dist/types/block";
import { IPostEntity } from "../../types/post";
import { HeaderContainer } from "./styles";

interface IData {
    imgAlt: string;
    imgSrc: string;
}

export const HeaderBlock: IBlockConfig<IData> = {
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
        const post = useItem<IPostEntity>();

        return (
            <HeaderContainer>
                <img src={props.data.imgSrc} alt={props.data.imgAlt} />
                <div>
                    <h1>{post.title}</h1>
                </div>
            </HeaderContainer>
        );
    },
};
