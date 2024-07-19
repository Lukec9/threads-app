import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { Link, useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Button, Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postAtom";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    return (
      <>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <h1>User not found</h1>
          <Link to={"/"}>
            <Button mx={"auto"}>Back To home</Button>
          </Link>
        </Flex>
      </>
    );
  }

  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && (
        <h1>User has not posted anything.</h1>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map(post => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
