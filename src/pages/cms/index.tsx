import { NextPage } from "next";
import { cms } from "../../index";
import { itemTypes } from "../../itemTypes";

const Admin: NextPage = () => {
    const Editor = cms.createEditor(itemTypes);

    return (
        <div suppressHydrationWarning>
            {typeof window === "undefined" ? null : <Editor />}
        </div>
    )
};

// export async function getServerSideProps() {
//     return {
//         props: {
//             random: Math.random(),
//         }, 
//     };
// };

export default Admin;
