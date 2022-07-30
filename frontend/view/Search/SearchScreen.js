import React, { Component, useEffect, useState } from 'react';
import { 
  ActivityIndicator,  
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  TextInput,
  View, 
  ScrollView } from 'react-native';
import { styles } from '../../style/styles';
import { useFocusEffect } from '@react-navigation/native';
import { getUsers, getAllUserFReqs, deleteFreqs, addUserFriend } from '../../controller/Search/searchController';
import SearchBar from "react-native-dynamic-search-bar";

export default function SearchScreen ({ route, navigation }) {

    const primaryOrange = '#FF8C42'
    const primaryPurple = '#4E598C'
    const secondaryPurple = '#717FC0'

    const [results, setResults] = useState([]);
    const [friendReq, setFriendReq] = useState([]);
    const [searchText, setSearchText] = useState("");

    const confirmFReqs = async (rid, fid) => {
        try {
            const res = await addUserFriend(fid);
            if (res == null) {
                alert("Adding friend unsuccessful!");
                return;
            }
            const res2 = await deleteFreqs(rid);
            if (res2 == null) {
                alert("Processing Friend Request unsuccessful!");
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFreq = async (rid) => {
        try {
            const res = await deleteFreqs(rid);
            if (res == null) {
                alert("Processing Friend Request unsuccessful!");
                return;
            }
            await getFriendReqs();
        } catch (error) {
            console.log(error);
        }
    }

    const getFriendReqs = async () => {
        try {
          const res = await getAllUserFReqs();
          if (res == null) {
            setFriendReq([]);
            return;
          }
          setFriendReq(res.data);
        } catch (error) {
          console.error(error);
        }
      }

    const clearResults = () => {
        setSearchText("");
        setResults([]);
    }

    const searchResults = async (text) => {
        try {
            const json = await getUsers(text);
            setResults(json.data);
        } catch (error) {
            console.error(error);
        }
    }

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '80%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '10%'
                }}
            />
        );
    };

    const renderSearchItem = ({item}) => {
        return (
            <View>
                <Text style={styles.searchTabTitle}>{item.username}</Text>
                <Text style={styles.searchTabSubtitle}>{item.display_name}</Text>
            </View>
    )}

    const renderFReqItem = ({item}) => {
        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.freqHeader}>{item.from_username}</Text>
                    <View style={{flexDirection: 'row', position: 'absolute', right: 20}}>
                        <TouchableOpacity
                            onPress={() => {
                                confirmFReqs(item._id, item.from_user);
                            }}
                            style={styles.freqConfirmContainer}>
                            <Text style={styles.freqConfirmText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                deleteFreq(item._id);
                            }}
                            style={styles.freqDeleteContainer}>
                            <Text style={styles.freqDeleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )}

    useFocusEffect(
        React.useCallback(() => {
          getFriendReqs();
        }, [])
    );
    
    return(
        <View style={{ flex: 1, marginTop: 50, justifyContent: 'center' }}>
            <SearchBar
                    placeholder="Search"
                    onChangeText={(text) => setSearchText(text)}
                    onClearPress={clearResults}
                    onSubmitEditing={(e) => searchResults(e.nativeEvent.text)}
                    value={searchText}
                    style={{ marginBottom: 20 }}
            />
            {results.length === 0 
            ?
                <View>
                    <Text style={styles.header2}>Pending Friend Requests</Text>
                    <FlatList
                        data={friendReq}          
                        renderItem={renderFReqItem}          
                        keyExtractor={item => item._id}  
                        ItemSeparatorComponent={renderSeparator}                         
                    />
                </View> 
            : 
            <View> 
            </View>
            }
            <FlatList
                data={results}          
                renderItem={renderSearchItem}          
                keyExtractor={item => item._id}  
                ItemSeparatorComponent={renderSeparator}                         
            />
        </View>
    );
}