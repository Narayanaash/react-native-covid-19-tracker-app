import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";

import axios from "axios";

const DATA = [
  {
    id: 1,
    title: "Yo man!",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ListScreen = () => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  const getDataUsingAsyncAwaitGetCall = async () => {
    try {
      const {
        data: { id, title },
      } = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      const newData = {
        id,
        title,
      };
      DATA.push(newData);
      console.log(newData);
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Get Data" onPress={getDataUsingAsyncAwaitGetCall} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ListScreen;
