import RootComp from "./root"

const Featured = (props: any) => {
    const { group } = props;    

    return (
        <>
            <RootComp group={group} />
        </>
    )
}

export default Featured