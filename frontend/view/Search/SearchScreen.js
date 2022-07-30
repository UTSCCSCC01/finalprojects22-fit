import React, { Component, useEffect, useState } from 'react';
import { 
  ActivityIndicator,  
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableHighlight,
  Text, 
  TextInput,
  View, 
  ScrollView } from 'react-native';
import { styles } from '../../style/styles';
import { useFocusEffect } from '@react-navigation/native';
import { getUsers, getFReq, getCurrUser, getAllUserFReqs, deleteFreqs, addUserFriend } from '../../controller/Search/searchController';
import SearchBar from "react-native-dynamic-search-bar";

export default function SearchScreen ({ route, navigation }) {

    const primaryOrange = '#FF8C42'
    const primaryPurple = '#4E598C'
    const secondaryPurple = '#717FC0'

    const [friends, setFriends] = useState([]);
    const [results, setResults] = useState([]);
    const [friendReq, setFriendReq] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");

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

    const getData = async () => {
        try {
          const res = await getAllUserFReqs();
          if (res !== null) {
            setFriendReq(res.data);
          }

          const res2 = await getCurrUser();
          if (res2.data.hasOwnProperty("friends")) setFriends(res2.data.friends);
          if (res2.data.hasOwnProperty("username")) setCurrentUsername(res2.data.username);
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
            setResults(json);
            console.log(json)
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

    const navigateToProfile = async (uid) => {
        const isF = friends.some(f => f === uid );
        const reqSent = await getFReq(uid);
        const rSent = reqSent === null ? false : true;
        navigation.navigate('Profile', {
            userId: uid,
            isFriend: isF,
            reqSent: rSent,
            currUsername: currentUsername,
        });
    }

    const renderSearchItem = ({item}) => {
        return (
            <TouchableHighlight onPress={() => navigateToProfile(item._id)}>
                <View>
                    <Text style={styles.searchTabTitle}>{item.username}</Text>
                    <Text style={styles.searchTabSubtitle}>{item.display_name}</Text>
                </View>
            </TouchableHighlight>
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
          getData();
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
                    {friendReq.length !== 0
                    ?   <FlatList
                            data={friendReq}          
                            renderItem={renderFReqItem}          
                            keyExtractor={item => item._id}  
                            ItemSeparatorComponent={renderSeparator}                         
                        />
                    :   <Text style={styles.noFReq}>~No Pending Friend Requests~</Text>}
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