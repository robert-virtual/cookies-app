import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import Input from "../components/Input";
import { styles } from "./Login";
import { User } from "./Register";

interface Post {
  _id: any;
  content: string;
}

interface Props {}

const Home: React.FC<Props> = ({}) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get<User>(
        "http://192.168.0.15:3021/users/me"
      );
      if (data) {
        setUser(data);
      }
    })();
    fetchPosts();
  }, []);
  const [posts, setPosts] = useState<Post[]>();
  const fetchPosts = async () => {
    const { data } = await axios.get<Post[]>("http://192.168.0.15:3021/posts");
    console.log(data[0]);

    setPosts(data);
  };
  async function createPost() {
    const { data } = await axios.post("http://192.168.0.15:3021/posts", {
      content: post,
    });
    console.log(data);
    fetchPosts();
  }
  const [post, setPost] = useState("");
  return (
    <View style={styles.container}>
      <Text>Bienvenido {user?.name}</Text>
      <Text>Post: {post}</Text>
      <Input placeholder="post" value={post} onChangeText={setPost}></Input>
      <Button title="Crear" onPress={createPost}></Button>
      <Text>size:{posts?.length}</Text>
      {posts && posts.map((p) => <Text key={p._id}>{p.content}</Text>)}
    </View>
  );
};

export default Home;
