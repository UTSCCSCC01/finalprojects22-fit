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
import { getUsers } from '../../controller/Search/searchController';
import SearchBar from "react-native-dynamic-search-bar";

export default function SearchScreen ({ route, navigation }) {

    const primaryOrange = '#FF8C42'
    const primaryPurple = '#4E598C'
    const secondaryPurple = '#717FC0'

    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [friendReq, setFriendReq] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");

    const clearResults = () => {
        setSearchText("");
        setResults([]);
    }

    const searchResults = async (text) => {
        setLoading(true);
        try {
            const json = await getUsers(text);
            setResults(json.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
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
                <Text style={styles.searchTabTitle}>{item.username}</Text>
                <Text style={styles.searchTabSubtitle}>{item.display_name}</Text>
                <TouchableOpacity>Confirm</TouchableOpacity>
                <TouchableOpacity>Delete</TouchableOpacity>
            </View>
    )}
    
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