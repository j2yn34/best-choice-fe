import CreatePost from "../components/create/CreatePost";

const CreatePostPage = (): JSX.Element => {
  return (
    <>
      <h1 className="text-2xl mb-8 font-semibold">투표글 작성하기</h1>
      <CreatePost />
    </>
  );
};

export default CreatePostPage;
