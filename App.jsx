import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput,
  ScrollView
} from 'react-native';
// import style from './App.module.css';

export default function App() {
  const [value, setValue] = useState('')
  const [listTask, setListTask] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://techstoretvtserver2.onrender.com/api/v1/get-list-event-promotion-home');
        const data = response.data;
        // Xử lý dữ liệu nhận được từ API ở đây
        console.log(data.data);
        let arr = data.data.map(item => item.id)
        setListTask(arr)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [])

  const handleAdd = () => {
    let arr = [...listTask]
    arr.push(value)
    setListTask(arr)
    setValue('')
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTop}>
          <Text style={styles.containerTop_header}>Todo List</Text>
          <View style={styles.containerTop_listItem}>

            {
              listTask?.map((item, index) => {
                if (index % 2 === 0)
                  return <View key={index} style={styles.containerTop_listItem_Item}>
                    <View style={styles.containerTop_listItem_Item_left2}>
                      <Text style={styles.containerTop_listItem_Item_leftText}>{(index + 1).toString().padStart(2, '0')}</Text>
                    </View>
                    <View style={styles.containerTop_listItem_Item_right}>
                      <Text>{item}</Text>
                    </View>
                  </View>

                else
                  return <View key={index} style={styles.containerTop_listItem_Item}>
                    <View style={styles.containerTop_listItem_Item_left}>
                      <Text style={styles.containerTop_listItem_Item_leftText}>{(index + 1).toString().padStart(2, '0')}</Text>
                    </View>
                    <View style={styles.containerTop_listItem_Item_right}>
                      <Text>{item}</Text>
                    </View>
                  </View>

              })
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerBottom}>
        <View style={styles.containerBottom_left}>
          <TextInput
            style={styles.containerBottom_left_input}
            placeholder='Nhập công việc'
            value={value}
            onChangeText={(e) => setValue(e)}
          />
        </View>
        <TouchableOpacity style={styles.containerBottom_right} onPress={handleAdd}>
          <Text style={styles.containerBottom_right_text}>+</Text>
        </TouchableOpacity>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    // overflow: 'scroll'
  },
  containerTop: {
    flex: 2,
    marginTop: 40,
    padding: 20
  },
  containerTop_header: {
    fontSize: 24,
    fontWeight: 700,
    color: 'blue'
  },
  containerTop_listItem: {
    marginTop: 20,
    gap: 10
  },
  containerTop_listItem_Item: {
    backgroundColor: '#fff',
    borderRadius: 6,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 10
  },
  containerTop_listItem_Item_left: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  containerTop_listItem_Item_left2: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  containerTop_listItem_Item_leftText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 500
  },
  containerTop_listItem_Item_right: {
    justifyContent: 'center',
    flex: 1
  },







  containerBottom: {
    // height: 100,
    backgroundColor: 'gray',
    flexDirection: 'row',
    padding: 10,
    gap: 10

  },
  containerBottom_left: {
    flex: 1,
  },
  containerBottom_left_input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'blue',
    paddingHorizontal: 14
  },
  containerBottom_right: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  containerBottom_right_text: {
    fontSize: 30,
    color: '#fff'
  }
})
