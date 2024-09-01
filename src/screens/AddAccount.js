import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, ExpandableSection, Button, Colors } from 'react-native-ui-lib'
import { HomeStyles as styles } from './styles'
import { CUSTOM_MARGIN, themeColor } from '../constants'
import Header from '../components/Header'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getEmailProviderIcon } from '../components/CustomDrawer'

import { useSelector, useDispatch } from 'react-redux'
import { listGrants } from '../api/inbox'
import { convertTimestampToDate } from '../utilityFunctions'
import { useNavigation } from '@react-navigation/native'

const AddAccount = ({ navigation }) => {

    const hostname = useSelector(state => state.hostname.value);
    const { userData } = useSelector(state => state.auth);
    const { grantidlist, isLoading } = useSelector(state => state.grants)
    const dispatch = useDispatch()
    const CustomNavigation = useNavigation()
    console.log("my list ", grantidlist)

    // useEffect(() => {
    //     dispatch(listGrants({ hostname, access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2hhbnRhbnUgTmlta2FyIiwiZW1haWwiOiJzbmlta2FyMTkwNUBnbWFpbC5jb20iLCJhcGlfa2V5IjpudWxsLCJvcmdhbmlzYXRpb24iOm51bGwsImlkIjozfQ.6r0VpDY03mye9KUZdgDpdX01q8Ew8QURx4BpE-xsUBI" }));
    // }, []);




    const Item = ({ data }) => {
        const [expanded, setExpanded] = useState(false)
        return (
            <ExpandableSection
                expanded={expanded}
                sectionHeader={<View flex left padding-10 style={{ borderWidth: 1, borderRadius: 10 }} >
                    <View row>

                        <MaterialCommunityIcons name={getEmailProviderIcon(data.email)} size={50} />

                        <View centerV marginL-10 row spread>
                            <Text style={[styles.subject, { fontWeight: 'bold' }]}>{data.email}</Text>
                            <MaterialCommunityIcons name={expanded ? "chevron-down" : "chevron-up"} size={30} />
                        </View>
                    </View>
                    {
                        expanded &&
                        <>
                            <View padding-5 >
                                <Text >Provider: {data.provider}</Text>
                                <Text >GrantID: {data.id}</Text>
                                <Text >Status: {data.grant_status}</Text>
                                <Text >Created on: {convertTimestampToDate(data.created_at)}</Text>

                            </View>
                            <Button
                                label={'Revoke access'}
                                backgroundColor={Colors.$backgroundDangerHeavy}
                                style={{ marginBottom: CUSTOM_MARGIN }}
                            />
                        </>
                    }

                </View>}
                onPress={() => setExpanded(!expanded)}
            />
        )
    }


    return (
        <SafeAreaView style={[styles.container, { padding: CUSTOM_MARGIN }]}>
            <StatusBar barStyle="light-content" backgroundColor={themeColor.PRIMARY} />
            <Text marginV-10 style={styles.title}>Manage all your accounts at one place</Text>

            <Button marginH-20 label="+ Add account" outline style={{ marginBottom: CUSTOM_MARGIN }} />

            
            <FlatList
                data={grantidlist}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={<View style={{ height: 10 }} />}
                onRefresh={() =>
                    dispatch(listGrants({ hostname, access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2hhbnRhbnUgTmlta2FyIiwiZW1haWwiOiJzbmlta2FyMTkwNUBnbWFpbC5jb20iLCJhcGlfa2V5IjpudWxsLCJvcmdhbmlzYXRpb24iOm51bGwsImlkIjozfQ.6r0VpDY03mye9KUZdgDpdX01q8Ew8QURx4BpE-xsUBI" }))
                }
                refreshing={isLoading}

            // ListHeaderComponent={<Header navigation={navigation} />}
            />
        </SafeAreaView>
    )
}

export default AddAccount