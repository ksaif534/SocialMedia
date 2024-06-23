import RootComp from './root'

const Posts = (props: any) => {
  const { posts, videoPosts } = props;

  return (
    <>
      <RootComp profilePosts={posts} videoPosts={videoPosts} />
    </>
  );
}

export default Posts