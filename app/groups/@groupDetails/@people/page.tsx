import RootComp from "./root"

const People = (props: any) => {
    const { group } = props;

    return (
        <>
            <RootComp group={group} />
        </>
    )
}

export default People